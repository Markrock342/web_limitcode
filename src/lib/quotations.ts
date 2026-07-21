// Business quotations rendered at /quotation/[slug] — print to PDF from the browser.
// Inline **bold** marks emphasis, rendered by the quotation page.

export type QuotePackage = {
  code: string;
  name: string;
  tagline: string;
  /** short description used in the price-summary table */
  fitFor: string;
  price: number;
  priceUnit: string;
  recommended?: boolean;
  items: string[];
  duration: string;
};

export type QuoteTableRow = [string, string, string];

export type Quotation = {
  slug: string;
  docNo: string;
  edition?: string;
  projectShort: string;
  subtitle: string;
  date: string;
  validFor: string;
  proposer: string;
  contact: string;
  demoRef?: string;
  client: string;
  channel: string;
  summary: string;
  demoCallout?: { label: string; url: string };
  priceTableTitle: string;
  priceFootnote: string;
  packages: QuotePackage[];
  clientCosts: { title: string; head: QuoteTableRow; rows: QuoteTableRow[] };
  monthly?: {
    title: string;
    head: QuoteTableRow;
    rows: QuoteTableRow[];
    totalLabel: string;
    totalValue: string;
    footnote: string;
  };
  choosing?: { title: string; lines: string[] };
  payment: {
    title: string;
    head: QuoteTableRow;
    rows: QuoteTableRow[];
    totalRow: QuoteTableRow;
    footnotes: string[];
  };
  bank: { bankShort: string; bankThai: string; bankLine: string; accountNo: string; accountName: string };
  notes: string[];
  signatures: { proposerRole: string; proposerName: string; approverRole: string; approverName: string };
};

export const QUOTATIONS: Quotation[] = [
  {
    slug: "courseflix",
    docNo: "LCS-QT-CFX-2026-001",
    edition: "ฉบับสรุป",
    projectShort: "แอปคอร์สออนไลน์ CourseFlix",
    subtitle: "แอปมือถือคอร์สออนไลน์ (Android + iOS) · ลง Google Play + App Store ได้",
    date: "19 กรกฎาคม 2569",
    validFor: "30 วัน",
    proposer: "Limit Code Studio (นาย สนธยา สายวรรณะ)",
    contact: "โทร 084-265-2544 · LINE @026iaomj · www.limitcode.shop",
    demoRef: "course-xi-bay.vercel.app",
    client: "คุณ Nichapa Chobchimpalee (บริษัท / ทีม)",
    channel: "Messenger",
    summary:
      "พัฒนาแอปคอร์สออนไลน์ที่ **ติดตั้งใช้งานจริงได้ทั้ง Android และ iOS** ตามเดโม CourseFlix · **ทุกแพ็กเกจรวมงานช่วยลง Google Play + App Store** (ลูกค้าเป็นเจ้าของบัญชีสโตร์ / จ่ายค่าธรรมเนียมสโตร์เอง) · เลือกได้ 3 แพ็กเกจตามรายการด้านล่าง",
    demoCallout: { label: "เดโมที่ส่งทดลองแล้ว:", url: "https://course-xi-bay.vercel.app/" },
    priceTableTitle: "สรุปราคาแพ็กเกจ (จ่ายครั้งเดียว · รวมลงสโตร์)",
    priceFootnote:
      "* ราคาข้างต้นเป็นยอดรวมครั้งเดียว (พัฒนา + ตั้งค่า + ช่วยลงสโตร์) · ไม่รวมค่าบัญชีสโตร์ของลูกค้า และค่ารายเดือนโฮสต์ (ถ้าเลือกใช้)",
    packages: [
      {
        code: "A",
        name: "A · Starter",
        tagline: "เริ่มต้น · แอปติดเครื่อง + ลงสโตร์",
        fitFor: "แอปติดเครื่อง + ลงสโตร์ · ยังไม่ขายออนไลน์",
        price: 39900,
        priceUnit: "บาท · จ่ายครั้งเดียว",
        items: [
          "แอปติดตั้งได้ทั้ง Android + iOS (ไม่ใช่แค่เว็บ)",
          "หน้าจอตามเดโม: หน้าหลัก · ค้นหา · คอร์สของฉัน · โปรไฟล์",
          "หน้ารายละเอียดคอร์ส + เครื่องเล่นวิดีโอ",
          "แถบนำทางแบบกระจก (glass tab)",
          "ปรับแบรนด์: ชื่อแอป · โลโก้ · สี · ไอคอนสโตร์",
          "ใส่คอร์ส / วิดีโอตัวอย่างตามที่ลูกค้าส่ง (รอบแรก)",
          "สร้างไฟล์ลงสโตร์ (AAB Android + build iOS)",
          "**ช่วยยื่นลง Google Play + App Store** จนพร้อมเผยแพร่",
          "คู่มือสั้น + สอนใช้งานเบื้องต้น",
          "รับประกันแก้บั๊กตามขอบเขต **15 วัน** หลังส่งมอบ",
        ],
        duration: "ระยะโดยประมาณ 3–4 สัปดาห์ · ยังไม่มีระบบสมาชิก / ชำระเงิน / หลังบ้านเต็มรูปแบบ",
      },
      {
        code: "B",
        name: "B · Business",
        tagline: "ขายคอร์สได้จริง · รวมทุกอย่างใน A",
        fitFor: "ขายคอร์สได้จริง · สมาชิก · หลังบ้าน · ลงสโตร์",
        price: 89500,
        priceUnit: "บาท · จ่ายครั้งเดียว",
        recommended: true,
        items: [
          "**ได้ทุกรายการในแพ็กเกจ A** (รวมช่วยลงสโตร์)",
          "ระบบสมัคร / ล็อกอินสมาชิก (อีเมลหรือเบอร์โทร)",
          "หลังบ้าน (CMS): เพิ่ม · แก้ · ปิดคอร์สเองได้",
          "จัดการบทเรียน · ราคา · ภาพปกคอร์ส",
          "ระบบซื้อคอร์ส: PromptPay / แนบสลิป + แอดมินอนุมัติ",
          "บันทึกความคืบหน้าเรียน (เรียนต่อจากตอนล่าสุด)",
          "หน้า “คอร์สของฉัน” ผูกกับบัญชีจริง",
          "แจ้งเตือน Push (เช่น คอร์สใหม่ / ชำระเงินสำเร็จ)",
          "รายงานยอดขายพื้นฐานในหลังบ้าน",
          "ตั้งค่าเซิร์ฟเวอร์ / API ให้พร้อมใช้งานจริง",
          "**ช่วยยื่น + ปรับตามรีวิวสโตร์รอบแรก** จนลงได้",
          "รับประกันแก้บั๊กตามขอบเขต **30 วัน** หลังส่งมอบ",
        ],
        duration: "ระยะโดยประมาณ 6–8 สัปดาห์ · คุ้มที่สุดถ้าต้องการเปิดขายจริง",
      },
      {
        code: "C",
        name: "C · Pro",
        tagline: "แพลตฟอร์มทีม · รวมทุกอย่างใน B",
        fitFor: "แพลตฟอร์มทีม · คูปอง · ใบรับรอง · รายงานเต็ม",
        price: 129900,
        priceUnit: "บาท · จ่ายครั้งเดียว",
        items: [
          "**ได้ทุกรายการในแพ็กเกจ B** (รวมช่วยลงสโตร์)",
          "ล็อกอินโซเชียล (เช่น Google / LINE — ตามที่ตกลง)",
          "บทบาทผู้สอนหลายคน + สิทธิ์แอดมิน",
          "ระบบคูปอง / โค้ดส่วนลด / โปรโมชัน",
          "ใบรับรองจบคอร์ส (ออกอัตโนมัติ / ดาวน์โหลด)",
          "แดชบอร์ดกราฟยอดขาย · ผู้เรียน · ส่งออกไฟล์",
          "แคมเปญ Push แจ้งเตือนตามกลุ่มเป้าหมาย",
          "โครงสร้างรองรับวิดีโอจำนวนมาก (แนวทาง CDN / hosting)",
          "CMS เต็ม: หมวดหมู่ · ลำดับบทเรียน · จัดการผู้สอน",
          "ช่วยลงสโตร์ + ปรับตามรีวิวสโตร์จนกว่าจะผ่าน",
          "รับประกันแก้บั๊กตามขอบเขต **90 วัน** หลังส่งมอบ",
        ],
        duration: "ระยะโดยประมาณ 10–14 สัปดาห์ · เหมาะเมื่อจะขยายทีมผู้สอนและโปรโมชัน",
      },
    ],
    clientCosts: {
      title: "ค่าใช้จ่ายที่ลูกค้าจ่ายเอง (ไม่รวมในแพ็กเกจ)",
      head: ["รายการ", "ใครจ่าย", "ประมาณการ"],
      rows: [
        ["บัญชี Google Play Console (ครั้งเดียว)", "ลูกค้า", "~25 USD"],
        ["บัญชี Apple Developer (รายปี)", "ลูกค้า", "~99 USD/ปี"],
        ["ค่าธรรมเนียมเกตเวย์ชำระเงิน (ถ้าใช้ Omise ฯลฯ)", "ตามผู้ให้บริการ", "ตามจริง"],
        ["ค่าโฮสต์วิดีโอ / CDN เมื่อคอร์สเยอะมาก", "ลูกค้า", "ตามปริมาณใช้"],
      ],
    },
    monthly: {
      title: "ค่าบริการรายเดือน (ถ้าให้เราดูแลโฮสต์ — ไม่บังคับ)",
      head: ["รายการ", "แพ็กที่มักใช้", "ราคา/เดือน"],
      rows: [
        ["โฮสต์ API + ฐานข้อมูล + สำรองข้อมูล", "B / C", "1,500"],
        ["ค่าดูแลระบบ (แก้บั๊กเล็กน้อย · อัปเดตความปลอดภัย)", "ทุกแพ็ก", "2,000"],
      ],
      totalLabel: "รวมรายเดือน (ถ้าเลือกครบ)",
      totalValue: "3,500 บาท/เดือน",
      footnote: "* เริ่มคิดหลังเปิดใช้งานจริง · ยกเลิกได้ (แจ้งล่วงหน้า 30 วัน) · ลูกค้าตั้งโฮสต์เองก็ได้",
    },
    choosing: {
      title: "เลือกยังไงดี",
      lines: [
        "· อยากได้แอปลงสโตร์เร็ว โชว์แบรนด์ / ทดลองในบริษัท → **A · 39,900**",
        "· อยากขายคอร์ส มีสมาชิก จ่ายเงิน จัดการเอง → **B · 89,500 (แนะนำ)**",
        "· อยากมีทีมผู้สอน คูปอง ใบรับรอง รายงานเต็ม → **C · 129,900**",
      ],
    },
    payment: {
      title: "เงื่อนไขการชำระเงิน (ตัวอย่างเมื่อเลือกแพ็กเกจ B)",
      head: ["งวด", "ยอดชำระ", "เงื่อนไข"],
      rows: [
        ["งวดที่ 1 — มัดจำ", "44,750 บาท", "50% เมื่อยืนยันตกลงรับงาน + เลือกแพ็กเกจ"],
        ["งวดที่ 2 — ก่อนส่งมอบ / ก่อนขึ้นสโตร์", "44,750 บาท", "ส่วนที่เหลือ หลังตรวจงานครบ"],
      ],
      totalRow: ["รวมทั้งสิ้น (แพ็ก B)", "89,500 บาท", "ตัวอักษร: แปดหมื่นเก้าพันห้าร้อยบาทถ้วน"],
      footnotes: [
        "แพ็กเกจ A / C ใช้หลักเดียวกัน: มัดจำ 50% เมื่อตกลง · เหลือ 50% ก่อนส่งมอบ",
        "A = มัดจำ 19,950 / เหลือ 19,950 · C = มัดจำ 64,950 / เหลือ 64,950",
      ],
    },
    bank: {
      bankShort: "SCB",
      bankThai: "ไทยพาณิชย์",
      bankLine: "ธนาคารไทยพาณิชย์ (SCB)",
      accountNo: "131-233271-7",
      accountName: "มยุรี นามโคตร",
    },
    notes: [
      "**ทุกแพ็กเกจรวมงานช่วยลง Google Play + App Store** — ลูกค้าเปิดบัญชีสโตร์เองและจ่ายค่าธรรมเนียมสโตร์ · เราเตรียมไฟล์ ยื่น และปรับตามรีวิวจนลงได้ (ตามขอบเขตแพ็ก)",
      "ระยะเวลาอนุมัติสโตร์ขึ้นกับ Google / Apple — ไม่นับรวมในระยะพัฒนางาน",
      "วิดีโอคอร์ส / ลิขสิทธิ์เนื้อหา / รูปภาพ — ลูกค้าเป็นผู้จัดหาและรับผิดชอบสิทธิ์",
      "งานนอกขอบเขตหลังส่งมอบ เริ่มประมาณ **1,000–3,000 บาท/ครั้ง** หรือประเมินเป็นรอบ",
      "ราคาเป็นข้อเสนอเพื่อประกอบการพิจารณา — ยืนยันแพ็กเกจแล้วออกใบยืนยันงานก่อนเริ่ม",
    ],
    signatures: {
      proposerRole: "ผู้เสนอราคา / Limit Code Studio",
      proposerName: "( นาย สนธยา สายวรรณะ )",
      approverRole: "ผู้อนุมัติ / ลูกค้า",
      approverName: "( Nichapa Chobchimpalee )",
    },
  },
];

export function getQuotation(slug: string) {
  return QUOTATIONS.find((q) => q.slug === slug);
}
