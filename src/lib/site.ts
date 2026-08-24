export const LINE_ID = "@026iaomj";
// LINE OA add-friend link (the @ must be URL-encoded)
export const LINE_URL = "https://line.me/R/ti/p/%40026iaomj";

export const CONTACT = {
  person: "Mark Kitti",
  personThai: "คุณ Mark",
  role: "Project Manager",
  teamSize: 3,
  phoneDisplay: "084-265-2544",
  phoneHref: "tel:+66842652544",
  facebookHref: "https://www.facebook.com/mark.kitti.950719",
  facebookLabel: "facebook.com/mark.kitti.950719",
  pageFacebookHref: "https://www.facebook.com/profile.php?id=61590787370304",
  pageFacebookLabel: "LIMIT CODE STUDIO",
  pageFacebookName: "เพจทางการ LIMIT CODE STUDIO",
} as const;

export const BRAND = {
  name: "LIMIT CODE STUDIO",
  short: "LIMIT CODE",
  tagline: "ทีม 3 คน รับทำเว็บไซต์ ระบบจอง CRM และงานที่ธุรกิจใช้อยู่จริง",
};

export type IconName =
  | "globe"
  | "cart"
  | "coffee"
  | "calendar"
  | "dashboard"
  | "rocket"
  | "spark"
  | "chat"
  | "check"
  | "arrow"
  | "shield"
  | "layers"
  | "heart"
  | "home";

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  desc: string;
  points: string[];
  accent: string; // tailwind gradient classes
};

export const SERVICES: Service[] = [
  {
    id: "booking",
    icon: "calendar",
    title: "ระบบจองและบริหารคิว",
    desc: "จองหลายทรัพยากร ตารางเวลา สมาชิก และแอดมินจัดการคิวในที่เดียว แทนการจองผ่านแชท",
    points: ["ตารางหลายคอร์ท / หลายห้อง", "สมาชิก + แนบสลิป", "เชื่อม LINE OA", "Admin จัดการคิว"],
    accent: "from-sky-500 to-cyan-500",
  },
  {
    id: "crm",
    icon: "layers",
    title: "CRM / Job Order / ทีมหน้างาน",
    desc: "จากใบเสนอราคาถึงงานหน้าสนาม — ติดตามสถานะ ทีม และปฏิทินงานใน workflow เดียว",
    points: ["ลูกค้า + Quotation", "Job Order / Calendar", "ทีมหน้างาน", "Dashboard สรุปงาน"],
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: "dashboard",
    icon: "dashboard",
    title: "Admin Dashboard และระบบสมาชิก",
    desc: "หลังบ้านที่ผู้บริหารและทีมใช้จริง ดูรายงาน จัดการสิทธิ์ และบันทึกการชำระเงิน",
    points: ["Role / Permission", "สมาชิกและชำระเงิน", "รายงานสรุป", "Audit / ประวัติการใช้งาน"],
    accent: "from-indigo-500 to-violet-500",
  },
  {
    id: "ai",
    icon: "spark",
    title: "ระบบ AI สำหรับธุรกิจ",
    desc: "เชื่อม AI เข้า workflow จริง เช่น credit/quota, persona, CMS และแพ็กเกจ Free / Pro",
    points: ["AI integration", "Credit / Quota", "Prompt / Persona", "Admin CMS"],
    accent: "from-fuchsia-500 to-violet-600",
  },
];

export const WHY: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: "spark",
    title: "วาง workflow ก่อนเขียนโค้ด",
    desc: "เราเก็บ Requirement วาด Scope Map และล็อกขอบเขตให้ชัดก่อนลงมือ ไม่รับทำตามสั่งอย่างเดียว",
  },
  {
    icon: "layers",
    title: "สร้างระบบที่ทีมใช้ได้จริง",
    desc: "โฟกัส Web App และหลังบ้านสำหรับธุรกิจบริการ — จองคิว CRM Job Order Dashboard AI",
  },
  {
    icon: "rocket",
    title: "เริ่มจากโมดูลที่จำเป็น แล้วต่อยอด",
    desc: "ส่งมอบส่วนที่สร้างมูลค่าก่อน แล้วขยายฟีเจอร์ตามการใช้งานจริง ไม่บloat ตั้งแต่วันแรก",
  },
  {
    icon: "shield",
    title: "ส่งมอบของที่ใช้ได้ ไม่ใช่แค่ไฟล์โค้ด",
    desc: "ฟรีแลนซ์ที่ทำงานเป็นขั้นตอน — มี Demo รายสัปดาห์ UAT Handover และแพ็กเกจดูแลต่อหลังขึ้นระบบ",
  },
  {
    icon: "heart",
    title: "เหมาะกับ SME ที่ยังพึ่ง LINE + Excel",
    desc: "เราเข้าใจงานที่กระจัดกระจาย และช่วยรวมเป็นระบบเดียวที่ทีมและผู้บริหารใช้ร่วมกันได้",
  },
];

export const PROCESS: { step: string; title: string; desc: string }[] = [
  {
    step: "01",
    title: "คุย Requirement และ Workflow",
    desc: "ทำความเข้าใจปัญหาเดิม กลุ่มผู้ใช้ และเป้าหมายธุรกิจ แล้ววาด flow ให้เห็นภาพ",
  },
  {
    step: "02",
    title: "Scope Map และประเมินราคา",
    desc: "ล็อกขอบเขต โมดูล และความเสี่ยงให้ชัด ก่อนออก Proposal และสัญญา",
  },
  {
    step: "03",
    title: "ออกแบบ UX/UI",
    desc: "ออกแบบหน้าจอฝั่งลูกค้าและแอดมินให้เห็นภาพก่อนลงมือพัฒนา",
  },
  {
    step: "04",
    title: "พัฒนา Demo รายสัปดาห์",
    desc: "ส่งความคืบหน้าเป็นรอบ ทดสอบร่วมกัน และปรับตาม feedback ก่อน UAT",
  },
  {
    step: "05",
    title: "Deploy Handover และดูแลต่อ",
    desc: "ขึ้นระบบจริง ส่งมอบ พร้อม Warranty / Maintenance ตามแพ็กเกจที่ตกลง",
  },
];

/** สถานการณ์จริงที่ลูกค้าเจอ — ใช้แทน “รับทำเว็บทุกชนิด” */
export const USE_CASES: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: "chat",
    title: "ยังจองคิวผ่านแชทและโทรศัพท์",
    desc: "ลูกค้าทัก LINE ทีมตอบช้า คิวชนกัน — เราเปลี่ยนเป็นระบบจองตารางที่ลูกค้าจองเองได้",
  },
  {
    icon: "layers",
    title: "ทีมใช้ Excel หลายไฟล์",
    desc: "ข้อมูลลูกค้า ออเดอร์ และงานหน้าสนามกระจัดกระจาย — รวมเป็น CRM / Job Order ในที่เดียว",
  },
  {
    icon: "rocket",
    title: "ลูกค้าไม่รู้สถานะงาน",
    desc: "ถามซ้ำ ติดตามยาก — ใส่สถานะงาน ปฏิทิน และแจ้งเตือนให้ทุกฝ่ายเห็นตรงกัน",
  },
  {
    icon: "dashboard",
    title: "ผู้บริหารไม่มี Dashboard",
    desc: "ตัดสินใจจากความรู้สึก — สร้างรายงานสรุปยอดจอง งาน และรายได้แบบเรียลไทม์",
  },
  {
    icon: "spark",
    title: "อยากใช้ AI แต่ยังไม่มีระบบรองรับ",
    desc: "ไม่ใช่แค่ติด ChatGPT — วาง credit, persona, CMS และแพ็กเกจให้ขายและดูแลต่อได้",
  },
];

export type Client = {
  name: string;
  logo: string;
  url: string;
  width: number;
  height: number;
};

export const CLIENTS: Client[] = [
  {
    name: "NurseGo",
    logo: "/clients/nursego.png",
    url: "https://www.nursego.co/",
    width: 260,
    height: 88,
  },
  {
    name: "KindGo",
    logo: "/clients/kindgo.png",
    url: "https://kindgo.app/",
    width: 800,
    height: 188,
  },
  {
    name: "Horasard",
    logo: "/clients/horasard.png",
    url: "https://horasard.com/",
    width: 720,
    height: 175,
  },
  {
    name: "สมบัติทัวร์",
    logo: "/clients/sombattour.png",
    url: "https://www.sombattour.com/",
    width: 130,
    height: 43,
  },
  {
    name: "Marketimes Asia",
    logo: "/clients/marketimes-asia.png",
    url: "https://marketimesasia.com/",
    width: 240,
    height: 30,
  },
];
