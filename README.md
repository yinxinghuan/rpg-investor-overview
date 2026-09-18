# AlterU AI RPG 项目介绍

面向投资人与项目伙伴的中文说明网站。A 蓝金探索版与 C 创作平台版由同一份正文生成，包含项目愿景、样板玩法、素材生成技术图和未来应用。

## 本地开发

- `npm run dev`：仅提供 `public/`，http://127.0.0.1:5188/
- `npm run build`：生成 A/C 两版，并将静态文件复制到 `dist/`。无需安装依赖。
- A：`index.html`；C：`concept-c.html`；双版本入口：`compare.html`。

## 编辑

- `design/content.html`：共享中文正文。
- `generate-concepts.mjs`：A/C 排列、首屏和导航。
- `public/base.css`、`theme-a.css`、`theme-c.css`：视觉系统。
- `public/art-flow.css`：素材复用与按需生成图，桌面双路并排，手机纵向阅读。
- `public/main.js`：样板标签页与 C 版未来应用示例。
- `public/PROVENANCE.md`：能力与截图来源。
- `design/archive/`：历史方向保留，不包含在发布产物中。

## 发布

GitHub Pages 使用 `.github/workflows/pages.yml`。推送 main 后构建发布 `dist/`。所有资源使用相对路径，支持部署在子目录。`release.json` 记录构建所用 commit，发布后校验 A/C 页面、CSS、脚本与素材可访问。

本项目是说明网站，没有游戏后台或账号系统。试玩按钮链接到独立的已发布样板。用户生成整款游戏、科学/教学/语言应用属于未来展望。
