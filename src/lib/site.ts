export const LINE_ID = "@026iaomj";
// LINE OA add-friend link (the @ must be URL-encoded)
export const LINE_URL = "https://line.me/R/ti/p/%40026iaomj";

export const BRAND = {
  name: "LIMIT CODE STUDIO",
  short: "LIMIT CODE",
  tagline: "รับพัฒนาเว็บไซต์ เว็บแอป แอปพลิเคชัน และระบบหลังบ้านสำหรับธุรกิจ",
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
  | "heart";

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
    id: "corporate",
    icon: "globe",
    title: "เว็บไซต์บริษัท",
    desc: "เว็บไซต์ทั่วไปที่ดูน่าเชื่อถือ บอกเล่าธุรกิจของคุณได้ครบ พร้อมรองรับมือถือ",
    points: ["หน้าแรก / เกี่ยวกับเรา", "บริการ และผลงาน", "ฟอร์มติดต่อ", "รองรับมือถือเต็มรูปแบบ"],
    accent: "from-indigo-500 to-violet-500",
  },
  {
    id: "shop",
    icon: "cart",
    title: "เว็บขายของออนไลน์",
    desc: "ร้านค้าออนไลน์พร้อมขาย ตั้งแต่หน้าสินค้า ตะกร้า ไปจนถึงระบบจัดการของหลังบ้าน",
    points: ["หน้าสินค้า + หมวดหมู่", "รายละเอียดสินค้า", "ตะกร้า + สรุปออเดอร์", "จัดการสินค้าเบื้องต้น"],
    accent: "from-rose-500 to-orange-500",
  },
  {
    id: "restaurant",
    icon: "coffee",
    title: "เว็บร้านอาหาร / คาเฟ่",
    desc: "โชว์เมนูสวย ๆ พร้อมระบบจองโต๊ะและแผนที่ ให้ลูกค้าหาคุณเจอและสั่งง่าย",
    points: ["เมนูออนไลน์ + รูปอาหาร", "ระบบจองโต๊ะ", "แผนที่ร้าน + โปรโมชั่น", "ช่องทางติดต่อ"],
    accent: "from-amber-500 to-rose-500",
  },
  {
    id: "booking",
    icon: "calendar",
    title: "ระบบจองบริการ",
    desc: "ระบบนัดหมายออนไลน์ที่ลูกค้าจองเองได้ พร้อม Dashboard ให้ทีมจัดการคิว",
    points: ["เลือกวันเวลา + บริการ", "ฟอร์มจอง", "ระบบจัดการคิว", "Dashboard สำหรับทีม"],
    accent: "from-sky-500 to-cyan-500",
  },
  {
    id: "dashboard",
    icon: "dashboard",
    title: "ระบบหลังบ้านธุรกิจ",
    desc: "ระบบเฉพาะทางที่ออกแบบตาม workflow ของคุณ จัดการข้อมูลได้จริงในที่เดียว",
    points: ["จัดการลูกค้า / ออเดอร์", "จัดการสินค้า / บริการ", "รายงานสรุป", "ระบบแอดมิน"],
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: "mvp",
    icon: "rocket",
    title: "เว็บแอป / แอป MVP",
    desc: "เริ่มจาก MVP เพื่อทดลองตลาด วาง scope ออกแบบ พัฒนา และ deploy ใช้งานจริง",
    points: ["วาง scope + UX/UI", "พัฒนา front / back", "เชื่อม database", "deploy + ดูแลต่อ"],
    accent: "from-fuchsia-500 to-violet-600",
  },
];

export const WHY: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: "spark",
    title: "ช่วยคิด flow และ scope ก่อนเริ่ม",
    desc: "เราคุยโจทย์กับคุณก่อนลงมือ วางขอบเขตให้ชัด ไม่ใช่รับทำตามสั่งอย่างเดียว",
  },
  {
    icon: "heart",
    title: "ออกแบบให้ใช้ง่ายทั้งสองฝั่ง",
    desc: "ทั้งฝั่งลูกค้าและฝั่งแอดมินต้องใช้งานลื่น ไม่งง ลดงานซ้ำซ้อนของทีมคุณ",
  },
  {
    icon: "rocket",
    title: "เริ่มเล็กแบบ MVP แล้วต่อยอด",
    desc: "ลงทุนเท่าที่จำเป็นก่อน ทดลองตลาดให้เห็นผล แล้วค่อยขยายระบบทีหลังได้",
  },
  {
    icon: "shield",
    title: "ใช้เทคโนโลยีที่ดูแลต่อได้จริง",
    desc: "เลือกเครื่องมือมาตรฐานสากล ทีมอื่นรับช่วงต่อได้ ไม่ผูกขาดจนไปต่อไม่ได้",
  },
  {
    icon: "layers",
    title: "เหมาะกับ SME ที่อยากมีระบบของตัวเอง",
    desc: "ทีมเล็ก คล่องตัว คุยง่าย ทำงานไว เข้าใจข้อจำกัดและงบของธุรกิจ",
  },
];

export const PROCESS: { step: string; title: string; desc: string }[] = [
  {
    step: "01",
    title: "คุยโจทย์และเป้าหมายธุรกิจ",
    desc: "ทำความเข้าใจปัญหา กลุ่มลูกค้า และสิ่งที่อยากได้ เพื่อตั้งเป้าให้ตรงกัน",
  },
  {
    step: "02",
    title: "สรุป scope / feature / workflow",
    desc: "วางขอบเขตงาน ฟีเจอร์ และลำดับการทำงานให้ชัดเจนก่อนเริ่มพัฒนา",
  },
  {
    step: "03",
    title: "ออกแบบ UX/UI",
    desc: "ออกแบบหน้าตาและการใช้งานบน Figma ให้เห็นภาพก่อนลงมือเขียนโค้ดจริง",
  },
  {
    step: "04",
    title: "พัฒนาและทดสอบระบบ",
    desc: "พัฒนา frontend / backend เชื่อมต่อข้อมูล และทดสอบให้ใช้งานได้จริง",
  },
  {
    step: "05",
    title: "ส่งมอบและดูแลต่อเนื่อง",
    desc: "deploy ขึ้นใช้งานจริง พร้อมดูแล ปรับปรุง และต่อยอดในระยะยาว",
  },
];

export const USE_CASES: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: "coffee",
    title: "เว็บร้านอาหารพร้อมเมนูออนไลน์และจองโต๊ะ",
    desc: "ลูกค้าดูเมนู เห็นรูปอาหาร และจองโต๊ะล่วงหน้าได้เอง ลดงานรับโทรศัพท์",
  },
  {
    icon: "cart",
    title: "เว็บขายของพร้อมระบบจัดการสินค้า",
    desc: "เปิดร้านออนไลน์ รับออเดอร์ และจัดการสต็อก/สินค้าได้จากหลังบ้าน",
  },
  {
    icon: "calendar",
    title: "ระบบจองบริการสำหรับคลินิกหรือร้านเสริมสวย",
    desc: "ลูกค้าเลือกบริการและเวลาที่สะดวก ทีมงานเห็นคิวรวมในหน้าเดียว",
  },
  {
    icon: "dashboard",
    title: "Dashboard หลังบ้านจัดการลูกค้าและออเดอร์",
    desc: "รวมข้อมูลลูกค้า ออเดอร์ และรายงานสรุปไว้ในระบบเดียว ใช้ตัดสินใจได้",
  },
  {
    icon: "rocket",
    title: "MVP แอปสำหรับทดลองตลาด",
    desc: "สร้างเวอร์ชันแรกเพื่อทดสอบไอเดียกับผู้ใช้จริง ก่อนลงทุนเต็มรูปแบบ",
  },
];
