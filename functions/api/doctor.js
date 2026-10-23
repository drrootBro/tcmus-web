// 医师档案接口：按执照号取一人全档（含专长自述与来源；站长分由前端按硬事实渲染）
export async function onRequestGet({ request, env }) {
  const lic = (new URL(request.url).searchParams.get("lic") || "").trim();
  const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json; charset=utf-8" } });
  if (!/^\d{6}$/.test(lic)) return json({ error: "bad_license" }, 400);
  const r = await env.DB.prepare(
    "SELECT p.*, s.categories, s.claim_summary, s.source FROM practitioners p LEFT JOIN specialties s ON s.license_no = p.license_no WHERE p.license_no = ?"
  ).bind(lic).first();
  if (!r) return json({ error: "not_found" }, 404);
  return json({
    lic: r.license_no, name: r.name, state: r.state, area: r.area, addr: r.address || "", zip: r.zip || "",
    phone: r.phone || "", since: r.licensed_date || "", exp: r.reg_expiry || "", rating: r.rating || "",
    cats: r.categories ? r.categories.split(";") : null, claim: r.claim_summary || "", source: r.source || "",
    website: r.website || "", bio: r.bio || "", claimed: r.claimed ? 1 : 0,
  });
}
