/* =========================================================
   Navigation architecture — ครบทั้ง 16 กลุ่มตั้งแต่ต้น
   เมนูที่เป็น concept เดียวกันชี้ไปหน้าจริงร่วมกัน (ERP UX)
   ========================================================= */

export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  icon: string; // lucide key — map ใน Sidebar
  href?: string; // group ที่เป็นหน้าเดียว
  items?: NavItem[];
}

export const NAV: NavGroup[] = [
  { label: "Dashboard", icon: "gauge", href: "/demo/erp/dashboard" },
  {
    label: "CRM",
    icon: "users",
    items: [
      { label: "Sales Pipeline", href: "/demo/erp/crm/pipeline" },
      { label: "Leads", href: "/demo/erp/crm/leads" },
      { label: "Customers", href: "/demo/erp/crm/customers" },
      { label: "Contacts", href: "/demo/erp/crm/contacts" },
      { label: "Opportunities", href: "/demo/erp/crm/pipeline" },
      { label: "Activities", href: "/demo/erp/crm/activities" },
      { label: "Follow-ups", href: "/demo/erp/crm/activities" },
    ],
  },
  {
    label: "Sales",
    icon: "receipt",
    items: [
      { label: "Quotations", href: "/demo/erp/sales/quotations" },
      { label: "Sales Orders", href: "/demo/erp/sales/orders" },
      { label: "Customer PO", href: "/demo/erp/sales/customer-po" },
      { label: "Price Lists", href: "/demo/erp/sales/price-lists" },
      { label: "Delivery Orders", href: "/demo/erp/delivery/orders" },
      { label: "Sales Returns", href: "/demo/erp/sales/returns" },
      { label: "Invoices", href: "/demo/erp/finance/ar" },
      { label: "Credit Notes", href: "/demo/erp/sales/credit-notes" },
    ],
  },
  {
    label: "Sourcing",
    icon: "search",
    items: [
      { label: "Sourcing Projects", href: "/demo/erp/sourcing/projects" },
      { label: "Sourcing Requests", href: "/demo/erp/sourcing/projects" },
      { label: "Supplier Discovery", href: "/demo/erp/sourcing/suppliers" },
      { label: "RFQ", href: "/demo/erp/sourcing/rfq" },
      { label: "Price Comparison", href: "/demo/erp/sourcing/projects" },
      { label: "Samples", href: "/demo/erp/sourcing/samples" },
    ],
  },
  {
    label: "Purchasing",
    icon: "shopping-cart",
    items: [
      { label: "Purchase Orders", href: "/demo/erp/purchasing/orders" },
      { label: "Purchase Requests", href: "/demo/erp/purchasing/requests" },
      { label: "Purchase Approval", href: "/demo/erp/approvals" },
      { label: "Goods Receiving", href: "/demo/erp/warehouse/receiving" },
      { label: "Suppliers", href: "/demo/erp/purchasing/suppliers" },
    ],
  },
  {
    label: "Import",
    icon: "ship",
    items: [
      { label: "Import Control Tower", href: "/demo/erp/import" },
      { label: "Shipments", href: "/demo/erp/import" },
      { label: "Landed Cost", href: "/demo/erp/import/landed-cost" },
      { label: "Import Documents", href: "/demo/erp/documents" },
      { label: "Customs", href: "/demo/erp/import/customs" },
      { label: "Shipping Schedule", href: "/demo/erp/import/schedule" },
    ],
  },
  {
    label: "Inventory",
    icon: "boxes",
    items: [
      { label: "Stock Overview", href: "/demo/erp/inventory" },
      { label: "Products / SKU", href: "/demo/erp/inventory/products" },
      { label: "Stock Movement", href: "/demo/erp/inventory/movement" },
      { label: "Stock Reservation", href: "/demo/erp/inventory/reservation" },
      { label: "Reorder", href: "/demo/erp/inventory/reorder" },
      { label: "Stock Count", href: "/demo/erp/inventory/count" },
    ],
  },
  {
    label: "Warehouse",
    icon: "warehouse",
    items: [
      { label: "Receiving", href: "/demo/erp/warehouse/receiving" },
      { label: "Picking", href: "/demo/erp/warehouse/picking" },
      { label: "Packing", href: "/demo/erp/warehouse/picking" },
      { label: "Warehouse Tasks", href: "/demo/erp/warehouse/tasks" },
    ],
  },
  {
    label: "Delivery",
    icon: "truck",
    items: [
      { label: "Delivery Orders", href: "/demo/erp/delivery/orders" },
      { label: "Delivery Status", href: "/demo/erp/delivery/orders" },
      { label: "Shipping Providers", href: "/demo/erp/delivery/providers" },
    ],
  },
  {
    label: "Finance",
    icon: "wallet",
    items: [
      { label: "Accounts Receivable", href: "/demo/erp/finance/ar" },
      { label: "Accounts Payable", href: "/demo/erp/finance/ap" },
      { label: "Credit Control", href: "/demo/erp/finance/credit" },
      { label: "Collections", href: "/demo/erp/finance/ar" },
      { label: "Expenses", href: "/demo/erp/finance/expenses" },
      { label: "Cash Flow", href: "/demo/erp/finance/cashflow" },
      { label: "Bank Accounts", href: "/demo/erp/finance/banks" },
    ],
  },
  {
    label: "Accounting",
    icon: "calculator",
    items: [
      { label: "Chart of Accounts", href: "/demo/erp/accounting/coa" },
      { label: "Journal Entries", href: "/demo/erp/accounting/journal" },
      { label: "VAT / ภาษีขาย-ซื้อ", href: "/demo/erp/accounting/vat" },
      { label: "Withholding Tax", href: "/demo/erp/accounting/wht" },
      { label: "Trial Balance", href: "/demo/erp/accounting/trial-balance" },
      { label: "Profit & Loss", href: "/demo/erp/accounting/pnl" },
    ],
  },
  {
    label: "Reports",
    icon: "bar-chart",
    href: "/demo/erp/reports",
  },
  {
    label: "Approvals",
    icon: "check-circle",
    href: "/demo/erp/approvals",
  },
  {
    label: "Documents",
    icon: "folder",
    href: "/demo/erp/documents",
  },
  {
    label: "Organization",
    icon: "building",
    items: [
      { label: "Employees", href: "/demo/erp/organization/employees" },
      { label: "Departments", href: "/demo/erp/organization/departments" },
      { label: "Roles & Permissions", href: "/demo/erp/organization/roles" },
    ],
  },
  {
    label: "Settings",
    icon: "settings",
    items: [
      { label: "Company / Branch", href: "/demo/erp/settings/company" },
      { label: "Currency & Tax", href: "/demo/erp/settings/currency" },
      { label: "Document Number", href: "/demo/erp/settings/doc-number" },
      { label: "Users", href: "/demo/erp/organization/employees" },
      { label: "Audit Logs", href: "/demo/erp/settings/audit" },
    ],
  },
];

/** เมนูลัดสำหรับ Command Palette */
export const QUICK_ACTIONS = [
  { label: "New Quotation", href: "/demo/erp/sales/quotations?new=1" },
  { label: "New Sales Order", href: "/demo/erp/sales/orders" },
  { label: "New Purchase Order", href: "/demo/erp/purchasing/orders" },
  { label: "New Customer", href: "/demo/erp/crm/customers?new=1" },
  { label: "New Sourcing Request", href: "/demo/erp/sourcing/projects" },
  { label: "Import Control Tower", href: "/demo/erp/import" },
  { label: "Landed Cost Calculator", href: "/demo/erp/import/landed-cost" },
];
