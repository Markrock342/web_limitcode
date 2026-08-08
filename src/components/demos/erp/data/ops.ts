import type {
  Activity,
  ApprovalRequest,
  AuditLog,
  Employee,
  NotificationItem,
  Opportunity,
} from "@/components/demos/erp/types/erp";

/* =========================================================
   CRM pipeline / approvals / notifications / org / audit
   ========================================================= */

export const OPPORTUNITIES: Opportunity[] = [
  { id: "op1", customerName: "ABC Food Manufacturing", customerId: "c1", title: "Custom PET Bottle 500ml", value: 850_000, stage: "Customer PO", probability: 95, salesperson: "วิชัย ส.", nextFollowUp: "2026-08-15", source: "ลูกค้าเดิม" },
  { id: "op2", customerName: "Siam Beverage Packaging", customerId: "c2", title: "Stand-up Pouch พิมพ์ 6 สี", value: 760_000, stage: "Quotation", probability: 70, salesperson: "อรทัย พ.", nextFollowUp: "2026-08-11", source: "ลูกค้าเดิม" },
  { id: "op3", customerName: "Eastern Industrial Products", customerId: "c5", title: "ถาด ESD ตามแบบ CAD", value: 310_000, stage: "Sourcing", probability: 55, salesperson: "ธนกร ล.", nextFollowUp: "2026-08-10" },
  { id: "op4", customerName: "Thai Premium Foods", customerId: "c3", title: "กล่องอาหาร 1000ml ล็อตประจำไตรมาส", value: 76_800, stage: "Negotiation", probability: 80, salesperson: "วิชัย ส.", nextFollowUp: "2026-08-09" },
  { id: "op5", customerName: "Bangkok Retail Supply", customerId: "c4", title: "แก้วกระดาษ + กล่องลูกฟูก Q4", value: 159_750, stage: "Quotation", probability: 65, salesperson: "อรทัย พ.", nextFollowUp: "2026-08-12" },
  { id: "op6", customerName: "โรงงานน้ำพริกแม่ศรี", title: "ขวดแก้ว + ฝาล็อค 250ml", value: 420_000, stage: "Requirement", probability: 40, salesperson: "วิชัย ส.", nextFollowUp: "2026-08-13", source: "งานแฟร์ THAIFEX" },
  { id: "op7", customerName: "Cha Wan Tea House", title: "แก้ว PP + ฝาโดม 12,000 ใบ/เดือน", value: 96_000, stage: "Contacted", probability: 30, salesperson: "ธนกร ล.", nextFollowUp: "2026-08-14", source: "Facebook Ads" },
  { id: "op8", customerName: "Nature Soap Co.", title: "กล่อง Rigid + ถุงผ้า Custom", value: 185_000, stage: "New Lead", probability: 15, salesperson: "อรทัย พ.", nextFollowUp: "2026-08-11", source: "Website" },
  { id: "op9", customerName: "Golden Fruit Export", title: "กล่องผลไม้ Export 5 ชั้น", value: 540_000, stage: "New Lead", probability: 20, salesperson: "วิชัย ส.", nextFollowUp: "2026-08-16", source: "แนะนำ" },
  { id: "op10", customerName: "Bangkok Catering Group", title: "ชุดกล่องอาหาร Delivery", value: 230_000, stage: "Won", probability: 100, salesperson: "ธนกร ล.", nextFollowUp: "-" },
  { id: "op11", customerName: "P&N Cosmetics", title: "ขวดปั๊ม 300ml + ฉลาก", value: 145_000, stage: "Lost", probability: 0, salesperson: "อรทัย พ.", nextFollowUp: "-" },
];

export const ACTIVITIES: Activity[] = [
  { id: "ac1", customerId: "c1", type: "meeting", note: "ประชุมสรุปสเปคขวด PET + ยืนยัน Pantone 2935C กับฝ่ายการตลาดลูกค้า", date: "2026-06-15", owner: "วิชัย ส." },
  { id: "ac2", customerId: "c1", type: "line", note: "ลูกค้าส่ง Artwork โลโก้ไฟล์ AI เวอร์ชันสุดท้าย", date: "2026-06-17", owner: "วิชัย ส." },
  { id: "ac3", customerId: "c1", type: "call", note: "แจ้ง ETA ตู้ 14 ส.ค. ลูกค้าเตรียมแผนรับของ", date: "2026-08-05", owner: "วิชัย ส." },
  { id: "ac4", customerId: "c2", type: "visit", note: "เข้าพบ Supply Chain นำตัวอย่าง Pouch 3 แบบ", date: "2026-07-20", owner: "อรทัย พ." },
  { id: "ac5", customerId: "c4", type: "call", note: "ติดตามหนี้ INV-2026-0842 — ลูกค้าขอผ่อนชำระ 2 งวด", date: "2026-08-04", owner: "ฝ่ายการเงิน" },
];

export const APPROVALS: ApprovalRequest[] = [
  {
    id: "apv1",
    type: "Purchase Approval",
    title: "PO-TH-2026-0204 — สยามพลาสติก ฿150,000",
    requester: "จัดซื้อ: นิภา ก.",
    department: "Purchasing",
    amount: 150_000,
    reason: "เติมสต็อก Food Grade Container ต่ำกว่า Reorder Point",
    approver: "ผู้จัดการจัดซื้อ",
    status: "Pending",
    date: "2026-08-06",
    refLink: "/demo/erp/purchasing/orders/po4",
  },
  {
    id: "apv2",
    type: "Discount Approval",
    title: "ส่วนลด 18% — QT-2026-0240 (Bangkok Retail Supply)",
    requester: "ฝ่ายขาย: อรทัย พ.",
    department: "Sales",
    amount: 28_750,
    reason: "ลูกค้า Distributor สั่งซื้อ Volume สูง เกินเพดานส่วนลด 15%",
    approver: "ผู้จัดการฝ่ายขาย",
    status: "Pending",
    date: "2026-08-05",
    refLink: "/demo/erp/sales/quotations/q4",
  },
  {
    id: "apv3",
    type: "Credit Approval",
    title: "SO เกินวงเงินเครดิต — ABC Food (฿850,000 / วงเงินคงเหลือ ฿580,000)",
    requester: "ฝ่ายขาย: วิชัย ส.",
    department: "Sales",
    amount: 850_000,
    reason: "ลูกค้า Key Account ประวัติชำระดี ขออนุมัติเกินวงเงินชั่วคราว",
    approver: "GM",
    status: "Approved",
    date: "2026-06-25",
    refLink: "/demo/erp/sales/orders/so1",
  },
  {
    id: "apv4",
    type: "Expense Approval",
    title: "ค่าใช้จ่ายเดินทางไปตรวจโรงงาน Guangzhou",
    requester: "จัดซื้อ: นิภา ก.",
    department: "Purchasing",
    amount: 62_000,
    reason: "ตรวจไลน์ผลิตก่อนยืนยันงาน Custom Pouch (เกินเพดาน ฿50,000)",
    approver: "GM",
    status: "Pending",
    date: "2026-08-03",
  },
  {
    id: "apv5",
    type: "Supplier Bank Change",
    title: "Shenzhen Global Source ขอเปลี่ยนบัญชีรับเงิน",
    requester: "บัญชี: สุดา ว.",
    department: "Accounting",
    reason: "ได้รับอีเมลแจ้งเปลี่ยนบัญชี — ต้องตรวจสอบยืนยันทางโทรศัพท์ก่อน (กันมิจฉาชีพ)",
    approver: "CFO",
    status: "Pending",
    date: "2026-08-07",
  },
];

export const NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", kind: "shipment", title: "SHP-2026-0091 ออกจากท่า Nansha แล้ว", detail: "ETA แหลมฉบัง 14 ส.ค. 2026 • ตู้ 40' HQ", time: "2 ชม.ที่แล้ว", read: false },
  { id: "n2", kind: "ar", title: "ลูกหนี้เกินกำหนด: Bangkok Retail Supply", detail: "INV-2026-0842 ค้าง ฿312,500 เกินกำหนด 12 วัน", time: "4 ชม.ที่แล้ว", read: false },
  { id: "n3", kind: "stock", title: "สต็อกต่ำกว่าจุดสั่งซื้อ: PKG-TRAY-PP", detail: "คงเหลือ 5,300 ชิ้น (Reorder Point 20,000)", time: "เมื่อวาน", read: false },
  { id: "n4", kind: "approval", title: "รออนุมัติ 4 รายการ", detail: "PO 1 • ส่วนลด 1 • ค่าใช้จ่าย 1 • เปลี่ยนบัญชี Supplier 1", time: "เมื่อวาน", read: true },
  { id: "n5", kind: "order", title: "Quotation ใกล้หมดอายุ", detail: "QT-2026-0231 (Siam Beverage) หมดอายุ 22 ส.ค.", time: "2 วันที่แล้ว", read: true },
  { id: "n6", kind: "qc", title: "QC ผ่าน: SHP-2026-0078", detail: "Custom Printed Pouch 120,000 ชิ้น รับเข้าคลังแล้ว", time: "3 วันที่แล้ว", read: true },
];

export const EMPLOYEES: Employee[] = [
  { id: "e1", name: "คุณมาร์ค (Mark)", position: "กรรมการผู้จัดการ", department: "Executive", role: "Owner / CEO" },
  { id: "e2", name: "สุรีย์ พงศ์ภักดี", position: "General Manager", department: "Executive", role: "General Manager" },
  { id: "e3", name: "วิชัย สุขสันต์", position: "Sales Manager", department: "Sales", role: "Sales Manager" },
  { id: "e4", name: "อรทัย พูลสวัสดิ์", position: "Sales Executive", department: "Sales", role: "Sales" },
  { id: "e5", name: "ธนกร ลิ้มทอง", position: "Sales Executive", department: "Sales", role: "Sales" },
  { id: "e6", name: "นิภา กาญจนา", position: "Purchasing Manager", department: "Purchasing", role: "Purchasing Manager" },
  { id: "e7", name: "ชัยวัฒน์ อินทร", position: "Import Officer", department: "Import", role: "Import Officer" },
  { id: "e8", name: "สมพร แก้วใส", position: "Warehouse Manager", department: "Warehouse", role: "Warehouse Manager" },
  { id: "e9", name: "สุดา วรรณศรี", position: "หัวหน้าบัญชี", department: "Accounting", role: "Accounting" },
  { id: "e10", name: "พรทิพย์ จันทร์เพ็ญ", position: "การเงิน", department: "Finance", role: "Finance" },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: "au1", user: "วิชัย ส.", action: "แก้ไขราคาขาย", module: "Products", record: "PKG-PET-500", before: "฿8.20", after: "฿8.50", time: "2026-08-07 14:22", ip: "192.168.1.24" },
  { id: "au2", user: "สุรีย์ พ. (GM)", action: "อนุมัติ Credit เกินวงเงิน", module: "Approvals", record: "SO-2026-0342", time: "2026-06-25 10:05", ip: "192.168.1.2" },
  { id: "au3", user: "นิภา ก.", action: "อนุมัติ PO", module: "Purchasing", record: "PO-TH-2026-0201", time: "2026-08-02 16:40", ip: "192.168.1.31" },
  { id: "au4", user: "สมพร ก.", action: "ปรับปรุงสต็อก (Cycle Count)", module: "Inventory", record: "PKG-CTN-B01", before: "12,460", after: "12,400", time: "2026-08-01 09:12", ip: "192.168.1.45" },
  { id: "au5", user: "สุดา ว.", action: "แก้ไขวงเงินเครดิต", module: "Customers", record: "CUS-0004", before: "฿600,000", after: "฿800,000", time: "2026-07-28 11:30", ip: "192.168.1.18" },
];

/* ---------- chart series (mock 12 เดือน) ---------- */

export const MONTHLY_REVENUE = [
  { month: "ก.ย. 25", revenue: 5_120_000, gp: 1_180_000 },
  { month: "ต.ค. 25", revenue: 5_840_000, gp: 1_390_000 },
  { month: "พ.ย. 25", revenue: 6_230_000, gp: 1_520_000 },
  { month: "ธ.ค. 25", revenue: 7_480_000, gp: 1_870_000 },
  { month: "ม.ค. 26", revenue: 5_950_000, gp: 1_420_000 },
  { month: "ก.พ. 26", revenue: 6_410_000, gp: 1_580_000 },
  { month: "มี.ค. 26", revenue: 7_120_000, gp: 1_760_000 },
  { month: "เม.ย. 26", revenue: 6_020_000, gp: 1_450_000 },
  { month: "พ.ค. 26", revenue: 6_880_000, gp: 1_710_000 },
  { month: "มิ.ย. 26", revenue: 7_460_000, gp: 1_890_000 },
  { month: "ก.ค. 26", revenue: 7_950_000, gp: 2_010_000 },
  { month: "ส.ค. 26", revenue: 8_420_000, gp: 2_140_000 },
];

export const SALES_BY_CATEGORY = [
  { name: "Rigid Packaging", value: 3_120_000 },
  { name: "Food Packaging", value: 2_460_000 },
  { name: "Flexible Packaging", value: 1_540_000 },
  { name: "Corrugated", value: 820_000 },
  { name: "อื่น ๆ", value: 480_000 },
];

export const SALES_BY_CHANNEL = [
  { name: "B2B Direct", value: 5_890_000 },
  { name: "Distributor", value: 1_680_000 },
  { name: "B2C / Online", value: 850_000 },
];

export const SALES_BY_SALESPERSON = [
  { name: "วิชัย ส.", value: 3_680_000, target: 3_500_000 },
  { name: "อรทัย พ.", value: 2_940_000, target: 3_000_000 },
  { name: "ธนกร ล.", value: 1_800_000, target: 2_000_000 },
];

export const PURCHASE_CN_TH = [
  { month: "มี.ค.", china: 2_140_000, thailand: 680_000 },
  { month: "เม.ย.", china: 1_820_000, thailand: 740_000 },
  { month: "พ.ค.", china: 2_460_000, thailand: 590_000 },
  { month: "มิ.ย.", china: 2_910_000, thailand: 820_000 },
  { month: "ก.ค.", china: 2_380_000, thailand: 760_000 },
  { month: "ส.ค.", china: 1_960_000, thailand: 640_000 },
];

export const FX_RATES: Record<string, number> = {
  THB: 1,
  CNY: 4.78,
  USD: 34.6,
};
