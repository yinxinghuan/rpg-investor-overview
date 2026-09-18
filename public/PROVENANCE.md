# 内容依据

## 产品定位修正

核心卖点按用户明确的产品方向表述为：大语言模型帮助扩展故事，生成新内容与可探索空间，目标是持续探索、不断扩展的世界。“无限探索”是产品愿景，不能由当前有限场景样板推导为已经支持任意世界无限生成。

本轮直接核对：`server/old-street-expansion-planner.ts` 中的关联发现与照片规划；`server/old-street-room-composer.ts` 中模型布置意图到可达布局的组装；`src/old-street-expansion-plan.ts` 中固定暗房模板与媒体接入。档案截图是该玩法的界面示例，不宣称这张截图本身证明动态布局；旧街、屋顶与搭板机制是作者制作的内容。

截至 2026-09-18。页面展示的是项目与样板能力，不代表完整产品、投资回报或用户验证结果。

- 样板游戏：`../rpgjs-story-lab/README.md`、`doc/requirements.md`、`doc/technical.md`。
- 技术工作流：`../.agents/skills/build-spatial-story-game/SKILL.md`。
- `street.png`：`rpgjs-story-lab/_qa/ui/door-release-20260918/platform-layout-street-390.png`，本地平台构图 QA。
- `archive.png`：`rpgjs-story-lab/_qa/ui/archive-20260917/platform-layout-entry-390.png`，本地平台构图 QA。
- `roof.png`：`rpgjs-story-lab/_qa/ui/roof-supply-20260917/platform-layout-320-crossed.png`，本地平台构图 QA。
- `develop.png`：`rpgjs-story-lab/_qa/ui/campaign-finale-20260917/platform-layout-live-photo.png`，本地平台构图 QA。

技术栈以当前样板为准：RPG-JS、Canvas Engine/PixiJS、React/TypeScript、Vite，以及 Worker + Durable Object SQLite 的云端试运行。空间动作与叙事状态由同一权威旅程处理；受限生成仅准备内容，不自行授予道具或更改地图。独立游戏组装能力已有第二章节实证，但没有宣称任意主题一键生成、完整生产后台复用或跨设备账号恢复。

对外试玩入口来自 `games/games.json`。本地完整新委托存在待整合发布内容，线上版本的具体玩法以实际站点为准。

## 用户创作与应用展望

科学探索、课堂教学、语言学习及自然语言生成整款游戏均为用户要求补充的未来应用设想。页面将其标注为尚未上线；没有宣称当前样板提供科学模拟有效性、教学效果或语言能力提升的证据。科学与教学内容需专业审核。

## 素材生成图（2026-09-18）

图中采用“玩家行为 → 大语言模型规划 → 现有素材 / 按需图像生成 → 玩法接入 → 保存”结构。
实际实现依据：`rpgjs-story-lab/server/old-street-expansion-media.ts` 通过平台图像任务生成 768×576 照片、校验类型/尺寸/任务来源并持久化；`src/old-street-expansion-plan.ts` 保留暗房和工作台模板；`server/old-street-room-composer.ts` 在约束内重新排列已有素材并检查可达性。图像任务是异步过程，不宣称每一步实时重绘、任意新角色生成、自动美学审核或全世界生成已经完成。

## 流程图中的具体素材示例

2026-09-18 后续图表修订：人物、桌子、地板通过 SVG viewBox 显示 `archive.png` 的实际画面局部；生成照片显示 `develop.png` 中的照片区域。原始截图未修改，不引入第三方外部图片。底片图标为本项目原创 SVG。示例说明复用素材与新生成照片汇合到已有玩法，不宣称样板支持任意图像种类生成。

## 独立素材 → 组装场景（2026-09-18，再次修订）

本次替换上一版截图局部：

- `media/assembly/table.png` 原样复制自 `rpgjs-story-lab/doc/oldstreet-photo-table/cutout.png`；512×512，带 alpha。
- `media/assembly/shelf-and-folder.png` 原样复制自 `rpgjs-story-lab/doc/oldstreet-photo-shelf/cutout.png`；1024×512，带 alpha，两个独立帧分别是木搁架与照片夹。
- `media/assembly/generated-photo.png` 原样复制自 `rpgjs-story-lab/doc/archive-photo-media-20260917/candidate.png`；为平台图像生成的原始文件，其本地生成/接入记录见同目录 `review.md`。不再从显影界面截图裁照片。
- `media/assembly/floor.png` 原样复制自 `rpgjs-story-lab/doc/oldstreet-photo-floor/candidate.png`。

`old-street-dev.tsx` 实际导入上述放大台和搁架素材，`old-street-photo-table.ts`、`old-street-archive-art.ts` 定义其分帧和组合；地板由 `old-street-environment-art.ts` 导入。流程图通过 SVG 视窗显示原透明素材；灰白棋盘仅是预览底层。

下方房间是同一批原始素材的组装示意，标明 ① 放大台、② 搁架、③ 照片夹、④ 新照片的对应位置；用于解释素材如何合成场景，并非另一次游戏实机截图。图片不重绘、不去背景加工、不包含界面截取。展示图在 SVG 内只嵌入每张图片一次，通过引用复用。

## 混合架构与多人规划（2026-09-18）

新增 AI 叙事 + Prolog 规则 + Story Session 权威存档说明，按用户提供的产品总结改为开门、帮助店主两个浅显示例。用户给出的定义是内容依据；另核对以下项目记录：

- `memory/alteru_prolog_rpg_creation_project.md`：新服务的规则验证、权威状态、幂等与恢复；独立服务测试不等于旧街样板已经迁移。页面明确区分。
- `docs/plans/rpgjs-story-integration.md` 与 `rpgjs-story-lab/doc/technical.md`：旧街继续使用既有规则和存档链路；多人先同场、再单个共享动作、再共同任务。
- `rpgjs-story-lab/server/session-authority.ts`：行动编号、请求绑定、版本检查、状态与回执的原子提交。
- `memory/cinematic_multiplayer_rpg_concepts.md`：个人主线与公共痕迹/共同工程分层、同步与异步协作目标。

开门和借钥匙是解释机制的预设示意，不声称是旧街已经实现的对应任务。人物关系示例不虚构通用信任分数。页面不声称所有叙事文字一定在数据库提交后才生成，只有通过验证和提交的结果成为权威事实。

多人修桥示例是玩法设想，该 2D 探索系统首款多人样板尚未完成。没有用其他早期异步实验冒充本项目多人交付。

## 英文版本

正文、动态示例和素材图均有英文。真实游戏截图保留原样中文界面，英文旁注明为原游戏 UI；没有将截图重绘成并不存在的英文游戏版本。

## AlterU 品牌标识（2026-09-18）

页眉、页脚和浏览器图标直接复用 AlterU 落地页 `https://alteru.app/` 的官方资产：`alteru-landing/assets/brand/alteru.svg` 与 `alteru-favicon.svg`，原文件复制至 `public/media/brand/`。A 版使用原白色标识；C 版通过 CSS `brightness(0)` 显示深色标识，SVG 原文件不修改。

字标排版同步落地页 `_shared.css` 的 `.nav-brand`：图标 32px、横向间距 10px、Montserrat 800 / 14px、字距 0.18em、全大写。字体按落地页方式通过 Google Fonts 加载；移除原先附在标识中的 AI RPG 小字。
