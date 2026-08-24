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
  headline: "พัฒนาระบบสำหรับธุรกิจและองค์กร",
  subHeadline: "เปลี่ยนงานที่กระจัดกระจาย ให้กลายเป็นระบบที่ทีมใช้ได้จริง",
  modules: "Web App • Mobile App • Internal System • CRM • Dashboard • AI",
  statement: "จาก Requirement และ Workflow สู่ระบบที่ขึ้นใช้งานจริง",
  description:
    "LIMIT CODE STUDIO ช่วยวิเคราะห์ Workflow ออกแบบ และพัฒนาระบบสำหรับธุรกิจ ตั้งแต่ Web Application, Mobile Application, CRM, Job Order, ระบบจอง, Admin Dashboard ไปจนถึง AI Integration และระบบภายในองค์กร",
  positioning:
    "Software Studio focused on Web Applications, Internal Systems and Business Workflow Solutions.",
};

export const CP_ABOUT = {
  heading: "เราไม่ได้รับทำแค่เว็บไซต์",
  paragraphs: [
    "LIMIT CODE STUDIO เป็น Software Studio ที่โฟกัสการพัฒนาระบบสำหรับธุรกิจ",
    "เราเริ่มจากการเข้าใจ Workflow ปัจจุบัน ปัญหาที่ทีมเจอ และเป้าหมายของธุรกิจ ก่อนออกแบบระบบที่เหมาะกับการใช้งานจริง",
  ],
  marketingPhrase:
    "เราไม่ได้เริ่มจากคำว่าอยากได้เว็บแบบไหน แต่เริ่มจากธุรกิจของคุณทำงานอย่างไร",
  fitTitle: "เหมาะกับธุรกิจที่:",
  fitList: [
    "ยังรับงานผ่าน LINE",
    "ใช้ Excel หรือ Google Sheets หลายไฟล์",
    "ข้อมูลลูกค้ากระจัดกระจาย",
    "ติดตามสถานะงานยาก",
    "ไม่มี Dashboard กลาง",
    "ต้องการระบบเฉพาะที่ Software สำเร็จรูปตอบโจทย์ไม่ได้",
  ],
  highlights: [
    { no: "01", title: "เข้าใจธุรกิจก่อนเขียนระบบ" },
    { no: "02", title: "Scope ชัดก่อนเริ่ม" },
    { no: "03", title: "Demo และทดสอบเป็นรอบ" },
    { no: "04", title: "ต่อยอดและดูแลหลังส่งมอบ" },
  ],
};

export const CP_SERVICES: { title: string; desc: string }[] = [
  { title: "Web Application", desc: "ระบบเว็บสำหรับธุรกิจที่ต้องการ Workflow มากกว่าเว็บไซต์ทั่วไป" },
  { title: "Mobile Application", desc: "ระบบสำหรับลูกค้า พนักงาน ผู้ให้บริการ หรือทีมภาคสนาม" },
  { title: "CRM / Sales Pipeline", desc: "จัดการ Lead ลูกค้า การติดตาม การขาย และประวัติการติดต่อ" },
  { title: "Job Order / Workflow", desc: "ติดตามงาน ตั้งแต่รับ Order จนปิดงาน" },
  { title: "Booking System", desc: "ระบบจองคิว ห้อง สนาม บริการ หรือทรัพยากร" },
  { title: "Admin Dashboard", desc: "หลังบ้านสำหรับผู้บริหารและทีม" },
  { title: "Internal Business System", desc: "เปลี่ยน Excel / Google Sheet / งาน Manual ให้เป็นระบบ" },
  { title: "AI Integration", desc: "AI Assistant, AI Workflow, Prompt / Persona, CMS, Credit / Quota" },
  { title: "API & Third-party Integration", desc: "LINE OA, Payment, Maps, External APIs" },
  { title: "Maintenance & Support", desc: "ดูแล ปรับปรุง Monitoring และพัฒนาต่อ" },
];

export const CP_PROBLEMS = {
  heading: "จากปัญหาหน้างาน สู่ระบบที่จัดการได้",
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
    { problem: "ทำ Report ทุกสิ้นเดือนด้วยมือ", solution: "Automated Reporting" },
  ],
};

export const CP_PROCESS = {
  heading: "จากโจทย์ธุรกิจ ถึงระบบที่ใช้งานจริง",
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
    desc: "แพลตฟอร์มรวมบริการในชีวิตประจำวัน เชื่อมลูกค้ากับผู้ให้บริการในหลายหมวด",
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
    desc: "แพลตฟอร์มสำหรับงานพยาบาลและบุคลากรทางการแพทย์",
  },
  {
    name: "Marketimes Asia",
    url: "https://marketimesasia.com/",
    category: "Digital Media / Publishing Platform",
    label: "Media Platform / Website",
    desc: "เว็บไซต์สื่อและคอนเทนต์ออนไลน์สำหรับ Marketimes Asia",
  },
  {
    name: "สมบัติทัวร์",
    category: "Transportation / Digital System",
    label: "Selected Client / Transportation Sector",
    desc: "โปรเจกต์ในภาคธุรกิจขนส่งสำหรับ สมบัติทัวร์",
    note: "รายละเอียดระบบสามารถนำเสนอเพิ่มเติมตามความเหมาะสม",
  },
  {
    name: "LIMIT CODE DEMO SYSTEMS",
    url: "https://www.limitcode.shop/",
    category: "Interactive Demo Systems",
    label: "Demo / Prototype Systems",
    desc: "เราพัฒนาระบบตัวอย่างแบบ Interactive เพื่อให้เห็นภาพการทำงานจริงก่อนเริ่มโปรเจกต์",
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
  heading: "ระบบที่ออกแบบให้เข้ากับธุรกิจ ไม่ใช่บังคับธุรกิจให้เข้ากับระบบ",
  note: "หาก Workflow มีความเฉพาะ เราสามารถออกแบบระบบตามกระบวนการจริงขององค์กร",
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
    { title: "MVP", desc: "เริ่มจาก Module สำคัญเพื่อทดลองใช้เร็ว" },
    { title: "Custom System", desc: "ออกแบบตาม Workflow ธุรกิจ" },
    { title: "Phased Development", desc: "แบ่งการพัฒนาเป็น Phase เพื่อควบคุมงบและความเสี่ยง" },
    { title: "Maintenance", desc: "ดูแลและพัฒนาต่อรายเดือน" },
  ],
};

export const CP_TECH = {
  heading: "Modern Technology Stack",
  note: "เราเลือกเทคโนโลยีจากความเหมาะสมของโจทย์และ Requirement ของแต่ละโปรเจกต์",
  groups: [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { name: "Mobile", items: ["React Native", "Flutter"] },
    { name: "Backend", items: ["Node.js", "NestJS", "Python"] },
    { name: "Database", items: ["PostgreSQL", "Supabase", "Firebase", "MongoDB", "Redis"] },
    { name: "Infrastructure", items: ["Vercel", "Cloudflare", "AWS", "Docker"] },
    { name: "Integrations", items: ["LINE OA", "Google Maps", "Payment APIs", "External APIs"] },
    { name: "AI", items: ["OpenAI", "Gemini", "Claude / Anthropic"] },
  ],
};

export const CP_WHY = {
  heading: "ทำไมธุรกิจเลือกพัฒนาระบบกับเรา",
  quote:
    "ระบบที่ดีไม่ใช่ระบบที่มีฟีเจอร์เยอะที่สุด แต่เป็นระบบที่ลดงานซ้ำ ลดความผิดพลาด และทำให้ทีมทำงานง่ายขึ้น",
  cards: [
    "วิเคราะห์ Workflow ก่อนพัฒนา",
    "Scope และราคาเป็นขั้นตอน",
    "Demo ให้ตรวจระหว่างทาง",
    "รองรับ Role / Permission",
    "ต่อ API และระบบเดิมได้",
    "Maintenance หลังขึ้นระบบ",
  ],
};

export const CP_CONTACT_PAGE = {
  heading: "มีโจทย์ระบบที่อยากทำให้เป็นจริง?",
  text: "ส่ง Workflow ปัจจุบัน ปัญหาที่ทีมเจอ หรือตัวอย่างระบบที่ต้องการมาได้เลย เราช่วยวิเคราะห์ Scope และแนวทางเบื้องต้นให้",
};
