/* =========================================================
   LCS Enterprise ERP — Domain types
   ========================================================= */

export type Currency = "THB" | "CNY" | "USD";

export type ProductType = "Stock Item" | "Non-stock Item" | "Custom Sourcing" | "Made-to-order";
export type Unit = "PCS" | "BOX" | "PACK" | "CARTON" | "KG" | "ROLL" | "SET";

export interface PackagingSpec {
  material?: string;
  color?: string;
  size?: string;
  thickness?: string;
  volume?: string;
  printing?: string;
  pantone?: string;
  packagingType?: string;
  note?: string;
}

export interface VolumeTier {
  min: number;
  max?: number;
  price: number;
}

export interface WarehouseStock {
  warehouse: string;
  onHand: number;
  reserved: number;
  incoming: number;
}

export interface Product {
  id: string;
  sku: string;
  nameTh: string;
  nameEn: string;
  nameCn?: string;
  category: string;
  subcategory?: string;
  brand?: string;
  type: ProductType;
  unit: Unit;
  purchaseUnit: Unit;
  salesUnit: Unit;
  moq: number;
  weightKg: number;
  cbm: number;
  dimensions?: string;
  barcode?: string;
  hsCode?: string;
  origin: "CN" | "TH";
  preferredSupplierId: string;
  leadTimeDays: number;
  stdCost: number;
  avgCost: number;
  lastCost: number;
  landedCost: number;
  retailPrice: number;
  wholesalePrice: number;
  safetyStock: number;
  reorderPoint: number;
  spec?: PackagingSpec;
  volumePricing: VolumeTier[];
  stock: WarehouseStock[];
  attachments?: string[];
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  taxId: string;
  branch: string;
  industry: string;
  group: string;
  salesperson: string;
  priceList: string;
  paymentTermDays: number;
  creditLimit: number;
  contact: string;
  phone: string;
  email: string;
  line?: string;
  billingAddress: string;
  shippingAddress: string;
  since: string;
}

export type SupplierType =
  | "China Supplier"
  | "Thai Factory"
  | "Thai Distributor"
  | "Freight Forwarder"
  | "Custom Broker"
  | "Logistics Provider";

export interface Supplier {
  id: string;
  code: string;
  name: string;
  country: "CN" | "TH";
  type: SupplierType;
  currency: Currency;
  contact: string;
  phone?: string;
  wechat?: string;
  line?: string;
  alibaba?: string;
  paymentTerm: string;
  leadTimeDays: number;
  moq?: string;
  rating: number; // 1-5
  qualityPct: number;
  onTimePct: number;
  rejectedPct: number;
  purchaseValueYTD: number;
}

/* ---------- CRM ---------- */

export type PipelineStage =
  | "New Lead"
  | "Contacted"
  | "Requirement"
  | "Sourcing"
  | "Quotation"
  | "Negotiation"
  | "Customer PO"
  | "Won"
  | "Lost";

export interface Opportunity {
  id: string;
  customerName: string;
  customerId?: string;
  title: string;
  value: number;
  stage: PipelineStage;
  probability: number;
  salesperson: string;
  nextFollowUp: string;
  source?: string;
}

export interface Activity {
  id: string;
  customerId: string;
  type: "call" | "meeting" | "line" | "email" | "visit";
  note: string;
  date: string;
  owner: string;
}

/* ---------- Documents ---------- */

export interface DocItem {
  productId?: string;
  sku: string;
  name: string;
  qty: number;
  unit: string;
  unitPrice: number;
  discountPct?: number;
  cost?: number; // internal
}

export type QuotationStatus = "Draft" | "Sent" | "Approved" | "Converted" | "Expired";

export interface Quotation {
  id: string;
  number: string;
  customerId: string;
  date: string;
  validUntil: string;
  salesperson: string;
  paymentTerms: string;
  deliveryTerms: string;
  items: DocItem[];
  vatPct: number;
  status: QuotationStatus;
  soId?: string;
  sourcingId?: string;
}

export type SoStatus =
  | "Draft"
  | "Confirmed"
  | "Awaiting Stock"
  | "Reserved"
  | "Picking"
  | "Packing"
  | "Ready to Ship"
  | "Delivered"
  | "Invoiced"
  | "Paid";

export interface SalesOrder {
  id: string;
  number: string;
  customerId: string;
  customerPO?: string;
  quotationId?: string;
  date: string;
  requiredDate: string;
  status: SoStatus;
  items: DocItem[];
  warehouse: string;
  vatPct: number;
  invoiceId?: string;
  deliveryId?: string;
}

export type PoStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Production"
  | "Shipped"
  | "Received"
  | "Closed";

export interface PurchaseOrder {
  id: string;
  number: string;
  supplierId: string;
  currency: Currency;
  fxRate: number;
  incoterm: string;
  paymentTerms: string;
  date: string;
  expectedShip: string;
  expectedArrival: string;
  status: PoStatus;
  items: DocItem[]; // unitPrice in PO currency
  freight: number; // PO currency
  shipmentId?: string;
  sourcingId?: string;
  soId?: string;
}

export type ShipmentStatus =
  | "กำลังผลิต"
  | "รอโหลดสินค้า"
  | "ออกจากจีนแล้ว"
  | "อยู่ระหว่างขนส่ง"
  | "ถึงท่าเรือไทย"
  | "Customs Clearance"
  | "รอรับเข้าโกดัง"
  | "Completed";

export const SHIPMENT_FLOW: ShipmentStatus[] = [
  "กำลังผลิต",
  "รอโหลดสินค้า",
  "ออกจากจีนแล้ว",
  "อยู่ระหว่างขนส่ง",
  "ถึงท่าเรือไทย",
  "Customs Clearance",
  "รอรับเข้าโกดัง",
  "Completed",
];

export interface LandedCostLine {
  label: string;
  amount: number; // THB
}

export interface Shipment {
  id: string;
  number: string;
  supplierId: string;
  poId: string;
  mode: "SEA" | "AIR";
  container: string;
  incoterm: string;
  etd: string;
  eta: string;
  portOrigin: string;
  portDest: string;
  shippingLine: string;
  forwarder: string;
  status: ShipmentStatus;
  valueTHB: number;
  costs: LandedCostLine[];
  docs: string[];
  received?: boolean;
  qcResult?: "Pass" | "Conditional Pass" | "Reject";
}

export type InvoiceStatus = "Open" | "Overdue" | "Partial" | "Paid";

export interface ARInvoice {
  id: string;
  number: string;
  customerId: string;
  soId?: string;
  date: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: InvoiceStatus;
}

export interface APInvoice {
  id: string;
  number: string;
  supplierId: string;
  poId?: string;
  date: string;
  dueDate: string;
  currency: Currency;
  amount: number; // THB equivalent
  paid: number;
  status: InvoiceStatus;
}

/* ---------- Sourcing ---------- */

export interface SupplierOption {
  supplierId: string;
  currency: Currency;
  unitPrice: number; // in currency
  moq: number;
  leadTimeDays: number;
  paymentTerm: string;
  sampleCost: number; // THB
  productionDays: number;
  shippingCostTHB: number;
  landedUnitCostTHB: number;
  qualityScore: number;
  recommended?: boolean;
}

export type SourcingStatus =
  | "New Request"
  | "Supplier RFQ"
  | "Comparing"
  | "Supplier Selected"
  | "Quotation Sent"
  | "Customer PO"
  | "In Procurement"
  | "Completed";

export interface SourcingProject {
  id: string;
  number: string;
  customerId: string;
  title: string;
  requirement: string[];
  qty: number;
  targetPrice: number;
  requiredDate: string;
  status: SourcingStatus;
  options: SupplierOption[];
  selectedSupplierId?: string;
  quotationId?: string;
  salesperson: string;
  attachments: string[];
}

/* ---------- Approvals / misc ---------- */

export type ApprovalStatus = "Pending" | "Approved" | "Rejected";

export interface ApprovalRequest {
  id: string;
  type: string;
  title: string;
  requester: string;
  department: string;
  amount?: number;
  reason: string;
  approver: string;
  status: ApprovalStatus;
  date: string;
  refLink?: string;
}

export interface NotificationItem {
  id: string;
  kind: "shipment" | "stock" | "ar" | "approval" | "qc" | "order";
  title: string;
  detail: string;
  time: string;
  read: boolean;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  role: string;
}

export interface Delivery {
  id: string;
  number: string;
  soId: string;
  customerId: string;
  date: string;
  vehicle: string;
  driver: string;
  packages: number;
  weightKg: number;
  status: "Preparing" | "Loaded" | "On Route" | "Delivered" | "Failed";
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  module: string;
  record: string;
  before?: string;
  after?: string;
  time: string;
  ip: string;
}
