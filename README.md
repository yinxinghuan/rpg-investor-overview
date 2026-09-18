# AlterU AI RPG 项目介绍

面向投资人与项目伙伴的中英文说明网站。A 蓝金探索版与 C 创作平台版由同一份正文生成，包含项目愿景、样板玩法、AI/规则/存档原理、素材生成技术图、多人规划和未来应用。

## 本地开发

- `npm run dev`：仅提供 `public/`，http://127.0.0.1:5188/
- `npm run build`：生成 A/C 两版，并将静态文件复制到 `dist/`。无需安装依赖。
- A：`index.html`；C：`concept-c.html`；双版本入口：`compare.html`。英文文件分别为 `index-en.html`、`concept-c-en.html`、`compare-en.html`。顶部可切换语言，A/C 正文切换时保留章节锚点。

## 编辑

- `design/content.html`：共享中文正文。
- `generate-concepts.mjs`：A/C 排列、首屏和导航。
- `design/en.json`：英文文案字典；`design/english.mjs`：构建时翻译与遗漏检查。英文文件由构建生成，不直接编辑。
- `design/compare.html`：比较页中文源。
- `design/render-art-diagram.mjs`：生成 A/C、桌面/手机、中/英文共八份 SVG。
- `public/engine.css`、`public/multiplayer.css`、`public/localization.css`：新增章节与双语适配。
- `public/base.css`、`theme-a.css`、`theme-c.css`：视觉系统。
- `public/art-flow.css`：素材复用与按需生成图，桌面双路并排，手机纵向阅读。
- `public/main.js`：样板标签页与 C 版未来应用示例。
- `public/PROVENANCE.md`：能力与截图来源。
- `design/archive/`：历史方向保留，不包含在发布产物中。

## 发布

GitHub Pages 使用 `.github/workflows/pages.yml`。推送 main 后构建发布 `dist/`。所有资源使用相对路径，支持部署在子目录。`release.json` 记录构建所用 commit，发布后校验 A/C 页面、CSS、脚本与素材可访问。

本项目是说明网站，没有游戏后台或账号系统。试玩按钮链接到独立的已发布样板。用户生成整款游戏、科学/教学/语言应用属于未来展望。

开门示例、创作台均是预设内容切换，不调用 AI、不读取或写入游戏存档。多人内容明确为目标体验；新 Prolog 服务和现有旧街样板的集成进度在正文分开说明。
