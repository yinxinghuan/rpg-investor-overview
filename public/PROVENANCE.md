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
