import { CONTACT, LINE_ID, LINE_URL } from "./site";

/**
 * ==============================================================
 * Company Profile (/company-profile) — เนื้อหาทั้งหมดแก้ที่ไฟล์นี้
 * ==============================================================
 */

export const CP_CONTACT = {
  person: CONTACT.person,
  personThai: CONTACT.personThai,
  phoneDisplay: CONTACT.phoneDisplay,
  phoneHref: CONTACT.phoneHref,
  email: CONTACT.email,
  salesEmail: CONTACT.salesEmail,
  lineId: LINE_ID,
  lineUrl: LINE_URL,
  websiteDisplay: "www.limitcode.shop",
  websiteHref: "https://www.limitcode.shop/",
  facebookHref: CONTACT.facebookHref,
  facebookLabel: CONTACT.facebookLabel,
  pageFacebookHref: CONTACT.pageFacebookHref,
  pageFacebookLabel: CONTACT.pageFacebookName,
};

export const CP_COVER = {
  name: "LIMIT CODE STUDIO",
  shortName: "LCS",
  docLabel: "Company Profile",
  headline: "ทำระบบให้ธุรกิจใช้ได้จริง",
  subHeadline: "งานที่กระจัดกระจาย เก็บเป็นระบบที่ทีมเปิดใช้ทุกวัน",
  modules: "Web App • Mobile App • Internal System • CRM • Dashboard • AI",
  statement: "จากงานที่คุยกัน ถึงระบบที่ขึ้นใช้จริง",
  description:
    "LIMIT CODE STUDIO ช่วยดู workflow ออกแบบ และทำระบบให้ธุรกิจ ตั้งแต่เว็บแอป มือถือ CRM Job Order ระบบจอง Admin Dashboard ไปจนถึง AI และระบบภายใน",
  positioning:
    "Software Studio focused on Web Applications, Internal Systems and Business Workflow Solutions.",
};

export const CP_ABOUT = {
  heading: "เราไม่ได้รับทำแค่เว็บไซต์",
  paragraphs: [
    "LIMIT CODE STUDIO เป็นทีมที่โฟกัสทำระบบให้ธุรกิจ",
    "เริ่มจากงานที่ทำอยู่ตอนนี้ ปัญหาที่ทีมเจอ และเป้าหมายของธุรกิจ แล้วค่อยออกแบบระบบที่คนใช้จริง",
  ],
  marketingPhrase:
    "เราไม่ได้เริ่มจากคำว่าอยากได้เว็บแบบไหน แต่เริ่มจากธุรกิจทำงานยังไง",
  fitTitle: "เหมาะกับธุรกิจที่:",
  fitList: [
    "ยังรับงานผ่าน LINE",
    "ใช้ Excel หรือ Google Sheets หลายไฟล์",
    "ข้อมูลลูกค้ากระจัดกระจาย",
    "ตามสถานะงานยาก",
    "ไม่มี Dashboard กลาง",
    "ต้องการระบบเฉพาะที่โปรแกรมสำเร็จรูปใช้ไม่ได้",
  ],
  highlights: [
    { no: "01", title: "เข้าใจธุรกิจก่อนเขียนระบบ" },
    { no: "02", title: "Scope ชัดก่อนเริ่ม" },
    { no: "03", title: "Demo และทดลองเป็นรอบ" },
    { no: "04", title: "ต่อยอดและดูแลหลังส่งมอบ" },
  ],
};

export const CP_SERVICES: { title: string; desc: string }[] = [
  { title: "Web Application", desc: "ระบบเว็บที่ทำงานได้จริง ไม่ใช่แค่หน้าโชว์บริษัท" },
  { title: "Mobile Application", desc: "ระบบสำหรับลูกค้า พนักงาน ผู้ให้บริการ หรือทีมหน้างาน" },
  { title: "CRM / Sales Pipeline", desc: "จัดการลูกค้า การตามงาน การขาย และประวัติการติดต่อ" },
  { title: "Job Order / Workflow", desc: "ตามงานตั้งแต่รับออเดอร์จนปิดงาน" },
  { title: "Booking System", desc: "ระบบจองคิว ห้อง สนาม หรือบริการ" },
  { title: "Admin Dashboard", desc: "หลังบ้านสำหรับเจ้าของกิจการและทีม" },
  { title: "Internal Business System", desc: "เปลี่ยน Excel / Google Sheet / งานทำมือ ให้เป็นระบบ" },
  { title: "AI Integration", desc: "AI Assistant, AI Workflow, Prompt / Persona, CMS, Credit / Quota" },
  { title: "API & Third-party Integration", desc: "LINE OA, Payment, Maps, External APIs" },
  { title: "Maintenance & Support", desc: "ดูแล ปรับปรุง มอนิเตอร์ และทำต่อ" },
];

export const CP_PROBLEMS = {
  heading: "จากปัญหาหน้างาน ถึงระบบที่จัดการได้",
  before: ["LINE", "Excel", "Google Sheets", "Paper", "Manual follow-up", "ข้อมูลแยกหลายที่"],
  after: [
    "CRM",
    "Job Order",
    "Dashboard",
    "Workflow",
    "Notification",
    "Reporting",
    "Permission",
    "Audit trail",
  ],
  examples: [
    { problem: "ลูกค้าทัก LINE แล้วตกหล่น", solution: "CRM + Follow-up" },
    { problem: "ทีมใช้ Excel คนละไฟล์", solution: "Centralized System" },
    { problem: "เจ้าของไม่รู้ว่างานถึงไหน", solution: "Realtime Dashboard" },
    { problem: "ลูกค้าถามสถานะซ้ำ", solution: "Tracking Portal" },
    { problem: "ทำรายงานทุกสิ้นเดือนด้วยมือ", solution: "Automated Reporting" },
  ],
};

export const CP_PROCESS = {
  heading: "จากงานที่คุยกัน ถึงระบบที่ใช้จริง",
  steps: [
    { no: "01", title: "Requirement & Workflow", desc: "เข้าใจธุรกิจ ผู้ใช้ และปัญหา" },
    { no: "02", title: "Scope & Architecture", desc: "กำหนด Module, Permission, Data Flow และ Integration" },
    { no: "03", title: "UX/UI Design", desc: "ออกแบบหน้าจอให้ทุกฝ่ายเห็นภาพตรงกัน" },
    { no: "04", title: "Development", desc: "พัฒนา Frontend, Backend และ Database" },
    { no: "05", title: "Demo & UAT", desc: "ส่ง Demo เป็นรอบและทดสอบกับผู้ใช้จริง" },
    { no: "06", title: "Deploy & Handover", desc: "ขึ้นระบบจริง ส่งมอบ และอบรม" },
    { no: "07", title: "Maintenance", desc: "ดูแลระบบและพัฒนาต่อ" },
  ],
};

export type CpProject = {
  name: string;
  url?: string;
  category: string;
  label: string;
  desc: string;
  points?: string[];
  note?: string;
};

export const CP_PROJECTS: CpProject[] = [
  {
    name: "KindGo",
    url: "https://kindgo.app/",
    category: "Multi-service Platform / Booking Application",
    label: "Service Marketplace / Booking / Tracking",
    desc: "แพลตฟอร์มรวมบริการในชีวิตประจำวัน เชื่อมลูกค้ากับผู้ให้บริการหลายหมวด",
    points: [
      "Service selection",
      "Location",
      "Booking date & time",
      "Provider matching",
      "Tracking",
      "Secure payment",
      "Real-time updates",
      "Provider network",
      "Trust & Safety",
    ],
  },
  {
    name: "NurseGo",
    url: "https://www.nursego.co/",
    category: "Healthcare Workforce Platform",
    label: "Healthcare Platform",
    desc: "แพลตฟอร์มสำหรับงานพยาบาลและบุคลากรการแพทย์",
  },
  {
    name: "Horasard",
    url: "https://horasard.com/",
    category: "AI Astrology / Consumer Web App",
    label: "AI Chat / Credit / Membership",
    desc: "เว็บดูดวงด้วย AI คำนวณพื้นดวงจากวันเกิด แล้วสนทนาตามหมวด พร้อมแพ็กเกจ Free / Pro",
  },
  {
    name: "Sirikanchana",
    url: "https://sirikanchana.com/",
    category: "Sports Booking / Badminton Court",
    label: "Court Booking / PromptPay",
    desc: "ระบบจองคอร์ทแบดมินตันออนไลน์ของสนามแบดศิริกาญจนา จองตามช่วงเวลา ชำระ PromptPay",
  },
  {
    name: "Marketimes Asia",
    url: "https://marketimesasia.com/",
    category: "Digital Media / Publishing Platform",
    label: "Media Platform / Website",
    desc: "เว็บสื่อและคอนเทนต์ออนไลน์ของ Marketimes Asia",
  },
  {
    name: "สมบัติทัวร์",
    category: "Transportation / Digital System",
    label: "Selected Client / Transportation Sector",
    desc: "งานในธุรกิจขนส่งของ สมบัติทัวร์",
    note: "รายละเอียดระบบคุยเพิ่มได้ตามงาน",
  },
  {
    name: "LIMIT CODE DEMO SYSTEMS",
    url: "https://www.limitcode.shop/",
    category: "Interactive Demo Systems",
    label: "Demo / Prototype Systems",
    desc: "มีเดโมให้กดลอง เห็นภาพการทำงานจริงก่อนเริ่มงาน",
    points: [
      "Booking systems",
      "CRM / Job Order",
      "Clinic appointment systems",
      "Hotel PMS",
      "Fleet maintenance dashboards",
      "Restaurant management",
      "AI platforms",
    ],
  },
];

export const CP_INDUSTRIES = {
  heading: "ระบบเข้ากับธุรกิจ ไม่ใช่บังคับธุรกิจให้เข้ากับระบบ",
  note: "งานเฉพาะทาง ออกแบบตามที่ทำอยู่จริงได้",
  items: [
    { th: "โรงพยาบาล", en: "Healthcare" },
    { th: "โรงเรียน / มหาวิทยาลัย", en: "Education" },
    { th: "โรงแรม", en: "Hospitality" },
    { th: "โรงงาน", en: "Manufacturing" },
    { th: "ขนส่ง", en: "Transportation" },
    { th: "ธุรกิจบริการ", en: "Service Business" },
    { th: "ค้าปลีก / กระจายสินค้า", en: "Retail / Distribution" },
    { th: "หน่วยงานภาครัฐ", en: "Government" },
    { th: "วิชาชีพเฉพาะทาง", en: "Professional Services" },
    { th: "อสังหาฯ / ก่อสร้าง", en: "Property / Construction" },
  ],
};

export const CP_ENGAGEMENT = {
  heading: "รูปแบบการพัฒนา",
  models: [
    { title: "MVP", desc: "เริ่มจากโมดูลสำคัญ เพื่อเอาไปลองใช้เร็ว" },
    { title: "Custom System", desc: "ออกแบบตาม workflow ธุรกิจ" },
    { title: "Phased Development", desc: "แบ่งทำเป็นช่วง คุมงบและความเสี่ยง" },
    { title: "Maintenance", desc: "ดูแลและทำต่อรายเดือน" },
  ],
};

export const CP_TECH = {
  heading: "Modern Technology Stack",
  note: "เลือกเครื่องมือให้เข้ากับงานแต่ละชิ้น",
  groups: [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { name: "Mobile", items: ["React Native", "Flutter"] },
    { name: "Backend", items: ["Node.js", "NestJS", "Python"] },
    { name: "Database", items: ["PostgreSQL", "Supabase", "Firebase", "MongoDB", "Redis"] },
    { name: "Infrastructure", items: ["Vercel", "Cloudflare", "AWS", "Docker"] },
    { name: "Integrations", items: ["LINE OA", "Google Maps", "Payment APIs", "External APIs"] },
    { name: "AI", items: ["OpenAI GPT-5.6 Sol", "Claude Opus 5", "Gemini 3.7", "Grok 4.6"] },
  ],
};

export const CP_WHY = {
  heading: "ทำไมเลือกทำระบบกับเรา",
  quote:
    "ระบบที่ดีไม่ใช่ระบบที่มีฟีเจอร์เยอะที่สุด แต่เป็นระบบที่ลดงานซ้ำ ลดความผิดพลาด และทำให้ทีมทำงานง่ายขึ้น",
  cards: [
    "ดู workflow ก่อนลงมือ",
    "Scope และราคาเป็นขั้นเป็นตอน",
    "มี Demo ให้ดูระหว่างทาง",
    "รองรับ Role / Permission",
    "ต่อ API และระบบเดิมได้",
    "ดูแลต่อหลังขึ้นระบบ",
  ],
};

export const CP_CONTACT_PAGE = {
  heading: "มีงานระบบที่อยากทำให้เป็นของจริง?",
  text: "ส่งงานที่ทำอยู่ตอนนี้ ปัญหาที่ทีมเจอ หรือตัวอย่างที่อยากได้มาได้เลย เราช่วยดูขอบเขตและแนวทางให้",
};
