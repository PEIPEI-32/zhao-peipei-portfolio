# 赵裴裴个人网站｜最新交接文档

> 最后更新：2026-07-23（Asia/Shanghai，Experience 镜头推进转场已完成）  
> 项目目录：`/Users/zjr/Desktop/AI训练师/VS code/个人网站`  
> 本地预览：`http://localhost:3000/`  
> 状态：当前源码生产构建成功；未部署、未提交、未推送。  
> 最新完成：Experience 已改成同一固定舞台内的镜头推进；室内围绕拱门天空持续放大并与后方室外湖谷交叉淡化，数据随后依次浮现。

## 1. 新对话直接执行的指令

先完整阅读本文，再继续当前网站。不要重做首页，不要恢复已经删除的页面，不要部署、提交或推送。

用户最新要求原文：

> 图1石膏全身像这一部分的动效改成从图2柱子后缓慢向右上移动到当前位置，需要先把柱子拆分出来之后再做。

这里的“图1”是 Experience 章节中的石膏全身像；“图2柱子”是 Experience 底图左侧最前景的高大棕色古典柱体（旁边还有一根较窄的绿色柱体）。用户明确要求先拆柱子，再做遮挡关系，不能只靠把雕像淡入来假装从柱后出现。

## 2. 最新任务已完成

- 新增透明前景柱素材：`public/media/experience/experience-column-foreground.webp`（1672 × 941，与底图同画布）；目标是原图 x=0–136、贴住画面最左边缘的宽棕色柱，不是中间偏左的细柱。
- 柱体使用底图原始像素精确蒙版，避免模型重绘导致的错位或重影。
- 图层顺序现为：底图 z0、楼梯 z3、雕像/月亮 z4、前景柱 z5、场景调色层 z6、标题与数据 z8。
- 雕像动画已取消旧的左上方淡入；桌面从 `{ xPercent: -150, yPercent: 5, opacity: 1 }`、手机从 `xPercent: -100` 缓慢移动到原位置，持续时间 `0.34`。起点已上提以避免脚和衣摆从柱底漏出，终点仍为 `{ xPercent: 0, yPercent: 0 }`。
- 月亮和三组楼梯的入场动效已按用户要求取消，始终静态显示在最终位置；标题与数据时序、反向滚动和低动态模式保持。
- 手机断点单独调整前景柱的 `object-position`，确保窄屏仍有真实遮挡。
- 新增纯室外湖谷底图：`public/media/experience/experience-outdoor-landscape.webp`（1672 × 941），无室内建筑、楼梯、月亮、雕像或文字。
- 室内和室外是同一固定舞台中的两个绝对定位全屏层；不再使用任何上下拼接或 `yPercent: ±100` 的纵向场景位移。
- `.experience-art--indoor` 与 `.experience-indoor-copy` 以拱门内天空为缩放中心（桌面 `64% 38%`），从 `scale: 1` 推进到 `2.35`。
- 后方 `.experience-outdoor` 始终原位铺满视口，在推进后段从 `autoAlpha: 0 / scale: 1.08` 交叉淡化到 `autoAlpha: 1 / scale: 1.28`。
- 月亮和三组楼梯不再各自动画，只随室内镜头整体放大并自然移出视口。
- 四组 `.metric` 从时间轴 `0.76` 开始按 `0.07` 间隔，在室外场景完全显现后依次上浮出现。
- Experience 滚动长度调整为桌面 `470vh`、手机 `410vh`；低动态模式直接显示室外场景和静态数据。
- `PATH=/tmp/codex-node/bin:$PATH npm run build` 已成功。

## 3. 当前页面真实结构

页面顺序现在是：

1. Hero
2. About
3. 艺术插页 I
4. Experience
5. 艺术插页 II（“观察，不是静止的凝视。”，已重制）
6. Capabilities
7. AI Lab
8. Tools
9. Contact

以下部分已经根据用户截图从 JSX 中删除，绝对不要恢复：

- “03 / REAL-WORLD EXPERIENCE”整段
- 标题“真实世界，是最直接的用户研究。”
- “外卖众包 / 密室逃脱 NPC”两张内容块
- 艺术插页 III：“许多微小变化，组成一片浪。”
- 艺术插页 IV：“能力，不只写在纸上。”
- 艺术插页 V：“工具退后，人的判断向前。”
- 艺术插页 VI：“下一次连接，从这里开始。”

`src/content/profile.ts` 中这些旧文案数据仍然存在，但 `Portfolio.tsx` 已不渲染它们。不要因为搜索到数据就误以为页面还存在。

## 4. 已完成且必须保留的修改

### Hero

- 首页已经恢复为原设计，使用：
  - `public/media/hero/hero-landscape.webp`
  - `public/media/hero/hero-bust.webp`
  - `public/media/hero/hero-polyhedron-1.webp` 至 `hero-polyhedron-3.webp`
- 不要把用户后来提供的暗色湖景图改到 Hero；那张图属于艺术插页 II。

### About

- 使用 `public/media/about/about-landscape.webp`。
- 石膏像、蝴蝶、放大镜、左右植物保持现有分层和滚动效果。
- 不恢复蓝色科技风或现代圆轨道。

### Experience

- 室内底图：`public/media/experience/experience-landscape.webp`。
- 室外底图：`public/media/experience/experience-outdoor-landscape.webp`。
- 当前石膏像：`public/media/experience/experience-statue-v2.webp`。
- 月亮：`public/media/experience/experience-orb-v2.webp`。
- 楼梯：
  - `experience-stairs-upper-left.webp`
  - `experience-stairs-upper-center.webp`
  - `experience-stairs-main.webp`
- 当前源码仍是单张侧身雕像；动效已改为从画面最左边缘的宽棕色柱后向右上移动到原位置。
- 室内场景围绕拱门天空持续放大；放大后段与原位铺设的室外场景交叉淡化，数据在室外阶段依次浮现。
- 月亮和三组楼梯已取消独立入场动效，只随室内镜头整体放大并移出视口。

### Experience 转身素材的特殊说明

上一轮曾用图像编辑技能生成三个转身姿态：

- `public/media/experience/turn/statue-front.webp`（正面直视）
- `public/media/experience/turn/statue-quarter.webp`（轻微向右转）
- `public/media/experience/turn/statue-three-quarter.webp`（较大角度向右转）

这些文件目前存在，但当前 `Portfolio.tsx` 没有引用它们；源码已被用户撤回为单张 `experience-statue-v2.webp`。不要在没有确认的情况下把四姿态交叉淡化方案重新接回页面。最新明确要求是“从柱子后向右上移动到当前位置”。

### 艺术插页 II

- 这是 Experience 后面的“II / ART INTERMISSION”，标题为“观察，不是静止的凝视。”。
- 已替换为暗色湖景、石膏半身像、圆环和多面体分层动画。
- 使用素材：
  - `public/media/interlude/observation/hero-landscape-v2.webp`
  - `public/media/interlude/observation/hero-bust-v2.webp`
  - `public/media/interlude/observation/hero-polyhedron-v2.webp`
- 石膏像下沉离场，多面体从空中落向石板，圆环缓慢自转。
- 不要误改首页 Hero，也不要删除这一插页。

## 5. 当前关键代码位置

| 文件 | 作用 |
| --- | --- |
| `src/components/Portfolio.tsx` | 页面 JSX、GSAP/ScrollTrigger、Experience 和插页 II 动画 |
| `app/globals.css` | 全站最终样式、Experience 图层位置、响应式和低动态模式 |
| `src/content/profile.ts` | 中英文文案；包含部分已不渲染的旧段落数据 |
| `next.config.ts` | `images.unoptimized: true`，必须保留 |
| `worker/index.ts` | vinext Worker 和旧图片优化 URL 降级 |

重要选择器：

- `.experience-art`
- `.experience-landscape`
- `.experience-statue`
- `.experience-orb`
- `.experience-stairs`
- `.experience-title-block`
- `.art-interlude--observation`
- `.observation-*`

`app/globals.css` 是多轮追加式改版。最终有效 Experience 样式主要在 “Art direction v4” 与后面的 Performance pass 附近。不要只看文件前部的旧规则。

## 6. 性能约束，务必不要回退

- Lenis 已移除；使用浏览器原生滚动。
- ScrollTrigger 仅负责动画，Experience `scrub: 0.1`。
- 不恢复 Three.js、WebGL、React Three Fiber 或 Drei。
- 不增加全屏动态 blur、filter、mix-blend-mode、backdrop-filter 或噪点重绘。
- 不做逐像素、逐帧 canvas 运算。
- 图片尽量输出为裁切后的透明 WebP。
- 动画元素继续使用 `force3D` / `backface-visibility`。
- 必须保留 `prefers-reduced-motion`，低动态模式下柱子和雕像应显示在最终稳定位置。

## 7. 图像编辑工作流

拆柱子属于本地位图编辑任务，必须先读取并使用 `imagegen` 技能：

`/Users/zjr/.codex/skills/.system/imagegen/SKILL.md`

建议使用内置图像编辑工具，从 Experience 底图提取柱子到纯色键背景，再用技能自带的 `remove_chroma_key.py` 转为透明 WebP。生成后必须：

- 放入项目 `public/media/experience/`；
- 检查透明角、柱体边缘、底座和顶部是否完整；
- 对齐底图原位置，确保不会出现重影或跳动；
- 不依赖 `$CODEX_HOME/generated_images` 作为运行时路径。

## 8. 当前验证状态

2026-07-22 最新一次验证：

- `PATH=/tmp/codex-node/bin:$PATH npm run build` 成功。
- 当前源码只渲染艺术插页 I 和 II。
- 当前源码仍引用单张 `experience-statue-v2.webp`。
- “拆柱子 + 柱后移动”已实现，前景柱素材为 `experience-column-foreground.webp`。
- “镜头推进 + 原位交叉淡化到室外 + 数据依次浮现”已实现，室外素材为 `experience-outdoor-landscape.webp`；Experience 时间轴中没有场景级纵向位移。
- 未做最新浏览器录屏或帧率分析。

## 9. 本地运行

Node 要求 `>=22.13.0`，`.nvmrc` 为 `22.17.0`。

```bash
PATH=/tmp/codex-node/bin:$PATH npm run dev
PATH=/tmp/codex-node/bin:$PATH npm run build
```

本地地址：`http://localhost:3000/`

用户尚未授权部署。不要自行发布、提交、推送或创建 PR。

## 10. Git 与文件安全

- 当前项目几乎全部仍为 untracked，没有正式 commit。
- 不要使用 `git reset --hard`、`git checkout --` 或清理未跟踪文件。
- 所有现有改动和素材都视为用户资产。
- 不要删除 `public/media/experience/turn/`，即使它当前未被引用。
- 不要删除插页 II 的 `public/media/interlude/observation/`。
- 每次实质修改后至少运行一次生产构建。

## 11. 内容真实性

`src/content/profile.ts` 仍有占位符：

```ts
email: "EMAIL_ADDRESS"
douyin: "DOUYIN_URL"
xiaohongshu: "XIAOHONGSHU_URL"
```

不要编造项目、经历、奖项、统计数据、联系方式或电话号码。

## 12. 可直接复制到新对话

```text
请先完整阅读项目根目录 HANDOFF.md，然后根据用户在新对话中的最新要求继续网站工作。

Experience 的“拆分前景柱子 + 雕像从柱后向右上移动”以及“同一固定舞台内镜头推进 + 室外原位交叉淡化 + 数据依次浮现”均已完成并通过生产构建。不要恢复旧的室内上推/室外从底部进入方案；新增素材是 public/media/experience/experience-column-foreground.webp 和 experience-outdoor-landscape.webp，动画仍使用单张 experience-statue-v2.webp。

不要恢复已删除的 Real World 和艺术插页 III–VI，不要恢复 Lenis、WebGL 或实时大图滤镜；turn/ 下三个转身姿态目前未被引用，不要擅自重新接回。每次实质修改后运行生产构建，不要部署、提交或推送。
```
