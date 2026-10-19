# tcmus.net v2 视觉升级 — 推送说明（2026-10-19）

## 改了什么
全站 15 个页面换皮为"经方风格"（对标 /tcm/ 知识库页）：
`/`、`/xuewei/`（含 hegu/zusanli/yongquan 3 篇）、`/xue/`（01/02/10）、
`/bikeng/`（03/04/05）、`/yanxuan/`、`/huangye/`、`/about/`、`/fankui/`

- 色板：宣纸 #faf8f4 / 墨 #1a1612 / 印章红 #8b3a2a / 鎏金 #b8942a / 青 #2a6b5e
- 字体：标题 Georgia serif（中文 fallback 宋体系），正文同栈、行高 1.9
- Hero 重做：加大字号（clamp 自适应）、顶部印章红压边、"医"字水印底纹、
  右下角"医"字印章、按钮改印章红——治"小脑袋大身子"
- 卡片 hover 底部印章红划线（与 /tcm/ 同款交互）；导航当前项红下划线
- **导航统一为 9 项**：首页/穴位自查/中医入门/经典之方/避坑指南/严选/黄页/关于/反馈
  （之前内页缺"反馈"和"经典之方"，已补上；各页高亮项不变）
- 链接色由蓝 #0b5fff 改为印章红，全站统一

## 没动的东西（文案零改动）
- 所有正文、标题、按钮文字、链接地址原样保留（含 Hero 狠版钩子 + 备用钩子 HTML 注释）
- `/tcm/` 全部页面不动；`llms.txt`、`robots.txt` 不动
- 文章页 JSON-LD（SEO/GEO）原样保留；`/fankui/` 的 Google Forms iframe 原样保留

## 怎么 push（GitHub Desktop）
1. 打开 `drrootBro/tcmus-web` 仓库文件夹
2. 把本包 `v2/` **里面的内容**（15 个 html，带目录结构）复制出来，
   覆盖到仓库对应位置（`v2/index.html` → 仓库根目录 `index.html`，以此类推）
3. **不要删除**仓库里的 `tcm/`、`llms.txt`、`robots.txt`（本包不含它们）
4. Commit → Push，Cloudflare Pages 自动部署

## 取舍标注（不确定的地方）
1. 印章/水印用"医"字——纯装饰（aria-hidden），想换字告诉我，一行 CSS 的事
2. Hero 在手机端字号自动缩小、印章缩小，375px 宽度下验证过不溢出
3. 卡片、表格在窄屏下保持纵向堆叠，未做横滑（v1 也没有）
4. `.badge` 默认改为印章红边框（"新"更醒目），`.badge.gray` 保持灰色

## 已验收
- 本地 http.server 15 页全 200，导航 9 项逐页可点且高亮正确
- 全站内链爬取：15 个内部地址零 404（/tcm/ 链接在仓库里存在，包内未含，跳过）
- CSS 大括号配平；JSON-LD、Hero 注释、iframe 均保留
