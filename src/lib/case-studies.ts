import type { Locale } from "./i18n/config";

export const CASE_STUDIES_PATH = "/case-studies";
export const CASE_STUDY_DATE = "2026-11-03";
// A light registry for homepage links; keep full article copy out of that bundle.
export const CASE_STUDY_SLUGS = ["sirikanchana", "nursego", "kindgo", "horasard"] as const;

type CaseCopy = {
  title: string;
  intro: string;
  need: string;
  solution: string[];
  flow: string[];
  outcome: string;
  erp: string;
  caption: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  url: string;
  image: string;
  copy: Record<Locale, CaseCopy>;
};

// Existing portfolio projects. Describe public product capabilities only;
// customer records, private admin screens and unverified performance claims stay out.
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "sirikanchana", name: "Sirikanchana", url: "https://sirikanchana.com/", image: "/showcase/sirikanchana.jpg",
    copy: {
      th: {
        title: "ศิริกาญจนา: ระบบจองสนามแบดมินตัน 25 คอร์ท",
        intro: "พัฒนาระบบจองออนไลน์ให้ลูกค้าเลือกวัน ช่วงเวลา และจำนวนคอร์ท ก่อนสนามจัดเลขคอร์ทให้ตามขั้นตอนของธุรกิจ",
        need: "ระบบต้องแยกเวลาที่ลูกค้าต้องการเล่นออกจากเลขคอร์ทที่สนามเป็นผู้จัด และรองรับการเลือกหลายช่วงเวลาในรายการเดียว",
        solution: ["ปฏิทินเลือกวันและช่วงเวลา พร้อมจำนวนคอร์ท", "รายการจองหลายช่วง หลายคอร์ท และการชำระ PromptPay", "บัญชีสมาชิกและช่องทางเข้าสู่ระบบด้วย LINE"],
        flow: ["เลือกวันและเวลา", "ระบุจำนวนคอร์ทและยืนยันจอง", "สนามจัดเลขคอร์ทก่อนเข้าเล่น"],
        outcome: "หน้าเว็บจองเปิดออนไลน์ให้ตรวจดูปฏิทิน เงื่อนไข และขั้นตอนก่อนเข้าสู่บัญชีสมาชิกได้",
        erp: "งานนี้แสดงวิธีแปลงกติกาการจัดทรัพยากรเป็นขั้นตอนในระบบ แนวคิดเดียวกันใช้วางการจองสินค้า กำลังคน หรือเครื่องจักรใน ERP ได้ โดยต้องออกแบบเงื่อนไขของแต่ละธุรกิจใหม่",
        caption: "ภาพหน้าเว็บจองที่ใช้แสดงในผลงานของเรา วันในภาพเป็นวันขณะบันทึกภาพ ไม่ใช่สถานะคอร์ทปัจจุบัน",
      },
      en: {
        title: "Sirikanchana: booking for a 25-court badminton venue",
        intro: "Online time-slot booking, with court numbers assigned by the venue.",
        need: "Separate customers’ requested playing times from the venue’s court allocation, including multiple slots per booking.",
        solution: ["Date, time-slot and court-count selection", "Multi-slot bookings and PromptPay payment", "Member accounts and LINE sign-in"],
        flow: ["Choose date and time", "Confirm court count and booking", "Venue allocates court numbers"],
        outcome: "The public booking page presents its calendar, rules and member access.",
        erp: "Resource allocation is also relevant to ERP stock, staffing and machine scheduling. Each business still needs its own rules.",
        caption: "Existing portfolio capture. Its date and availability are historical, not current court availability.",
      },
      zh: {
        title: "Sirikanchana：25 片羽毛球场的预约系统",
        intro: "用户在线选择时段，场馆按运营规则分配场地编号。",
        need: "将用户预约时间与场馆分配场地分开处理，并支持一次选择多个时段。",
        solution: ["选择日期、时段和场地数量", "多时段预约与 PromptPay 支付", "会员账户和 LINE 登录"],
        flow: ["选择日期和时段", "确认数量与预约", "场馆分配场地编号"],
        outcome: "公开预约页面可查看日历、规则和会员入口。",
        erp: "资源分配的思路也适用于 ERP 库存、人员和设备排程，具体规则仍需按业务设计。",
        caption: "现有作品截图。图片中的日期和余量并非当前场地状态。",
      },
    },
  },
  {
    slug: "nursego", name: "NurseGo", url: "https://www.nursego.co/", image: "/showcase/nursego.jpg",
    copy: {
      th: {
        title: "NurseGo: แพลตฟอร์มหางานพยาบาลและงานดูแล",
        intro: "เว็บไซต์และแอปเชื่อมผู้หางานพยาบาล ครอบครัว และองค์กรที่ต้องการบุคลากร พร้อมเส้นทางใช้งานสำหรับแต่ละกลุ่ม",
        need: "ผู้สมัครงาน ครอบครัว และองค์กรต้องเริ่มจากคนละความต้องการ จึงต้องจัดข้อมูลและทางเข้าระบบให้เหมาะกับแต่ละฝั่ง",
        solution: ["หมวดงานพยาบาล งานพาร์ทไทม์ และงานดูแล", "หน้าสำหรับครอบครัวและองค์กร", "หน้าแนะนำแอป พร้อมลิงก์ App Store และ Google Play"],
        flow: ["เลือกประเภทผู้ใช้งาน", "ดูบริการและรายละเอียดงาน", "ไปยังแอปเพื่อใช้งานต่อ"],
        outcome: "เว็บไซต์เผยแพร่เส้นทางสำหรับผู้ใช้แต่ละกลุ่มและช่องทางดาวน์โหลดแอปให้ตรวจดูได้โดยไม่ต้องเข้าถึงข้อมูลผู้สมัครหรือผู้ป่วย",
        erp: "การแยกผู้ใช้งานหลายฝ่ายเป็นพื้นฐานที่นำไปใช้วาง ERP ได้ เช่น ฝ่ายขาย จัดซื้อ และคลังสินค้า โดยต้องกำหนดสิทธิ์และข้อมูลที่แต่ละฝ่ายใช้ร่วมกันอย่างชัดเจน",
        caption: "ภาพหน้าแนะนำบริการและแอปที่เผยแพร่ในผลงาน ไม่ใช่หน้าระเบียนผู้ป่วยหรือข้อมูลสมาชิกจริง",
      },
      en: {
        title: "NurseGo: nursing jobs and care platform",
        intro: "A website and app connecting nursing job seekers, families and organisations.",
        need: "Give each audience a clear starting point for its different needs.",
        solution: ["Nursing, part-time and care categories", "Family and organisation entry points", "App introduction with App Store and Google Play links"],
        flow: ["Choose audience", "Review services and job information", "Continue in the app"],
        outcome: "Public pages show user journeys and app download links without exposing member or patient records.",
        erp: "The same audience separation informs ERP role design for sales, purchasing and warehouse teams.",
        caption: "Public service and app presentation from our portfolio, not private health or member records.",
      },
      zh: {
        title: "NurseGo：护理招聘与照护平台",
        intro: "连接护理求职者、家庭和机构的网站与应用。",
        need: "为需求不同的用户提供清晰的独立入口。",
        solution: ["护理、兼职及照护服务分类", "家庭与机构专属入口", "应用介绍与 App Store、Google Play 链接"],
        flow: ["选择用户类型", "查看服务与工作信息", "进入应用继续使用"],
        outcome: "公开页面展示用户路径与下载入口，不涉及会员或患者记录。",
        erp: "这种用户分工思路可用于 ERP 的销售、采购和仓库角色设计。",
        caption: "作品集中公开的服务及应用介绍，不是健康或会员隐私记录。",
      },
    },
  },
  {
    slug: "kindgo", name: "KindGo", url: "https://kindgo.app/", image: "/showcase/kindgo.jpg",
    copy: {
      th: {
        title: "KindGo: เว็บรวมบริการและเส้นทางจองตามพื้นที่",
        intro: "จัดหมวดบริการในชีวิตประจำวันให้เลือกตามพื้นที่ ประเภทงาน และวันเวลา พร้อมทางเข้าสำหรับผู้ให้บริการ",
        need: "บริการต่างชนิดต้องมีข้อมูลให้ลูกค้าเลือกและเส้นทางเริ่มจองที่สอดคล้องกัน โดยผู้ให้บริการมีทางเข้าของตัวเอง",
        solution: ["หมวดบริการบ้าน ซ่อม ทำความสะอาด และเดินทาง", "แบบฟอร์มเริ่มต้นจากพื้นที่ บริการ และวันเวลา", "หน้าตรวจพื้นที่บริการและสมัครเป็นผู้ให้บริการ"],
        flow: ["ระบุพื้นที่", "เลือกบริการและวันเวลา", "เข้าสู่ขั้นตอนจอง"],
        outcome: "เว็บไซต์บริการเปิดออนไลน์แล้ว ส่วนหน้าแอปมือถือยังระบุ Coming soon จึงแสดงกรณีศึกษานี้ในขอบเขตเว็บและเส้นทางเริ่มจอง",
        erp: "การจัดประเภทงาน พื้นที่ และเวลาเป็นข้อมูลที่ใช้ต่อยอดระบบรับงานและจัดทีมได้ แต่การเชื่อม ERP ต้องตกลงสถานะงานและข้อมูลที่จะส่งต่อให้ครบก่อน",
        caption: "ภาพหน้าเว็บรวมบริการจากผลงานเดิม ไม่ใช่หลักฐานว่าแอปมือถือหรือการจองทุกขั้นเปิดใช้งานแล้ว",
      },
      en: {
        title: "KindGo: service discovery and location-based booking entry",
        intro: "A service website organised around location, service type and date.",
        need: "Provide a consistent starting point across service categories, with a separate provider entry.",
        solution: ["Home, repair, cleaning and transport categories", "Location, service and date selection", "Coverage and provider registration pages"],
        flow: ["Specify location", "Choose service and time", "Enter booking"],
        outcome: "The website is public. The mobile app is marked Coming soon; this case covers the web entry journey.",
        erp: "Service, area and time form useful inputs for job dispatch and future ERP integration.",
        caption: "Existing website capture, not evidence that the mobile app or every booking step has launched.",
      },
      zh: {
        title: "KindGo：服务发现与按地区预约入口",
        intro: "围绕地区、服务类型和日期组织的服务网站。",
        need: "不同服务采用一致的起点，并为服务商提供独立入口。",
        solution: ["家居、维修、清洁和出行分类", "地区、服务及日期选择", "覆盖区域与服务商注册页面"],
        flow: ["填写地区", "选择服务和时间", "进入预约流程"],
        outcome: "网站已公开，移动应用仍标为 Coming soon；本案例仅介绍网页入口。",
        erp: "服务、区域和时间可作为派单及未来 ERP 集成的数据基础。",
        caption: "现有网站截图，并非移动应用或全部预约流程已上线的证明。",
      },
    },
  },
  {
    slug: "horasard", name: "Horasard", url: "https://horasard.com/", image: "/showcase/horasard.jpg",
    copy: {
      th: {
        title: "Horasard: เว็บโหราศาสตร์พร้อมสมาชิกและ AI Chat",
        intro: "เชื่อมข้อมูลสำหรับคำนวณพื้นดวงกับการสนทนา AI และแพ็กเกจจำนวนคำถามในบัญชีสมาชิก",
        need: "บริการต้องมีขั้นตอนสมัคร กรอกข้อมูลเริ่มต้น และเลือกสิทธิ์ใช้งาน ก่อนเข้าสู่การสนทนาตามบัญชีของผู้ใช้",
        solution: ["สมัครและเข้าสู่บัญชีสมาชิก", "ข้อมูลวัน เวลา และสถานที่เกิดสำหรับผูกดวง", "แพ็กเกจคำถามและขั้นตอนแจ้งชำระเงิน"],
        flow: ["สมัครสมาชิก", "กรอกข้อมูลสำหรับผูกดวง", "เริ่มสนทนาและเลือกแพ็กเกจ"],
        outcome: "เว็บไซต์เปิดเผยวิธีใช้งานและเงื่อนไขแพ็กเกจ พร้อมเครดิต Design by Limitcode ที่ส่วนท้ายหน้าเว็บ",
        erp: "การนำข้อมูลที่จัดรูปแบบแล้วมาใช้ร่วมกับ AI เป็นแนวคิดที่ประยุกต์กับงานธุรกิจได้ โดยระบบ ERP ต้องกำหนดสิทธิ์ แหล่งข้อมูล และวิธีตรวจคำตอบให้เหมาะกับงาน",
        caption: "ภาพหน้าแนะนำบริการสาธารณะ ไม่แสดงข้อมูลวันเกิดหรือบทสนทนาของสมาชิก",
      },
      en: {
        title: "Horasard: membership and AI chat for astrology",
        intro: "A member journey connecting birth-chart inputs, AI conversation and question packages.",
        need: "Organise registration, initial data and usage access before the conversation.",
        solution: ["Member registration and sign-in", "Birth date, time and location inputs", "Question packages and payment notification"],
        flow: ["Register", "Provide chart inputs", "Chat and choose a package"],
        outcome: "The public site explains its workflow and packages, with a Design by Limitcode footer credit.",
        erp: "Structured inputs can support business AI, with appropriate permissions, sources and answer checks for ERP.",
        caption: "Public introduction only; no member birth data or private conversations are shown.",
      },
      zh: {
        title: "Horasard：会员与 AI 对话占星网站",
        intro: "将星盘输入、AI 对话和提问套餐连接到会员流程。",
        need: "先组织注册、初始信息与使用权限，再进入对话。",
        solution: ["会员注册和登录", "出生日期、时间和地点输入", "提问套餐与付款通知"],
        flow: ["注册", "填写星盘信息", "开始对话与选择套餐"],
        outcome: "公开网站介绍使用步骤及套餐，页脚注明 Design by Limitcode。",
        erp: "结构化输入可支持企业 AI；ERP 仍需设计权限、数据来源与答案核查。",
        caption: "仅展示公开介绍，不展示会员出生资料或私人对话。",
      },
    },
  },
];

export function caseStudyPath(slug: string) { return `${CASE_STUDIES_PATH}/${slug}`; }
export function getCaseStudy(slug: string) { return CASE_STUDIES.find((item) => item.slug === slug); }

export const caseStudyLabels = {
  th: { tag: "กรณีศึกษาจากงานจริง", title: "ระบบที่เราพัฒนา และวิธีใช้งานในแต่ละธุรกิจ", intro: "ดูรายละเอียดผลงานที่เปิดออนไลน์ พร้อมภาพหน้าเว็บ ขอบเขตระบบ และลิงก์ไปยังเว็บไซต์จริง", home: "หน้าแรก", all: "กรณีศึกษาทั้งหมด", read: "อ่านกรณีศึกษา", live: "เปิดเว็บไซต์จริง", need: "สิ่งที่ระบบต้องรองรับ", solution: "ส่วนที่พัฒนา", flow: "เส้นทางใช้งาน", outcome: "สิ่งที่ตรวจดูได้", erp: "ต่อยอดกับระบบธุรกิจอย่างไร", consult: "ปรึกษาฟรีผ่าน LINE", service: "ดูบริการพัฒนาระบบ ERP", related: "ดูผลงานอื่น", evidence: "ขอบเขตของกรณีศึกษา", note: "เรียบเรียงจากผลงานเดิมและหน้าเว็บไซต์สาธารณะ ไม่เปิดเผยข้อมูลหลังบ้าน ตัวเลขรายได้ หรือข้อมูลส่วนบุคคล และยังไม่มีการสรุปผลเชิงตัวเลขก่อน–หลัง", reviewed: "ตรวจข้อมูลหน้าเว็บ", captionLink: "เปิดภาพเต็ม", cta: "อยากพัฒนาระบบสำหรับธุรกิจของคุณ?", ctaBody: "ส่งขั้นตอนงานและตัวอย่างเอกสารที่ปิดข้อมูลสำคัญแล้วมาให้ทีมช่วยประเมินได้", erpLead: "ผลงานจริงด้านระบบจอง แพลตฟอร์มบริการ และ AI", erpBody: "ดูวิธีที่เราจัดขั้นตอนและผู้ใช้งานในงานจริง ส่วนตัวอย่าง ERP นำเข้า–จัดจำหน่ายยังเป็นเดโมที่ใช้ข้อมูลจำลอง" },
  en: { tag: "Real project case studies", title: "Systems we built, and how each business uses them", intro: "Explore public projects, screenshots, system scope and links to the real websites.", home: "Home", all: "All case studies", read: "Read case study", live: "Open project website", need: "What the system needs to support", solution: "What we built", flow: "User journey", outcome: "What you can inspect", erp: "How this relates to business systems", consult: "Discuss your project on LINE", service: "ERP development service", related: "Explore other projects", evidence: "Case study scope", note: "Based on our existing portfolio and public pages. Private admin data, personal records and revenue figures are excluded. No measured before-and-after results are claimed.", reviewed: "Public pages reviewed", captionLink: "Open full image", cta: "Planning a system for your business?", ctaBody: "Share your workflow and redacted sample documents for an initial assessment.", erpLead: "Real booking, service platform and AI projects", erpBody: "See workflow and audience design in our projects. The import and distribution ERP example remains a demo with sample data." },
  zh: { tag: "真实项目案例", title: "我们开发的系统及其业务流程", intro: "了解公开项目、截图、系统范围和真实网站。", home: "首页", all: "全部案例", read: "阅读案例", live: "打开项目网站", need: "系统需要支持什么", solution: "开发内容", flow: "用户流程", outcome: "可公开查看的内容", erp: "与企业系统的关联", consult: "通过 LINE 咨询", service: "ERP 开发服务", related: "查看其他作品", evidence: "案例范围", note: "根据现有作品及公开页面整理，不涉及私有后台、个人记录或收入数据，也不声称有量化的前后效果。", reviewed: "公开页面核查日期", captionLink: "打开完整图片", cta: "计划为企业开发系统？", ctaBody: "提供工作流程及已隐去敏感信息的示例文件，即可进行初步评估。", erpLead: "真实预约、服务平台与 AI 项目", erpBody: "查看真实项目中的流程与用户设计。进出口分销 ERP 示例仍为使用模拟数据的演示。" },
} satisfies Record<Locale, Record<string, string>>;
