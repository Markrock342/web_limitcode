import { CONTACT, LINE_ID, LINE_URL } from "./site";

/**
 * ==============================================================
 * Company Profile (/company-profile) — เนื้อหาทั้งหมดแก้ที่ไฟล์นี้
 * เป้าหมาย: ตอบใน 1–2 นาทีว่า LCS คือใคร / ทำอะไร / เหมาะกับใคร /
 * เคยทำอะไร / ทำงานยังไง / เชื่อถือได้แค่ไหน — ไม่ใช่โฮมเพจซ้ำ
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
  positioning: "Independent Software Studio",
  taglineEn: "We turn business workflows into software.",
  headline: "เราพัฒนา Web Application และระบบหลังบ้านสำหรับ SME และธุรกิจบริการ",
  subHeadline:
    "ตั้งแต่ระบบจอง CRM Job Management Dashboard ไปจนถึง AI Automation",
  description:
    "เราเริ่มจากการเข้าใจ Workflow ที่ธุรกิจใช้งานจริง ก่อนออกแบบและพัฒนาระบบที่นำไปใช้จริงและต่อยอดได้ — ไม่ได้เริ่มจากการขายเทคโนโลยี",
  statement: "จาก Workflow หน้างาน → ระบบที่ทีมเปิดใช้ทุกวัน",
};

export const CP_WHO = {
  heading: "เราคือใคร",
  en: "Who We Are",
  paragraphs: [
    "LIMIT CODE STUDIO (LCS) คือทีมพัฒนาซอฟต์แวร์อิสระในประเทศไทย ที่มุ่งพัฒนา Web Application, Business System และระบบหลังบ้านสำหรับ SME และธุรกิจบริการ",
    "เราไม่ได้เริ่มจากการขายเทคโนโลยี แต่เริ่มจาก Workflow และปัญหาที่ธุรกิจใช้งานจริง แล้วค่อยออกแบบระบบที่คนใช้ได้จริง",
  ],
  marketingPhrase: "เราไม่ได้เริ่มจากคำว่าอยากได้เว็บแบบไหน แต่เริ่มจากธุรกิจทำงานยังไง",
};

export const CP_WHAT = {
  heading: "เราทำอะไร",
  en: "What We Do",
  intro:
    "ตั้งแต่เว็บไซต์ธุรกิจขนาดเล็ก ไปจนถึงระบบหลังบ้านที่มีฐานข้อมูล สิทธิ์ผู้ใช้งาน การชำระเงิน Dashboard และ Integration กับบริการภายนอก",
  items: [
    {
      title: "Custom Web Application",
      desc: "เว็บระบบที่ทำงานได้จริง ไม่ใช่แค่หน้าโชว์บริษัท",
    },
    {
      title: "Booking & Reservation",
      desc: "จองคิว คอร์ท ห้อง บริการ — พร้อมชำระเงินและหลังบ้าน",
    },
    {
      title: "CRM / ERP / Job & Ops",
      desc: "ลูกค้า งานขาย Job Order คลัง และ workflow ภายใน",
    },
    {
      title: "AI & Business Automation",
      desc: "ผู้ช่วย AI ออโตเมชัน และระบบที่ลดงานซ้ำของทีม",
    },
  ],
};

export const CP_AUDIENCE = {
  heading: "เราทำให้ใคร",
  en: "Who We Work With",
  intro:
    "เราทำงานกับ SME, ธุรกิจบริการ, สนามกีฬา, โรงแรม, Property, Logistics, Field Service และธุรกิจที่ต้องการเปลี่ยน Workflow จาก LINE / Excel / เอกสาร ให้เป็นระบบเดียว",
  fitTitle: "เหมาะกับธุรกิจที่ยัง:",
  fitList: [
    "รับงานผ่าน LINE แล้วตกหล่น",
    "ใช้ Excel / Google Sheets คนละไฟล์",
    "ข้อมูลลูกค้ากระจัดกระจาย",
    "ตามสถานะงานยาก",
    "ไม่มี Dashboard กลาง",
    "โปรแกรมสำเร็จรูปครอบคลุมไม่ถึง",
  ],
  industries: [
    { th: "ธุรกิจบริการ", en: "Service" },
    { th: "สนามกีฬา / จอง", en: "Sports booking" },
    { th: "โรงแรม / Hospitality", en: "Hospitality" },
    { th: "Property", en: "Property" },
    { th: "Logistics / ขนส่ง", en: "Logistics" },
    { th: "Field Service", en: "Field service" },
    { th: "Healthcare", en: "Healthcare" },
    { th: "ค้าปลีก / กระจายสินค้า", en: "Retail" },
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
  kind: "production" | "demo";
};

export const CP_PROJECTS: CpProject[] = [
  {
    kind: "production",
    name: "Sirikanchana",
    url: "https://sirikanchana.com/",
    category: "Sports Booking / Badminton Court",
    label: "Production",
    desc: "ระบบจองคอร์ทแบดมินตันออนไลน์ — จองหลายคอร์ท ชำระ PromptPay แนบสลิป หลังบ้านจัดคอร์ท และเชื่อม LINE",
    points: ["Booking + Admin", "Payment workflow", "LINE", "Court operations"],
  },
  {
    kind: "production",
    name: "NurseGo",
    url: "https://www.nursego.co/",
    category: "Healthcare Workforce Platform",
    label: "Production",
    desc: "แพลตฟอร์มสำหรับงานพยาบาลและบุคลากรการแพทย์",
  },
  {
    kind: "production",
    name: "KindGo",
    url: "https://kindgo.app/",
    category: "Multi-service Platform / Booking",
    label: "Production",
    desc: "แพลตฟอร์มรวมบริการในชีวิตประจำวัน เชื่อมลูกค้ากับผู้ให้บริการหลายหมวด",
    points: ["Booking", "Matching", "Tracking", "Payment"],
  },
  {
    kind: "production",
    name: "Horasard",
    url: "https://horasard.com/",
    category: "AI Astrology / Consumer Web App",
    label: "Production",
    desc: "เว็บดูดวงด้วย AI คำนวณพื้นดวงจากวันเกิด แชทตามหมวด พร้อมแพ็กเกจ Free / Pro",
  },
  {
    kind: "production",
    name: "Marketimes Asia",
    url: "https://marketimesasia.com/",
    category: "Digital Media / Publishing",
    label: "Production",
    desc: "เว็บสื่อและคอนเทนต์ออนไลน์ของ Marketimes Asia",
  },
  {
    kind: "production",
    name: "สมบัติทัวร์",
    category: "Transportation / Digital System",
    label: "Production",
    desc: "งานในธุรกิจขนส่งของ สมบัติทัวร์",
    note: "รายละเอียดระบบคุยเพิ่มได้ตามความเหมาะสม",
  },
  {
    kind: "demo",
    name: "Interactive Demo Systems",
    url: "https://www.limitcode.shop/showcase",
    category: "Prototype / Mockup",
    label: "Demo",
    desc: "เดโมกดลองได้ก่อนเริ่มงานจริง — ไม่เคลมเป็นงานลูกค้า",
    points: [
      "Hotel PMS",
      "Logistics / Fleet",
      "CRM / Field Service",
      "Clinic booking",
      "ERP / Ops",
      "AI systems",
    ],
  },
];

export const CP_PROCESS = {
  heading: "วิธีทำงานของเรา",
  en: "How We Work",
  intro: "ล็อก Scope ก่อนเริ่ม · มี Demo ให้เห็นเป็นระยะ · ทดสอบกับผู้ใช้จริงก่อนขึ้นระบบ",
  steps: [
    { no: "01", title: "Requirement & Workflow", desc: "เข้าใจธุรกิจ ผู้ใช้ และปัญหาหน้างาน" },
    { no: "02", title: "Scope & Architecture", desc: "โมดูล สิทธิ์ ข้อมูล และการเชื่อมต่อ" },
    { no: "03", title: "UX/UI Design", desc: "หน้าจอที่ทุกฝ่ายเห็นภาพตรงกัน" },
    { no: "04", title: "Development", desc: "Frontend, Backend และ Database" },
    { no: "05", title: "Demo & UAT", desc: "Demo เป็นรอบ ทดสอบกับผู้ใช้จริง" },
    { no: "06", title: "Deploy & Handover", desc: "ขึ้นระบบ ส่งมอบ และอบรม" },
    { no: "07", title: "Support", desc: "ดูแลต่อและขยายเมื่อพร้อม" },
  ],
};

export const CP_WHY = {
  heading: "ทำไมเลือก LCS",
  en: "Why LCS",
  cards: [
    {
      title: "Workflow First",
      desc: "เข้าใจกระบวนการก่อนเขียนโค้ด",
    },
    {
      title: "Scope Transparency",
      desc: "ตกลง Scope ก่อนเริ่ม — ไม่เพิ่มงาน/ราคาโดยไม่คุย",
    },
    {
      title: "Visible Progress",
      desc: "ลูกค้าเห็นความคืบหน้าและ Demo เป็นระยะ",
    },
    {
      title: "Built to Extend",
      desc: "เริ่มจากระบบที่จำเป็น แล้วขยายได้",
    },
    {
      title: "Handover & Support",
      desc: "ส่งมอบระบบและดูแลหลัง Deploy",
    },
  ],
  quote:
    "ระบบที่ดีไม่ใช่ระบบที่มีฟีเจอร์เยอะที่สุด แต่เป็นระบบที่ลดงานซ้ำ ลดความผิดพลาด และทำให้ทีมทำงานง่ายขึ้น",
};

export const CP_CONTACT_PAGE = {
  heading: "เริ่มคุยงานระบบ",
  en: "Start a Project",
  text: "ส่ง Workflow ที่ทำอยู่ ปัญหาที่ทีมเจอ หรือตัวอย่างที่อยากได้มาได้เลย — เราช่วยดูขอบเขตและแนวทางให้ โดยไม่คิดค่าปรึกษาเบื้องต้น",
  cta: "ทัก LINE OA หรือส่งอีเมลมาได้เลย",
};
