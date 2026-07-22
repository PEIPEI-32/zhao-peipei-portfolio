# 赵裴裴个人网站｜Chrome 开屏闪烁排查交接

> 交接时间：2026-07-23（Asia/Shanghai）  
> 项目目录：`/Users/zjr/Desktop/AI训练师/VS code/个人网站`  
> 当前重点：Chrome 中首次森林开屏仍有明显明暗跳变/黑闪，需要继续修复并实机复测。  
> 限制：不要部署、提交、推送或创建 PR；不要改写 Experience 或其他无关章节。

## 1. 新对话应直接执行

1. 完整阅读本文件。
2. 检查：
   - `src/components/Portfolio.tsx` 约 28–110、190–315、555–590 行。
   - `app/globals.css` 约 1050–1110、1350–1375 行。
   - `public/media/hero/intro/` 中的透明森林图层。
3. 使用已安装的 Chrome 控制技能连接 Google Chrome，优先认领 `http://localhost:3003/` 标签页。
4. 只用生产预览 `3003` 做开屏视觉验收；不要用带 HMR 的 `3002` 判断是否仍闪烁。
5. 修复后运行 `npm run lint`、`npm run build`，重新启动生产预览并在 Chrome 中逐帧复测。

## 2. 用户目标

首页需要满足：

- 森林穿越开屏平滑，无闪白、黑闪、整屏明暗抽动或明显卡顿。
- 开屏结束后，主姓名、宣言、标签、探索提示、三枚多面体，以及带金环的石膏半身像从视口外沿各自轨道滑入最终位置。
- 页面向下滚动、首屏内容上移时，上述主体元素沿同一条轨道反向滑出。
- 顶部枝叶、导航和两侧小字保留在风景画面中，匹配用户给出的纯风景参考状态。
- 同一标签页会话只完整播放一次；支持跳过、Esc、减弱动态与滚动锁恢复。

## 3. 本轮已经完成的代码修改

### 3.1 共用入场/退场轨道

`src/components/Portfolio.tsx` 顶部新增 `HeroMotionTrack` 与 `heroMotionTracks()`。

同一组位移、旋转和透明度参数现在同时用于：

- 开屏尾声：从视口外进入。
- 首屏滚动：沿完全相同方向反向退出。

轨道覆盖：

- `.hero-name--cn`
- `.hero-name--en`
- `.hero-copy`
- `.explore`
- 三个 `.hero-polyhedron`
- `.hero-sculpture`（金环嵌套其中，因此与雕像同轨）

顶部枝叶 `.hero-environment`、导航 `.site-nav` 和 `.hero-eyebrow` 不参加滚动退场。

### 3.2 已处理的闪烁/性能问题

- 入场素材预加载后调用 `image.decode()`，避免未解码图片直接加入动画。
- 开屏场景加载期间默认隐藏，素材完成后再显示。
- 删除两张近景和掠镜叶片的实时全屏 `blur()` 动画。
- 删除错误的不透明纯色开屏底层；`.intro-scene` 目前为透明背景。
- 开屏期间暂停金环、枝叶、天空雾、湖光和尘埃等常驻循环动画。
- 首页背景在加载阶段保持 `scale(1.12)` 起始构图。
- 删除动画结束时对 `.hero-landscape` 的 `clearProps: transform`；旧逻辑会造成 `1.015 → 1.12 → 1.015` 双跳。
- 不再淡出整个 `.intro-scene` 父容器；现在先淡出 `.intro-fog, .intro-light`，再直接隐藏场景。
- `.intro-scene` 的 `contain` 从 `strict` 降为 `paint`，并加 `isolation: isolate`。
- 两个原有 `react-hooks/set-state-in-effect` ESLint 错误已修复。

### 3.3 HMR 状态机保护

当前会话键：

```ts
const introSessionKey = "zpp-forest-intro-seen-v5";
```

`useLayoutEffect` 开头新增：

```ts
if (root.current.dataset.intro === "done") return;
```

原因：vinext/Vite 热更新会保留 React 的 `done` 状态，但重新执行新版 effect。旧代码会在 `.intro-scene` 已卸载时再次启动时间线，产生十多条 `GSAP target ... not found`，并再次写入“已播放”标记。这是开发预览中严重闪屏与无法正确重放的重要原因。

## 4. Chrome 已经可用

用户已安装并启用 ChatGPT Chrome Extension。Chrome 控制连接成功，曾认领：

- `http://localhost:3002/`（开发预览，有 HMR，不适合最终视觉判断）
- 后来导航到 `http://localhost:3003/`（生产预览，应继续使用）

新对话应按 Chrome 技能要求重新初始化并读取完整浏览器文档，然后：

1. 给会话命名。
2. 从 `chrome.user.openTabs()` 找到 `http://localhost:3003/`。
3. 认领该标签页。
4. 最终用 `chrome.tabs.finalize({ keep: [{ tab, status: "handoff" }] })` 保留未完成页面。

不要直接检查、清除或修改 sessionStorage；需要强制重放时升级代码中的 `introSessionKey`，构建并在新端口/新 origin 运行生产预览。

## 5. 当前服务器

交接时均返回 HTTP 200：

- 开发预览：`http://localhost:3002/`
- 生产预览：`http://localhost:3003/`

生产预览通过以下命令启动：

```bash
PATH=/private/tmp/codex-node/bin:$PATH npm run start -- --port 3003
```

若新对话发现服务器已停止，先重新构建，再使用空闲端口启动生产预览。

## 6. Chrome 实机逐帧结果（最重要）

在 `http://localhost:3003/` 使用 `v5` 会话键成功完整重放。采样状态如下：

| 约略时间 | phase | 关键状态 |
|---|---|---|
| 0.10s | loading | 背景 `scale(1.12)`；开屏场景隐藏；只有纯首页风景背景 |
| 0.65s | playing | 中/近景森林已显示，背景约 `scale(1.088)` |
| 1.40s | playing | 中景缓慢扩大，近景约 `scale(1.052)` |
| 2.40s | playing | 近景约 `scale(1.375)`，位移约 `x=-365px` |
| 3.30s | playing | 近景约 `scale(2.194)`，位移约 `x=-1160px` |
| 4.05s | playing | 中/近景已 `autoAlpha: 0`；雕像入场约 49% |
| 4.70s | playing | 开屏场景已隐藏；雕像基本归位 |
| 5.35s | done | `.intro-scene` 已从 React 树卸载，首页稳定 |

### 肉眼观察

生产预览已能完整播放，但逐帧截图中仍出现一次非常显眼的整屏变暗/接近黑场。它发生在森林推进中段，而不是最终 UI 入场或 `done` 状态切换。

这意味着当前剩余问题更可能来自“透明森林素材叠加与大幅缩放后的实际画面内容/alpha 覆盖”，而不是单纯 Chrome 合成 bug：

- 初始只有首页风景，随后多张森林层瞬间加入，亮度显著变化。
- 两张近景放大并横向移出时，素材本身可能含大面积低透明度暗像素。
- 多张 1702 × 924 全屏 alpha WebP 同时叠加，暗部会被累计。
- `.intro-vignette` 初始 opacity 为 `.86`，可能与近景暗部共同造成中段黑场。
- 中/近景在约 3.86s 使用短至 0.32s 的 `autoAlpha` 同时退出，也可能形成明显亮度跳变。

该黑场已经在无 HMR 的生产预览中复现，因此不能再把问题全部归因于开发服务器。

## 7. 下一步建议（按优先级）

### 第一步：隔离是哪一层造成黑场

不要一上来继续微调所有时间参数。应建立几次最小化生产测试，每次升级 session key 或换新端口：

1. 临时隐藏 `.intro-vignette`，其余不变，重放并抓帧。
2. 恢复 vignette，临时隐藏 `.intro-foreground-leaves`，重放。
3. 只保留左右中景，隐藏两张 `.intro-near`，重放。
4. 单独恢复左近景、右近景，确定是哪张素材带来暗覆盖。

通过 Chrome 截图比较 2.0–3.5 秒的亮度，确定罪魁祸首后再正式改动。

### 第二步：推荐的正式修复方向

优先考虑以下方案之一：

- 降低近景层初始 opacity，并在放大过程中提前渐隐，而不是到 3.86s 一起快速消失。
- 将左右近景最终缩放从约 2.7 降到 2.1–2.3，横向位移加大，让树木靠平移离场而不是靠超大缩放覆盖视口。
- 将 `.intro-vignette` 初始 opacity 从 `.86` 降至约 `.35–.5`，并更早淡出。
- 对含大面积暗色半透明像素的 WebP 素材重新清理 alpha；不要简单用 CSS `mix-blend-mode` 或重型滤镜补救。
- 中/近景不要在 0.32s 内一起消失；改为左右错开、持续约 0.55–0.8s 的提前淡出，避免画面亮度骤变。

### 第三步：消除首次 0.1–0.6s 的“纯背景→森林”跳变

当前首帧是纯首页风景，素材解码完成后森林层原子出现。即使不卡，也可能被用户感知为闪屏。

可选方案：

- 素材解码完成后先用 0.25–0.4s 将中/近景淡入，再开始推进。
- 或制作一张与动画第一帧完全一致的静态 poster，在 hydration/预加载阶段使用，随后无缝切换为分层动画。

如果制作 poster，必须保持与首页背景构图一致，避免恢复“不透明森林图换首页图”的旧方案。

## 8. 不要做的事情

- 不要恢复整张森林图替换首页背景。
- 不要恢复开屏父容器整体 opacity 交叉淡化。
- 不要重新加入实时全屏 `blur()`、WebGL、Lenis 或重型滤镜。
- 不要为了复测直接读写浏览器存储。
- 不要用开发预览的 HMR 警告判断生产效果。
- 不要改写 Experience；其透明室内前景 + 常驻室外背景的 2.5D 穿越必须保留。
- 不要重新加入 Experience 的楼梯或月亮。

## 9. 当前验证结果

交接前最后一次验证：

- `npm run lint`：通过。
- `npm run build`：通过。
- `http://localhost:3002/`：HTTP 200。
- `http://localhost:3003/`：HTTP 200。
- Chrome Extension：已安装，可连接并控制 Chrome。
- Chrome 生产预览：完整入场已成功重放；中段黑闪仍未解决。

## 10. 新对话建议提示词

```text
请完整读取 /Users/zjr/Desktop/AI训练师/VS code/个人网站/HANDOFF_2026-07-23-CHROME-FLICKER.md，继续修复 Chrome 中首页森林开屏的中段黑闪。先连接已安装扩展的 Google Chrome，使用生产预览而不是 HMR 开发预览；按交接文档第 7 节逐层隔离 vignette、foreground 和左右 near 图层，找出造成 2–3.5 秒整屏变暗的具体素材或叠加逻辑。修复后运行 lint/build，并在 Chrome 逐帧复测。不要改 Experience，不要部署、提交或推送。
```
