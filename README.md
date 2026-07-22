# 赵裴裴 · 电影式个人网站

一个以“理性 × 艺术 × AI”为叙事主线的中英文个人网站。项目使用 Vite / vinext、
React、TypeScript、Tailwind CSS、GSAP ScrollTrigger 与 Lenis。第二版采用当代艺术
展览、纸本编辑、石膏雕塑与油画长卷的视觉语言，并移除了 WebGL 以改善滚动性能。

## 本地安装与启动

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

打开终端输出的本地地址（通常是 `http://localhost:3000`）。生产构建：

```bash
npm run build
```

## 替换照片、视频与社交图片

- 照片：`public/media/photos/`
- 视频：`public/media/videos/`
- 抖音与小红书账号图：`public/media/social/`
- 网站原创艺术素材：`public/media/art/`
- 推荐文件名和隐私检查清单见 `public/media/README.md`

当前 Experience 与 Contact 中使用的是 CSS 视觉占位。加入正式素材后，将对应的
占位 `div` 替换为有明确 `width`、`height`、`loading="lazy"` 的 `img`；视频需同时
提供 poster，并保持现有容器 class，以继承滚动轨迹。

## 填写联系方式

编辑 `src/content/profile.ts` 顶部的 `contactPlaceholders`：

- `email`：联系邮箱
- `douyin`：完整抖音主页 URL
- `xiaohongshu`：完整小红书主页 URL

不要在网站中填写电话号码，除非以后明确决定公开。

## 添加 PDF 简历

把确认可公开的 PDF 放入 `public/resume/`，推荐文件名 `zhao-peipei-resume.pdf`。
然后在 `src/components/Portfolio.tsx` 中把 Resume 占位区改为指向
`/resume/zhao-peipei-resume.pdf` 的链接，并同步更新中英文按钮文案。

## 修改内容或增加 AI 案例

- 所有中英文文案：`src/content/profile.ts`
- AI Lab 案例：分别向 `zh.lab.items` 与 `en.lab.items` 增加同序条目
- 保证中英文案例数量一致，不填写未经验证的成果、奖项或数据

## 动效架构

- `src/components/Portfolio.tsx` 统一管理 Lenis、ScrollTrigger、章节时间线和六个艺术插页。
- Hero 与 Experience 是两个 pinned 场景；Hero 使用分层古典风景、放大的石膏头像、金色轨道和三个石膏多面体。About 使用第二组分层古典风景、石膏头像、蝴蝶、放大镜与植物，所有关键动画与滚动进度绑定，可反向恢复。
- 石膏胸像、石膏手臂和油画均为本项目生成的原创素材，页面使用压缩 WebP 版本。
- CSS 处理撕纸、纸张方块波浪、排版、响应式和静态回退；`prefers-reduced-motion`
  会关闭 Lenis、pin、视差和持续运动，同时保留全部内容。
- 完整时间段、进退场顺序和移动端差异见 `MOTION_SPEC.md`。

## 上线前检查

1. 替换联系方式、社交图片与 URL。
2. 对照片和视频执行 `public/media/README.md` 的隐私检查。
3. 确认学校官方英文名后替换英文页面中的待确认说明。
4. 添加并检查 PDF 简历。
5. 在真机检查中英文、外链、低动态模式和移动端滚动。
