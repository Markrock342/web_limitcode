import type { Locale } from "@/lib/i18n/config";
import {
  CP_AUDIENCE,
  CP_CONTACT_PAGE,
  CP_COVER,
  CP_PROCESS,
  CP_PROJECTS,
  CP_WHAT,
  CP_WHO,
  CP_WHY,
} from "@/lib/profile";

const en = {
  cover: {
    ...CP_COVER,
    positioning: "Independent Software Studio",
    taglineEn: "We turn business workflows into software.",
    headline: "We build web applications and back-office systems for SMEs and service businesses",
    subHeadline: "From booking and CRM to job management, dashboards, and AI automation",
    description:
      "We start from the workflow your business already runs — then design and build systems people can use and grow. We don’t lead with technology for its own sake.",
    statement: "From floor workflow → software the team opens every day",
  },
  who: {
    heading: "Who we are",
    en: "Who We Are",
    paragraphs: [
      "LIMIT CODE STUDIO (LCS) is an independent software team in Thailand focused on web applications, business systems, and back-office tools for SMEs and service businesses.",
      "We don’t start by selling technology. We start from real workflows and the problems teams hit day to day — then design something people will actually use.",
    ],
    marketingPhrase:
      "We don’t start with “what kind of website do you want?” We start with how your business works.",
  },
  what: {
    heading: "What we do",
    en: "What We Do",
    intro:
      "From a small business site to a full back office with database, roles, payments, dashboards, and external integrations.",
    items: [
      {
        title: "Custom Web Application",
        desc: "Real working systems — not brochure pages only",
      },
      {
        title: "Booking & Reservation",
        desc: "Queues, courts, rooms, services — with payment and admin",
      },
      {
        title: "CRM / ERP / Job & Ops",
        desc: "Customers, sales, job orders, inventory, and internal workflow",
      },
      {
        title: "AI & Business Automation",
        desc: "AI assistants and automation that cut repeat work",
      },
    ],
  },
  audience: {
    heading: "Who we work with",
    en: "Who We Work With",
    intro:
      "We work with SMEs, service businesses, sports venues, hotels, property, logistics, field service, and any team moving from LINE / Excel / paper into one system.",
    fitTitle: "A fit if you still:",
    fitList: [
      "Take jobs over LINE and things fall through",
      "Juggle Excel / Google Sheets per person",
      "Keep customer data in pieces",
      "Struggle to track job status",
      "Have no central dashboard",
      "Need more than off-the-shelf software covers",
    ],
    industries: CP_AUDIENCE.industries,
  },
  process: {
    heading: "How we work",
    en: "How We Work",
    intro: "Lock scope before we start · demos along the way · real users test before go-live",
    steps: [
      { no: "01", title: "Requirement & Workflow", desc: "Business, users, and floor pain" },
      { no: "02", title: "Scope & Architecture", desc: "Modules, permissions, data, integrations" },
      { no: "03", title: "UX/UI Design", desc: "Screens everyone can agree on" },
      { no: "04", title: "Development", desc: "Frontend, backend, and database" },
      { no: "05", title: "Demo & UAT", desc: "Round demos, tested with real users" },
      { no: "06", title: "Deploy & Handover", desc: "Go live, hand over, train" },
      { no: "07", title: "Support", desc: "Care and extend when you’re ready" },
    ],
  },
  projects: CP_PROJECTS.map((p) => {
    const desc: Record<string, string> = {
      Sirikanchana:
        "Online badminton court booking — multi-court slots, PromptPay, slip review, admin assignment, LINE",
      NurseGo: "A platform for nursing and healthcare staff work",
      KindGo: "A daily-life services platform matching customers with providers across categories",
      Horasard: "AI astrology from a birth chart, topic chat, Free / Pro plans",
      "Marketimes Asia": "Online media and content site for Marketimes Asia",
      สมบัติทัวร์: "A transport-sector project for Sombat Tour",
      "Interactive Demo Systems":
        "Clickable prototypes before a real build — not claimed as client production work",
    };
    const note: Record<string, string> = {
      สมบัติทัวร์: "System detail can be shared as appropriate",
    };
    const label = p.kind === "production" ? "Production" : "Demo";
    return {
      ...p,
      label,
      desc: desc[p.name] ?? p.desc,
      note: p.note ? note[p.name] ?? p.note : p.note,
    };
  }),
  why: {
    heading: "Why LCS",
    en: "Why LCS",
    cards: [
      { title: "Workflow First", desc: "Understand the process before we write code" },
      { title: "Scope Transparency", desc: "Agree scope before start — no silent scope creep" },
      { title: "Visible Progress", desc: "You see progress and demos along the way" },
      { title: "Built to Extend", desc: "Start with what matters, then grow" },
      { title: "Handover & Support", desc: "Hand over cleanly and support after deploy" },
    ],
    quote:
      "A good system isn’t the one with the most features. It’s the one that cuts repeat work, cuts mistakes, and makes the team’s day easier.",
  },
  contactPage: {
    heading: "Start a project",
    en: "Start a Project",
    text: "Send the current workflow, where the team gets stuck, or a sample of what you want. We’ll sketch scope and a first path — no charge for the first consult.",
    cta: "Message LINE OA or email us",
  },
};

const zh = {
  cover: {
    ...CP_COVER,
    positioning: "Independent Software Studio",
    taglineEn: "We turn business workflows into software.",
    headline: "我们为中小企业和服务型生意做 Web 应用和后台系统",
    subHeadline: "从预约、CRM、工单、Dashboard，到 AI 自动化",
    description:
      "我们先弄清生意真正怎么转，再设计和开发能用、能接着做的系统——不是先卖技术名词。",
    statement: "从现场流程 → 团队每天打开的系统",
  },
  who: {
    heading: "我们是谁",
    en: "Who We Are",
    paragraphs: [
      "LIMIT CODE STUDIO (LCS) 是泰国的一支独立软件团队，专注 Web 应用、业务系统和后台，服务中小企业与服务型生意。",
      "我们不先卖技术。我们从真实工作流和团队每天卡住的地方开始，再做成能真正拿来用的系统。",
    ],
    marketingPhrase: "我们不问「想要什么样的网站」，先问你的生意现在怎么转。",
  },
  what: {
    heading: "我们做什么",
    en: "What We Do",
    intro: "从小企业网站，到带数据库、权限、支付、Dashboard 和对接外部服务的完整后台。",
    items: [
      { title: "Custom Web Application", desc: "能干活的系统，不只是宣传页" },
      { title: "Booking & Reservation", desc: "号、场地、房间、服务——含支付和后台" },
      { title: "CRM / ERP / Job & Ops", desc: "客户、销售、工单、库存和内部流程" },
      { title: "AI & Business Automation", desc: "AI 助手和自动化，少做重复活" },
    ],
  },
  audience: {
    heading: "我们给谁做",
    en: "Who We Work With",
    intro:
      "我们服务中小企业、服务型生意、体育场馆、酒店、地产、物流、现场服务，以及想把 LINE / Excel / 纸质活收成一套系统的团队。",
    fitTitle: "适合还在这样干的生意：",
    fitList: [
      "靠 LINE 接活还漏单",
      "每人一份 Excel / 表格",
      "客户资料散着",
      "工单状态跟不住",
      "没有中间那块 Dashboard",
      "现成软件盖不住",
    ],
    industries: CP_AUDIENCE.industries,
  },
  process: {
    heading: "我们怎么干活",
    en: "How We Work",
    intro: "开工前锁范围 · 中途有 Demo · 真人测过再上线",
    steps: [
      { no: "01", title: "Requirement & Workflow", desc: "生意、使用的人、现场痛点" },
      { no: "02", title: "Scope & Architecture", desc: "模块、权限、数据、对接" },
      { no: "03", title: "UX/UI Design", desc: "先画出大家认的同一张图" },
      { no: "04", title: "Development", desc: "前端、后端、数据库" },
      { no: "05", title: "Demo & UAT", desc: "按轮交 Demo，跟真人测" },
      { no: "06", title: "Deploy & Handover", desc: "上线、交接、培训" },
      { no: "07", title: "Support", desc: "接着养，准备好再扩展" },
    ],
  },
  projects: CP_PROJECTS.map((p) => {
    const desc: Record<string, string> = {
      Sirikanchana: "羽毛球馆线上订场：多片场、PromptPay、审单、后台排场、LINE",
      NurseGo: "护理和医疗人员接活的平台",
      KindGo: "日常生活服务平台，把客人和多品类服务方接上",
      Horasard: "按生日算盘的 AI 占星，按主题聊，带 Free / Pro",
      "Marketimes Asia": "Marketimes Asia 的线上媒体站",
      สมบัติทัวร์: "给 สมบัติทัวร์ 做的运输方向项目",
      "Interactive Demo Systems": "能点的原型，开工前先看怎么转——不当成客户上线项目来宣称",
    };
    const note: Record<string, string> = {
      สมบัติทัวร์: "系统细节可按情况再讲",
    };
    const label = p.kind === "production" ? "已上线" : "演示";
    return {
      ...p,
      label,
      desc: desc[p.name] ?? p.desc,
      note: p.note ? note[p.name] ?? p.note : p.note,
    };
  }),
  why: {
    heading: "为什么选 LCS",
    en: "Why LCS",
    cards: [
      { title: "Workflow First", desc: "先懂流程，再写代码" },
      { title: "Scope Transparency", desc: "开工前谈清范围——不偷偷加活加价" },
      { title: "Visible Progress", desc: "中途看得到进度和 Demo" },
      { title: "Built to Extend", desc: "先做必要的，再扩展" },
      { title: "Handover & Support", desc: "交得清，上线后还能接着看" },
    ],
    quote: "好系统不是功能最多的那个，是少做重复活、少出错、让团队日子好过一点的那个。",
  },
  contactPage: {
    heading: "开始谈系统",
    en: "Start a Project",
    text: "把现在的流程、团队卡住的地方、或想要的样子发来。我们先帮你看范围和一条路——初次咨询不收费。",
    cta: "用 LINE OA 或发邮件即可",
  },
};

export function getProfileCopy(locale: Locale) {
  if (locale === "en") return en;
  if (locale === "zh") return zh;
  return {
    cover: CP_COVER,
    who: CP_WHO,
    what: CP_WHAT,
    audience: CP_AUDIENCE,
    process: CP_PROCESS,
    projects: CP_PROJECTS,
    why: CP_WHY,
    contactPage: CP_CONTACT_PAGE,
  };
}
