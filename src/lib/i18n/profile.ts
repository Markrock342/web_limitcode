import type { Locale } from "@/lib/i18n/config";
import {
  CP_ABOUT,
  CP_CONTACT_PAGE,
  CP_COVER,
  CP_ENGAGEMENT,
  CP_INDUSTRIES,
  CP_PROBLEMS,
  CP_PROCESS,
  CP_PROJECTS,
  CP_SERVICES,
  CP_TECH,
  CP_WHY,
} from "@/lib/profile";

const en = {
  cover: {
    ...CP_COVER,
    headline: "Systems for businesses and organisations",
    subHeadline: "Scattered work, turned into a system the team can actually run",
    statement: "From requirement and workflow to a system in production",
    description:
      "LIMIT CODE STUDIO maps the workflow, designs, and builds — web apps, mobile, CRM, job order, booking, admin dashboards, AI, and internal tools.",
  },
  about: {
    heading: "We don’t just take websites",
    paragraphs: [
      "LIMIT CODE STUDIO is a software studio that builds systems for businesses.",
      "We start from how the work runs today, where the team gets stuck, and what the business wants — then design something people will actually use.",
    ],
    marketingPhrase:
      "We don’t start with “what kind of website do you want?” We start with how your business works.",
    fitTitle: "A fit if you still:",
    fitList: [
      "Take jobs over LINE",
      "Juggle several Excel or Google Sheets files",
      "Keep customer data in pieces",
      "Struggle to track job status",
      "Have no central dashboard",
      "Need something off-the-shelf software can’t cover",
    ],
    highlights: [
      { no: "01", title: "Understand the business before we write the system" },
      { no: "02", title: "Lock scope before we start" },
      { no: "03", title: "Demo and test in rounds" },
      { no: "04", title: "Grow it and stay on after handover" },
    ],
  },
  services: CP_SERVICES.map((s, i) => {
    const desc = [
      "A web system when the workflow is more than a brochure site",
      "For customers, staff, providers, or field crews",
      "Leads, follow-up, sales, and contact history",
      "Track the job from order in to close-out",
      "Queues, rooms, courts, services, or other resources",
      "A back office for owners and the team",
      "Turn Excel / Sheets / manual work into a system",
      "AI assistant, workflow, prompt / persona, CMS, credit / quota",
      "LINE OA, payment, maps, external APIs",
      "Care, monitoring, and further build",
    ];
    return { ...s, desc: desc[i] ?? s.desc };
  }),
  problems: {
    heading: "From the mess on the floor to a system you can run",
    before: CP_PROBLEMS.before.map((b, i) =>
      ["LINE", "Excel", "Google Sheets", "Paper", "Manual follow-up", "Data split across places"][i] ?? b,
    ),
    after: CP_PROBLEMS.after,
    examples: [
      { problem: "LINE messages fall through the cracks", solution: "CRM + Follow-up" },
      { problem: "Each person has their own Excel file", solution: "Centralized System" },
      { problem: "The owner never knows where a job stands", solution: "Realtime Dashboard" },
      { problem: "Customers keep asking for status", solution: "Tracking Portal" },
      { problem: "Month-end reports are still done by hand", solution: "Automated Reporting" },
    ],
  },
  process: {
    heading: "From the business brief to a system in use",
    steps: [
      { no: "01", title: "Requirement & Workflow", desc: "The business, the users, and the pain" },
      { no: "02", title: "Scope & Architecture", desc: "Modules, permission, data flow, integration" },
      { no: "03", title: "UX/UI Design", desc: "Screens everyone can agree on" },
      { no: "04", title: "Development", desc: "Frontend, backend, and database" },
      { no: "05", title: "Demo & UAT", desc: "Demos in rounds, tested with real users" },
      { no: "06", title: "Deploy & Handover", desc: "Go live, hand over, train" },
      { no: "07", title: "Maintenance", desc: "Keep it running and keep building" },
    ],
  },
  projects: CP_PROJECTS.map((p) => {
    const desc: Record<string, string> = {
      KindGo: "A daily-life services platform matching customers with providers across categories",
      NurseGo: "A platform for nursing and healthcare staff work",
      Horasard: "AI astrology from a birth chart, then chat by topic, with Free / Pro plans",
      "Marketimes Asia": "Online media and content site for Marketimes Asia",
      สมบัติทัวร์: "A transport-sector project for Sombat Tour",
      "LIMIT CODE DEMO SYSTEMS":
        "Interactive sample systems so you can see the work before a project starts",
    };
    const note: Record<string, string> = {
      สมบัติทัวร์: "More detail on the system can be shared as appropriate",
    };
    return { ...p, desc: desc[p.name] ?? p.desc, note: p.note ? note[p.name] ?? p.note : p.note };
  }),
  industries: {
    heading: "A system shaped to the business — not the other way round",
    note: "If the workflow is specific, we design to how the organisation actually works.",
    items: CP_INDUSTRIES.items,
  },
  engagement: {
    heading: "How we take the work",
    models: [
      { title: "MVP", desc: "Start with the module that matters, so you can try it soon" },
      { title: "Custom System", desc: "Designed around the business workflow" },
      { title: "Phased Development", desc: "Build in phases to hold budget and risk" },
      { title: "Maintenance", desc: "Care and further build, month by month" },
    ],
  },
  tech: CP_TECH,
  why: {
    heading: "Why businesses build with us",
    quote:
      "A good system isn’t the one with the most features. It’s the one that cuts repeat work, cuts mistakes, and makes the team’s day easier.",
    cards: [
      "Map the workflow before we build",
      "Scope and price in steps",
      "Demos you can check along the way",
      "Roles / permissions",
      "APIs and the systems you already have",
      "Maintenance after go-live",
    ],
  },
  contactPage: {
    heading: "Got a system you want made real?",
    text: "Send the current workflow, where the team gets stuck, or a sample of what you want. We’ll sketch scope and a first path.",
  },
};

const zh = {
  cover: {
    ...CP_COVER,
    headline: "给企业和机构做系统",
    subHeadline: "把散落的活，收成团队真能跑起来的系统",
    statement: "从需求和工作流，做到真正上线",
    description:
      "LIMIT CODE STUDIO 帮你理清工作流、设计和开发——Web、移动端、CRM、工单、预约、后台、AI，以及内部系统。",
  },
  about: {
    heading: "我们接的不只是网站",
    paragraphs: [
      "LIMIT CODE STUDIO 是做业务系统的软件工作室。",
      "先搞清现在怎么干活、团队卡在哪、生意要什么，再做成能真正拿来用的系统。",
    ],
    marketingPhrase: "我们不问「想要什么样的网站」，先问你的生意现在怎么转。",
    fitTitle: "适合还在这样干的生意：",
    fitList: [
      "接活还靠 LINE",
      "Excel 或 Google 表格好几份",
      "客户资料散着",
      "工单状态跟不住",
      "没有中间那块 Dashboard",
      "现成软件盖不住，需要按自己来",
    ],
    highlights: [
      { no: "01", title: "先懂生意，再写系统" },
      { no: "02", title: "开工前把范围锁住" },
      { no: "03", title: "Demo 和测试按轮来" },
      { no: "04", title: "交付后还能接着做、接着看" },
    ],
  },
  services: CP_SERVICES.map((s, i) => {
    const desc = [
      "流程比宣传网站复杂时，做能干活的 Web 系统",
      "给客人、员工、服务方或现场团队用",
      "线索、跟进、销售和联系记录",
      "从接单跟到收工",
      "号、房间、场地、服务或其他资源",
      "给老板和团队的后台",
      "把 Excel / 表格 / 手工活收成系统",
      "AI 助手、流程、提示词 / 人设、CMS、点数 / 配额",
      "LINE OA、支付、地图、外部接口",
      "维护、监控、继续做",
    ];
    return { ...s, desc: desc[i] ?? s.desc };
  }),
  problems: {
    heading: "从现场的乱，收到管得住的系统",
    before: ["LINE", "Excel", "Google Sheets", "纸", "手工跟进", "数据拆在好几个地方"],
    after: CP_PROBLEMS.after,
    examples: [
      { problem: "LINE 消息漏掉", solution: "CRM + Follow-up" },
      { problem: "每人一份 Excel", solution: "Centralized System" },
      { problem: "老板不知道活干到哪", solution: "Realtime Dashboard" },
      { problem: "客人反复问进度", solution: "Tracking Portal" },
      { problem: "月底报表还靠手做", solution: "Automated Reporting" },
    ],
  },
  process: {
    heading: "从生意题目，做到能用的系统",
    steps: [
      { no: "01", title: "Requirement & Workflow", desc: "生意、使用的人、卡住的地方" },
      { no: "02", title: "Scope & Architecture", desc: "模块、权限、数据流、对接" },
      { no: "03", title: "UX/UI Design", desc: "先画出大家认的同一张图" },
      { no: "04", title: "Development", desc: "前端、后端、数据库" },
      { no: "05", title: "Demo & UAT", desc: "按轮交 Demo，跟真人测" },
      { no: "06", title: "Deploy & Handover", desc: "上线、交接、培训" },
      { no: "07", title: "Maintenance", desc: "接着养，接着做" },
    ],
  },
  projects: CP_PROJECTS.map((p) => {
    const desc: Record<string, string> = {
      KindGo: "日常生活服务平台，把客人和多品类服务方接上",
      NurseGo: "护理和医疗人员接活的平台",
      Horasard: "按生日算盘的 AI 占星，按主题聊，带 Free / Pro 套餐",
      "Marketimes Asia": "Marketimes Asia 的线上媒体和内容站",
      สมบัติทัวร์: "给 สมบัติทัวร์ 做的运输方向项目",
      "LIMIT CODE DEMO SYSTEMS": "能点进去的系统例子，开工前就能看见怎么转",
    };
    const note: Record<string, string> = {
      สมบัติทัวร์: "系统细节可按情况再讲",
    };
    return { ...p, desc: desc[p.name] ?? p.desc, note: p.note ? note[p.name] ?? p.note : p.note };
  }),
  industries: {
    heading: "系统迁就生意，不是逼生意迁就系统",
    note: "流程要是很特别，就按机构真正怎么干来设计。",
    items: CP_INDUSTRIES.items,
  },
  engagement: {
    heading: "怎么接",
    models: [
      { title: "MVP", desc: "先做关键模块，尽快拿去试" },
      { title: "Custom System", desc: "按生意流程定做" },
      { title: "Phased Development", desc: "分阶段做，把预算和风险按住" },
      { title: "Maintenance", desc: "按月维护和继续做" },
    ],
  },
  tech: CP_TECH,
  why: {
    heading: "为什么生意会找我们做系统",
    quote: "好系统不是功能最多的那个，是少做重复活、少出错、让团队日子好过一点的那个。",
    cards: [
      "先理工作流再开发",
      "范围和价格按步骤来",
      "中途有 Demo 可查",
      "支持角色 / 权限",
      "能接 API 和现有系统",
      "上线后还有维护",
    ],
  },
  contactPage: {
    heading: "有想做成真的系统题目？",
    text: "把现在的流程、团队卡住的地方、或想要的样子发来。我们先帮你看范围和一条路。",
  },
};

export function getProfileCopy(locale: Locale) {
  if (locale === "en") return en;
  if (locale === "zh") return zh;
  return {
    cover: CP_COVER,
    about: CP_ABOUT,
    services: CP_SERVICES,
    problems: CP_PROBLEMS,
    process: CP_PROCESS,
    projects: CP_PROJECTS,
    industries: CP_INDUSTRIES,
    engagement: CP_ENGAGEMENT,
    tech: CP_TECH,
    why: CP_WHY,
    contactPage: CP_CONTACT_PAGE,
  };
}
