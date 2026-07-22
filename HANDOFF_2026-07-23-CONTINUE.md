# 赵裴裴个人网站｜森林入场与首页环境动画交接

> 交接时间：2026-07-23（Asia/Shanghai）  
> 项目目录：`/Users/zjr/Desktop/AI训练师/VS code/个人网站`  
> 当前本地服务：`http://localhost:3001/`（交接时 HTTP 200）  
> 状态：功能与素材已完成，生产构建通过；交互式浏览器视觉验收和 2 个 ESLint 问题仍待处理。  
> 限制：不要部署、提交、推送或创建 PR；不要改写无关页面。

## 1. 新对话直接这样开始

请先完整读取本文件，再检查：

- `src/components/Portfolio.tsx`
- `app/globals.css`
- `public/media/hero/intro/`
- 原交接文件 `HANDOFF_2026-07-23.md` 的第 0 节

然后继续以下收尾工作：

1. 修复本文第 7 节列出的两个 ESLint 错误，不改变现有播放逻辑。
2. 重新运行 `npm run lint` 与 `npm run build`。
3. 如果浏览器实例可用，完成本文第 8 节的交互视觉验收；如果仍不可用，明确记录该限制，不要安装独立 Playwright，也不要改用无关浏览器工具。
4. 只有 QA 发现实质问题时才调整动画参数或布局。

## 2. 用户当前目标

首页需要两套衔接动画：

1. 首次进入时自动播放一次、约 4–6 秒的多景深森林穿越入场。
2. 入场结束后，首页四周持续循环克制的枝叶、鸟群、薄雾、湖面光影、尘埃与几何体微动。

关键验收：

- 不是一张森林图整体放大，也不是森林淡出后换首页图。
- 首页背景从第一帧起就在森林通道深处，整个过程不更换背景图。
- 近景、中景、远景速度不同，树木向两侧掠出，最终自然停在当前首页构图。
- UI 在镜头停止后分批出现。
- 入场只在同一标签页首次会话播放，返回首页不重复。
- 支持跳过、Esc、滚动锁恢复、页面隐藏暂停、移动端减量和 `prefers-reduced-motion`。

## 3. 已完成实现

技术栈保持为 Next/React 19、GSAP 3、ScrollTrigger、DOM/CSS 图层；没有引入 WebGL、新依赖或重型全屏滤镜。

### 森林入场

位置：`src/components/Portfolio.tsx` 约 104–214 行，相关 JSX 约 483–506 行。

- 使用独立的左右中景、左右近景、掠镜叶片、雾、光和暗角图层。
- 首页背景 `.hero-landscape` 从第一帧起位于所有透明森林层下方。
- 约 5.18 秒 GSAP timeline：近景最快放大并向两侧移出，中景较慢，背景缓慢回到最终构图。
- 导航、姓名、中英文说明、几何体与雕像在末段错峰淡入并轻微上移。
- 播放时给 `html` 添加 `intro-lock`，结束/跳过/卸载时移除。
- “跳过 / Skip”按钮和 Esc 都会结束时间轴、恢复最终首页状态。
- 入场完成写入 `sessionStorage["zpp-forest-intro-seen-v1"] = "1"`。
- 入场素材预加载完成后才启动；完成后 `.intro-scene` 从 React 树卸载。

### 首页常驻环境

位置：鸟群调度约 240–297 行，JSX 约 507–570 行；CSS 约 1043–1361 行。

- 顶部左右树枝各拆为稳定主枝和两组末端叶簇，共四组不同周期、不同延迟的轻微摆动。
- 两组远鸟和一只偶发近鸟由随机定时器调度；飞出视口并收到 `animationend` 后才重新安排。
- 鸟由 CSS 身体和双翼组成，飞行时双翼独立扇动；左右方向、飞行高度、弧度、时长会随机变化。
- 页面隐藏时给根节点添加 `.is-page-hidden`，暂停 CSS 动画且不发起新飞行；返回后恢复。
- 首页还有极弱的天空雾、湖面光影、尘埃和几何体悬浮。
- 移动端隐藏一个中景层、掠镜叶片、近鸟、第二组远鸟和多余尘埃。
- `prefers-reduced-motion` 跳过高速森林推进，只短暂淡入首页，并关闭循环环境动画。

## 4. 新增素材

目录：`public/media/hero/intro/`

- `hero-homepage-clean.webp`
- `forest-middle-left.webp`
- `forest-middle-right.webp`
- `forest-near-left.webp`
- `forest-near-right.webp`
- `forest-foreground-leaves.webp`
- `branch-top-left-base.webp`
- `branch-top-left-leaves-a.webp`
- `branch-top-left-leaves-b.webp`
- `branch-top-right-base.webp`
- `branch-top-right-leaves-a.webp`
- `branch-top-right-leaves-b.webp`

全部使用 1702 × 924 的统一构图基准。除 `hero-homepage-clean.webp` 为不透明底图外，其余 11 个图层均带 alpha 通道。交接时以上 12 个 URL 均返回 HTTP 200。

临时可复现处理脚本：`tmp/imagegen/process_forest_intro_assets.py`。

## 5. 已完成验证

- 2026-07-23 最后一次 `npm run build` 成功，vinext 的 5 个构建阶段全部通过。
- 本地首页和 12 个入场素材请求均返回 HTTP 200。
- 12 个素材尺寸均为 1702 × 924；11 个前景层确认包含 alpha。
- 代码审计确认首页背景没有在时间轴中更改 `src`、`background-image`、`display`、`visibility` 或 z-index。
- 静态透明图层合成已经检查，洋红键色残留已通过更严格的键控与局部去色降低。

构建命令说明：当前 shell 可能找不到 `npm`，但 Node 22.17.0 位于 `/private/tmp/codex-node/bin`。如仍存在，可使用：

```bash
PATH=/private/tmp/codex-node/bin:$PATH npm run build
PATH=/private/tmp/codex-node/bin:$PATH npm run lint
```

## 6. 必须保护的既有成果

- Experience 已经是“透明室内前景 + 第一帧常驻室外背景”的 2.5D 穿越，不得恢复两张完整图硬切或 opacity 交叉淡化。
- Experience 的悬浮楼梯和月亮已从素材与代码中删除，不得重新出现。
- 首页中英文已经完成高对比衬线字体与横竖交替的编辑式排版，不要覆盖。
- 不要恢复 WebGL、Lenis、重型全屏滤镜或修改无关章节。
- 原 `HANDOFF_2026-07-23.md` 第 2 节之后仍保留若干历史方案描述，其中有“不透明室内图/交叉淡化”等过时内容；以其第 0 节和本文件为准。

## 7. 当前未完成：两个 ESLint 错误

`npm run lint` 当前失败，但生产构建通过。错误均来自 `react-hooks/set-state-in-effect`：

1. `src/components/Portfolio.tsx:141`：初始化 effect 中直接调用 `setIntroPhase("done")`。
2. `src/components/Portfolio.tsx:237`：effect 中调用 `skipIntro()`，其内部会同步 `setIntroPhase("done")`。

修复要求：

- 不要简单禁用 ESLint 规则。
- 保留首次会话判断、减弱动态短淡入、跳过按钮、Esc、滚动锁清理和时间轴销毁行为。
- 优先让初始 phase 由惰性 `useState` 初始化，或把媒体查询变化处理改为事件回调；避免在 effect 主体同步 setState。
- 修复后重新跑 lint 和 build。

## 8. 仍待交互式视觉 QA

浏览器控制技能已按要求初始化并执行故障排查，但 `agent.browsers.list()` 返回 `[]`，没有可连接的浏览器实例。因此尚未获得实际录屏或动态截图。

浏览器可用后应验证：

1. 清除 `sessionStorage["zpp-forest-intro-seen-v1"]`。
2. 1440 × 900 首次完整播放：近/中/远景是否有明显视差，最终首页构图是否稳定。
3. 390 × 844 首次完整播放：性能、裁切、文字与枝叶遮挡。
4. 点击跳过与按 Esc：时间轴立即结束、UI 正常、滚动恢复。
5. 刷新与站内返回：首页完整入场不重复。
6. 切换标签页：循环动画暂停，返回后恢复，鸟不会在边缘瞬移。
7. `prefers-reduced-motion: reduce`：没有高速推进，只出现短淡入，环境循环停止。
8. 枝叶不遮挡导航、姓名和正文；鸟不穿过雕像面部和重要文字。

若浏览器仍不可用，最终答复应如实说明：生产构建、静态合成、素材透明通道和 HTTP 请求已验证，但交互式视觉录屏未完成。

## 9. 建议的新对话提示词

```text
请读取 /Users/zjr/Desktop/AI训练师/VS code/个人网站/HANDOFF_2026-07-23-CONTINUE.md，继续森林入场与首页环境动画的收尾。先修复文档第 7 节的两个 ESLint 错误并重新运行 lint/build；然后按第 8 节做浏览器交互验收。不要重写无关页面，不要部署、提交或推送。
```
