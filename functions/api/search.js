// tcmus 找针灸师查询接口（Cloudflare Pages Function，绑定 D1 名 DB）
// 规则（2026-10-22 用户拍板）：选了症状 → 只有自述专长者出现；不选症状 → 全显示（先放后收）。
// 永远分页（每页 10），接口层不提供全量导出。
const PER = 10;
const AREA_LABEL = { flushing: "法拉盛", manhattan: "曼哈顿" };
const STATE_LABEL = { NY: "纽约州 New York" };

function matchSym(cats, sym) {
  if (!cats) return false;
  const list = cats.split(";");
  if (sym === "妇科/不孕") return list.some(c => c.includes("妇科") || c.includes("不孕"));
  return list.some(c => c.includes(sym) || (sym === "头痛" && c.includes("偏头痛")));
}
function distMi(a, b) {
  const R = 3959, d = Math.PI / 180;
  const h = Math.sin((b[0] - a[0]) * d / 2) ** 2 + Math.cos(a[0] * d) * Math.cos(b[0] * d) * Math.sin((b[1] - a[1]) * d / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
const shape = r => ({
  lic: r.license_no, name: r.name, area: r.area, addr: r.address || "", zip: r.zip || "",
  phone: r.phone || "", since: r.licensed_date || "", exp: r.reg_expiry || "",
  rating: r.rating || "", cats: r.categories ? r.categories.split(";") : null,
  website: r.website || "", claimed: r.claimed ? 1 : 0,
});
const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8" } });

export async function onRequestGet({ request, env }) {
  const u = new URL(request.url), p = u.searchParams;
  const mode = p.get("mode") || "";
  const db = env.DB;

  if (mode === "coverage") {
    const { results } = await db.prepare("SELECT state, area, COUNT(*) n FROM practitioners GROUP BY state, area").all();
    const states = {};
    for (const r of results) (states[r.state] ||= { code: r.state, label: STATE_LABEL[r.state] || r.state, areas: [] }).areas.push({ key: r.area, label: AREA_LABEL[r.area] || r.area, n: r.n });
    return json({ states: Object.values(states) });
  }

  let rows = [], center = null, radius = 0;
  const base = "SELECT p.*, s.categories FROM practitioners p LEFT JOIN specialties s ON s.license_no = p.license_no";

  if (mode === "featured") {
    const { results } = await db.prepare(base + " WHERE s.categories IS NOT NULL LIMIT 6").all();
    return json({ total: results.length, results: results.map(shape) });
  }
  if (mode === "name") {
    const q = (p.get("q") || "").trim().toUpperCase().slice(0, 60);
    if (!q) return json({ error: "empty_query" }, 400);
    const { results } = await db.prepare(base + " WHERE UPPER(p.name) LIKE ? ORDER BY p.name").bind("%" + q + "%").all();
    rows = results;
  } else if (mode === "area") {
    const st = (p.get("state") || "").slice(0, 2), city = (p.get("city") || "").slice(0, 40);
    let sql = base + " WHERE p.state = ?", binds = [st];
    if (city) { sql += " AND p.area = ?"; binds.push(city); }
    const { results } = await db.prepare(sql).bind(...binds).all();
    rows = results;
  } else if (mode === "zip") {
    const zip = (p.get("zip") || "").trim();
    radius = Math.min(100, Math.max(5, parseFloat(p.get("radius") || "100")));
    const c = await db.prepare("SELECT lat, lon FROM zip_coords WHERE zip = ?").bind(zip).first();
    if (!c) return json({ error: "zip_unknown" });
    center = [c.lat, c.lon];
    const dLat = radius / 69, dLon = radius / (69 * Math.cos(c.lat * Math.PI / 180));
    const { results } = await db.prepare(base + " WHERE p.lat BETWEEN ? AND ? AND p.lon BETWEEN ? AND ?")
      .bind(c.lat - dLat, c.lat + dLat, c.lon - dLon, c.lon + dLon).all();
    rows = results.map(r => ({ ...r, _d: distMi(center, [r.lat, r.lon]) })).filter(r => r._d <= radius);
  } else {
    return json({ error: "bad_mode" }, 400);
  }

  const sym = (p.get("symptom") || "").trim();
  if (sym && mode !== "name") rows = rows.filter(r => matchSym(r.categories, sym));

  if (mode === "zip") rows.sort((a, b) => a._d - b._d);
  else if (mode === "area") rows.sort((a, b) => (b.categories ? 1 : 0) - (a.categories ? 1 : 0) || a.name.localeCompare(b.name));

  const total = rows.length;
  const page = Math.max(1, parseInt(p.get("page") || "1"));
  const out = rows.slice((page - 1) * PER, page * PER).map(r => {
    const s = shape(r);
    if (r._d != null) s.dist = Math.round(r._d * 10) / 10;
    return s;
  });
  return json({ total, page, per: PER, results: out });
}
