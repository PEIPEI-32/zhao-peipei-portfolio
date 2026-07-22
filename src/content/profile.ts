export type Language = "zh" | "en";

export const contactPlaceholders = {
  email: "EMAIL_ADDRESS",
  douyin: "DOUYIN_URL",
  xiaohongshu: "XIAOHONGSHU_URL",
} as const;

export const profile = {
  zh: {
    nav: [
      ["about", "关于"],
      ["experience", "经历"],
      ["capabilities", "能力"],
      ["ai-lab", "AI 实践"],
      ["contact", "联系"],
    ],
    hero: {
      eyebrow: "AI TRAINING · VISUAL COMMUNICATION · 2026",
      name: "赵裴裴",
      latinName: "ZHAO PEIPEI",
      statement: "在理性与艺术之间，训练更好的 AI 体验。",
      tags: "AI 训练师方向 / 视觉传达设计 / AI 协作实践",
      explore: "向下探索",
    },
    about: {
      label: "01 / ABOUT",
      title: "理性与艺术之间",
      lines: ["理性，让我理解问题。", "艺术，让我看见可能。", "AI，让两者开始协作。"],
      intro:
        "我是一名视觉传达设计专业的 2026 届本科毕业生，正在探索视觉设计、内容运营与人工智能的交叉点。我相信，好的 AI 不仅需要正确回答问题，也需要理解真实的人、需求和使用场景。",
      traits: "专注、热情、善于沟通。拥有视觉设计背景，也愿意理解技术、研究需求并持续执行。",
      education: ["青岛恒星科技学院", "视觉传达设计", "本科", "2026 年 6 月毕业"],
    },
    experience: {
      label: "02 / EXPERIENCE",
      title: "把每一次反馈，\n变成下一次改进。",
      role: "抖音《第五人格》游戏主播",
      date: "2024.10.19 — 2025.02.02",
      metrics: [
        ["2,000+", "粉丝"],
        ["62,000", "单条最高播放"],
        ["2,900+", "单条最高点赞"],
        ["≈ 6h", "日直播时长"],
      ],
      process: ["录制", "剪辑", "发布", "账号运营", "直播", "反馈优化"],
      summary:
        "每天两场直播，13:00—16:00 与 17:00—20:00。独立完成素材录制、剪辑、发布、账号运营和直播，保持不间断日更，并根据内容表现与直播反馈持续优化。",
      media: ["直播现场占位", "内容剪辑占位", "账号数据占位", "发布画面占位"],
    },
    realWorld: {
      label: "03 / REAL-WORLD EXPERIENCE",
      title: "真实世界，是最直接的用户研究。",
      scenes: [
        ["外卖众包", "城市在移动，需求总是具体而即时。理解时间、路线，也理解等待中的情绪。"],
        ["密室逃脱 NPC", "在不同情境与角色中观察反应，保持沟通、判断和执行。"],
      ],
      note: "这些不是被过度包装的成果，而是我理解真实用户、服务场景与即时需求的日常切片。",
    },
    capabilities: {
      label: "04 / CAPABILITIES",
      title: "能力，需要真实证据。",
      items: [
        {
          kicker: "LEARN / BUILD",
          title: "AI 协作与学习",
          body: "使用 ChatGPT、Codex、豆包、千问和 DeepSeek。使用 Codex 整理文档与笔记，并尝试编写提高工作效率的浏览器插件。",
        },
        {
          kicker: "OPERATE / ITERATE",
          title: "内容运营",
          body: "独立完成录制、剪辑、发布、直播与账号运营，并根据数据和用户反馈持续调整内容。",
        },
        {
          kicker: "SEE / EXPRESS",
          title: "视觉表达",
          body: "视觉传达设计背景，使用 Photoshop、Illustrator、剪映与 DaVinci Resolve 进行视觉和视频表达。",
        },
        {
          kicker: "LISTEN / DELIVER",
          title: "执行与需求理解",
          body: "通过持续直播、日更内容和服务类兼职，形成稳定执行、沟通和观察用户需求的能力。",
        },
      ],
    },
    lab: {
      label: "05 / AI LAB",
      title: "和 AI 一起，\n把想法变成实践。",
      status: "细节整理中",
      items: [
        ["01", "文档与笔记整理", "使用 Codex 协助整理文档和个人知识笔记，提高信息归纳效率。", "BUILDING"],
        ["02", "效率浏览器插件", "使用 Codex 协作编写提高工作效率的浏览器插件。", "BUILDING"],
        ["03", "这个网站", "需求设计、视觉方向和提示词设计由赵裴裴完成，并与 Codex 协作开发。", "LIVE PRACTICE"],
        ["04", "AI 模型回答质量评测", "正在构建", "COMING SOON"],
        ["05", "提示词与工作流优化实验", "正在构建", "COMING SOON"],
      ],
    },
    tools: {
      label: "06 / TOOLS",
      title: "工具是坐标，不是头衔。",
      note: "持续使用、持续学习，不把“使用过”描述为“精通”。",
      groups: [
        ["AI", ["ChatGPT", "Codex", "豆包", "千问", "DeepSeek"]],
        ["效率", ["飞书", "Word", "Excel", "PowerPoint", "Obsidian", "Visual Studio Code"]],
        ["设计与视频", ["Photoshop", "Illustrator", "剪映", "DaVinci Resolve"]],
      ],
    },
    interludes: [
      ["理性伸出手，艺术给出回应。", "每一次理解，都从靠近真实的人开始。"],
      ["观察，不是静止的凝视。", "反馈让判断移动，也让下一次表达更准确。"],
      ["许多微小变化，组成一片浪。", "观察、沟通、执行，在真实世界里彼此推着向前。"],
      ["能力，不只写在纸上。", "它在每一次持续完成、调整与重新理解里留下痕迹。"],
      ["工具退后，人的判断向前。", "协作不是替代，而是让想法拥有更多到达现实的路径。"],
      ["下一次连接，从这里开始。", "带着问题、想法，或者一段还没有被说清楚的可能。"],
    ],
    contact: {
      label: "07 / CONTACT",
      title: "让下一段故事，\n从一次对话开始。",
      statement: "期待与你讨论 AI、内容、产品，以及人与技术之间更好的连接方式。",
      email: "邮箱",
      douyin: "抖音",
      xiaohongshu: "小红书",
      resume: "简历准备中",
      placeholder: "账号图片占位",
    },
    footer: "ZHAO PEIPEI · AI TRAINING DIRECTION · 2026",
  },
  en: {
    nav: [
      ["about", "About"],
      ["experience", "Experience"],
      ["capabilities", "Capabilities"],
      ["ai-lab", "AI Lab"],
      ["contact", "Contact"],
    ],
    hero: {
      eyebrow: "AI TRAINING · VISUAL COMMUNICATION · 2026",
      name: "赵裴裴",
      latinName: "ZHAO PEIPEI",
      statement: "Training better AI experiences between logic and art.",
      tags: "AI Training / Visual Communication / AI-assisted Creation",
      explore: "Scroll to explore",
    },
    about: {
      label: "01 / ABOUT",
      title: "Between logic and art",
      lines: ["Logic helps me understand problems.", "Art helps me see possibilities.", "AI brings the two into collaboration."],
      intro:
        "I am a Visual Communication undergraduate graduating in 2026, exploring the intersection of visual design, content operations, and AI. I believe good AI should not only answer correctly, but also understand real people, needs, and contexts of use.",
      traits: "Focused, enthusiastic, and communicative. I bring a visual design background and a willingness to understand technology, study needs, and follow through.",
      education: ["青岛恒星科技学院", "Official English name to be confirmed", "Visual Communication · Bachelor’s degree", "Graduating June 2026"],
    },
    experience: {
      label: "02 / EXPERIENCE",
      title: "Turn every signal\ninto the next improvement.",
      role: "Identity V livestream creator on Douyin",
      date: "OCT 19, 2024 — FEB 02, 2025",
      metrics: [
        ["2,000+", "followers"],
        ["62,000", "highest views on one video"],
        ["2,900+", "highest likes on one video"],
        ["≈ 6h", "daily livestream duration"],
      ],
      process: ["Record", "Edit", "Publish", "Operate", "Live", "Improve"],
      summary:
        "Two daily livestreams, 13:00–16:00 and 17:00–20:00. Independently handled recording, editing, publishing, account operation, and livestreaming; maintained daily updates and refined content through performance and audience feedback.",
      media: ["Livestream placeholder", "Editing placeholder", "Analytics placeholder", "Publishing placeholder"],
    },
    realWorld: {
      label: "03 / REAL-WORLD EXPERIENCE",
      title: "The real world is direct user research.",
      scenes: [
        ["Crowdsourced delivery", "Needs are concrete and immediate: time, routes, and the emotions behind waiting."],
        ["Escape room NPC", "Observing reactions across scenarios while staying communicative, adaptive, and reliable."],
      ],
      note: "Not over-packaged career achievements—simply everyday encounters that helped me understand users, service contexts, and immediate needs.",
    },
    capabilities: {
      label: "04 / CAPABILITIES",
      title: "Capability needs evidence.",
      items: [
        { kicker: "LEARN / BUILD", title: "AI collaboration & learning", body: "I use ChatGPT, Codex, Doubao, Qwen, and DeepSeek. With Codex, I organize documents and notes and explore browser plugins that can improve everyday efficiency." },
        { kicker: "OPERATE / ITERATE", title: "Content operations", body: "Independently recorded, edited, published, livestreamed, and operated an account, adapting content through data and audience feedback." },
        { kicker: "SEE / EXPRESS", title: "Visual communication", body: "A Visual Communication background, using Photoshop, Illustrator, CapCut, and DaVinci Resolve for visual and video work." },
        { kicker: "LISTEN / DELIVER", title: "Execution & needs understanding", body: "Consistent livestreaming, daily publishing, and service work built reliable execution, communication, and attention to user needs." },
      ],
    },
    lab: {
      label: "05 / AI LAB",
      title: "Turning ideas into practice,\nwith AI.",
      status: "Details in progress",
      items: [
        ["01", "Document & note organization", "Using Codex to organize documents and personal notes for clearer information synthesis.", "BUILDING"],
        ["02", "Efficiency browser plugin", "Collaborating with Codex on a browser plugin intended to improve work efficiency.", "BUILDING"],
        ["03", "This website", "Requirements, visual direction, and prompt design by Zhao Peipei; developed in collaboration with Codex.", "LIVE PRACTICE"],
        ["04", "AI response quality evaluation", "Coming soon", "COMING SOON"],
        ["05", "Prompt & workflow experiments", "Coming soon", "COMING SOON"],
      ],
    },
    tools: {
      label: "06 / TOOLS",
      title: "Tools are coordinates, not titles.",
      note: "Using and learning continuously—without describing familiarity as mastery.",
      groups: [
        ["AI", ["ChatGPT", "Codex", "Doubao", "Qwen", "DeepSeek"]],
        ["Productivity", ["Feishu", "Word", "Excel", "PowerPoint", "Obsidian", "Visual Studio Code"]],
        ["Design & video", ["Photoshop", "Illustrator", "CapCut", "DaVinci Resolve"]],
      ],
    },
    interludes: [
      ["Logic reaches. Art responds.", "Understanding begins by moving closer to real people."],
      ["Observation is never still.", "Feedback moves judgment and sharpens the next expression."],
      ["Small changes become a wave.", "Observation, communication, and action move one another forward."],
      ["Capability lives beyond paper.", "It leaves a trace in every delivery, adjustment, and renewed understanding."],
      ["Tools recede. Human judgment advances.", "Collaboration is not replacement—it gives ideas more paths into reality."],
      ["The next connection begins here.", "Bring a question, an idea, or a possibility not yet fully articulated."],
    ],
    contact: {
      label: "07 / CONTACT",
      title: "Let the next story\nbegin with a conversation.",
      statement: "Open to conversations about AI, content, products, and better connections between people and technology.",
      email: "Email",
      douyin: "Douyin",
      xiaohongshu: "Xiaohongshu",
      resume: "Resume coming soon",
      placeholder: "Account image placeholder",
    },
    footer: "ZHAO PEIPEI · AI TRAINING DIRECTION · 2026",
  },
} as const;
