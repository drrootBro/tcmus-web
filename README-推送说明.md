# 中医经典之方知识库 · 推送说明

来源：rootbro.com 免费 TCM 页面 copy（2026-10-19）
目标：tcmus.net `/tcm/` 目录

## 文件清单（12 个）

| 本地路径 | 推送后 URL |
|---|---|
| `tcm/index.html` | https://tcmus.net/tcm/ |
| `tcm/bencao/guizhi.html` | https://tcmus.net/tcm/bencao/guizhi.html |
| `tcm/bencao/index.html` | https://tcmus.net/tcm/bencao/ |
| `tcm/bencao/images/guizhi.jpg` | https://tcmus.net/tcm/bencao/images/guizhi.jpg |
| `tcm/blog/index.html` | https://tcmus.net/tcm/blog/ |
| `tcm/blog/xiaochaihu-anli.html` | https://tcmus.net/tcm/blog/xiaochaihu-anli.html |
| `tcm/blog/liujing-zhuangtai.html` | https://tcmus.net/tcm/blog/liujing-zhuangtai.html |
| `tcm/blog/fuzi.html` | https://tcmus.net/tcm/blog/fuzi.html |
| `tcm/blog/guizhitang-zihan.html` | https://tcmus.net/tcm/blog/guizhitang-zihan.html |
| `tcm/shanghan/free.html` | https://tcmus.net/tcm/shanghan/free.html |
| `tcm/fuqingzhu/index.html` | https://tcmus.net/tcm/fuqingzhu/ |

## 怎么 push（Desktop）

1. 打开 `drrootBro/tcmus-web` 仓库
2. 把整个 **`tcm/` 文件夹**拖进仓库根目录（与现有 `fankui/`、`xuewei/` 等并列）
3. Commit → push，Cloudflare Pages 自动部署
4. 验证：打开 https://tcmus.net/tcm/ 逐页点一遍

注意：不要只拖 `tcm` 里面的文件——整个文件夹拖进去，保持 `/tcm/...` 路径结构。

## 每页改了什么

### 通用（所有页面）
- 去品牌：Rootbro 文字/logo/链接 → tcmus.net；footer 改为 `TCMUS.NET · ...`
- 顶部加 slim 导航条（`← tcmus.net` + 经典之方/穴位自查/黄页/反馈等），保证能走回主站
- `<title>` 后缀改为 `| tcmus.net`，加 meta description + canonical
- 所有 `/TCM/` 大写路径引用 → `/tcm/`
- 安全声明：每页保留或新增（三红线：不诊断、不开方、不承诺治愈）
- 视觉原样保留（宣纸 #faf8f4 + 墨 + 印章红 #8b3a2a + 鎏金，Georgia serif）

### `tcm/index.html`（知识库首页，源 rootbro.com/TCM/）
- 品牌区改为"中医经典之方"（原 Rootbro / Systems Biology of TCM）
- 中英切换按钮保留，英文模式品牌显示 `TCM Classics`
- 4 张卡片链接修正：`/shanghan/free.html`→`/tcm/shanghan/free.html`，`/TCM/fuqingzhu/`→`/tcm/fuqingzhu/`，`/TCM/bencao/`→`/tcm/bencao/`，`/TCM/blog/`→`/tcm/blog/`
- 傅青主女科徽章 `Live · Pro` → `Live · 免费`（tcmus 不卖）
- 伤寒论卡片"付费解锁完整六经"文案保留（属实：完整版在 rootbro）

### `tcm/bencao/guizhi.html`
- "下一味 → 麻黄"链到不存在的 mahuang.html（404），已禁用为"敬请期待"（与"上一味"一致）
- 桂枝汤方剂链 `/tcm/shanghan/free.html` 保留（在 tcmus 上成立）
- "根哥注"属内容作者口吻，**正文保留未动**，只改了站点 chrome（标题/footer/导航）

### `tcm/bencao/index.html`
- **删掉 31 张死链草药卡**（原页面 32 张卡只有桂枝真实存在，其余全 404），只保留桂枝
- 计数改为诚实表述：`1 / 32 味` · `持续收录中`（原 `32 / 32 味` · `收录完成` 与事实不符）
- 搜索/筛选 JS 保留（对 1 张卡无害）

### `tcm/blog/`（原 4 篇全嵌在页面 JS 里，现拆为独立文章页）
- `blog/index.html`：列表改为直链 4 篇，删掉点击展开阅读器 JS（含 reader overlay），保留标签筛选
- 4 篇文章页：`xiaochaihu-anli`（小柴胡汤案例）、`liujing-zhuangtai`（六经不是经络）、`fuzi`（附子）、`guizhitang-zihan`（桂枝汤治自汗）——宣纸风格独立模板，含返回专栏链 + 安全声明
- 正文一字未动（含"根哥注"口吻）

### `tcm/shanghan/free.html`（伤寒论免费辨证工具）
- 删：`lmsqueezy.com/affiliate.js` 外链 + affiliate 配置
- 删：购买弹窗里的"立即购买 $29.99"按钮、"已有Key？点此解锁"按钮、Key 输入区（modalContent2）、`showKeyInput`/`showModalMain`/`doModalUnlock` 函数、`API_URL`（worker verify）
- 弹窗改为：标题 + "查看完整版（57首方剂）→ https://rootbro.com/shanghan/" 外链 + "继续使用免费版"关闭按钮；`showPaywall()` 保留（锁定内容点击仍优雅提示）
- 免费范围不变：太阳+阳明（34 首方剂数据完整）
- header logo 改为 tcmus.net 文字链

### `tcm/fuqingzhu/index.html`（傅青主女科辨证工具）
- **去购买后工具直接可用**：删掉 paywall 区 + License Key 输入区（`validateKey`/`validateKey_silent`/`unlockTool`/`WORKER_URL`/`fqz_key`），`toolSection` 默认显示
- 落地页保留精简介绍（症状分级/算法排序/方剂详情三特性）+ 安全声明
- **修了一个源站 bug**（不修工具是坏的）：`KB` 对象里 `formulas: [` 开头缺失（结尾的 `]` 还在），导致整个 script 解析失败、`KB.formulas` 未定义。已补上 `formulas: [`，11 首方剂（FQZ-018~028）数据验证完整

## 验证结果（本地 http.server）

- 11 个 URL 全部 200（含图片）
- 页内 `/tcm/` 内部链接无 404
- 4 个有 JS 的页面 `node --check` 全部通过
- JS 引用的 DOM id 与 HTML 全部对应；onclick handler 全部有定义
- HTML 标签平衡：9/10 通过（见下）

## 不确定点 / 已知问题（标注）

1. **shanghan/free.html 有两处 stray `</p>`**（第 177-178 行，安全声明区）——源站原有笔误，浏览器可容错，未动。如看着难受可手动删。
2. **女科 `formulas: [` 修复**：属 bug 修复非行为变更。源站 rootbro.com/tcm/fuqingzhu/ 同样坏着（整个工具 JS 解析失败）。如用户想与源站"一字不差"，可 revert，但工具将不可用。
3. **本草索引搜索框**：现在只有 1 张卡，搜索框形同虚设但无害；等收录多味药后自然有用。未删除。
4. **知识库首页英文切换**：卡片英文翻译保留源站原文（含 "Pro" 字样在 傅青主 EN 描述里如有——已检查，EN 文案无购买相关）。
5. **伤寒论免费版锁定内容**：点击仍弹窗提示完整版，外链到 rootbro.com/shanghan/（用户要求保留的外链）。tcmus 站内无完整版。
6. **图片**：`guizhi.jpg` 从 rootbro.com 原样下载（157KB，800×436），无版权水印之外的改动。
7. **未验证项**：无真浏览器，只做了静态 + node 层验证。建议 push 后在手机/桌面浏览器各点一遍两个辨证工具的完整交互流程。
