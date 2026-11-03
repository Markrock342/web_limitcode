import type { Locale } from "@/lib/i18n/config";

export const ERP_GUIDE_PATH = "/guides/erp-import-distribution";
export const ERP_GUIDE_DATE = "2026-11-03";

const th = {
  tag: "ตัวอย่าง ERP จากระบบเดโม", home: "หน้าแรก", service: "บริการพัฒนาระบบ ERP",
  title: "ตัวอย่าง ERP สำหรับธุรกิจนำเข้าและจัดจำหน่าย B2B",
  description: "ดูตัวอย่างการเชื่อมเอกสารขาย จัดซื้อ และนำเข้าสินค้าใน LCS Enterprise ERP พร้อมภาพหน้าจอจริงจากเดโมและสิ่งที่ควรเตรียมก่อนพัฒนาระบบของธุรกิจคุณ",
  author: "เรียบเรียงโดยทีม LIMIT CODE STUDIO", published: "3 พฤศจิกายน 2569",
  disclosure: "เนื้อหานี้อธิบายระบบเดโมของเรา ใช้ชื่อ เอกสาร และตัวเลขจำลอง เพื่อแสดงวิธีออกแบบขั้นตอนงาน ไม่ใช่กรณีศึกษาของลูกค้าที่เปิดใช้งานจริง",
  flowTitle: "เอกสารแต่ละใบส่งข้อมูลต่อกันอย่างไร",
  flowIntro: "ตัวอย่างเริ่มจากความต้องการสินค้าของลูกค้า เลือกผู้ขาย ออกเอกสารขายและจัดซื้อ แล้วติดตามสินค้าที่กำลังนำเข้า จุดที่ต้องตรวจคือรหัสเอกสาร สินค้า จำนวน และสถานะต้องอ้างถึงกันได้",
  steps: [
    { title: "ระบุสินค้าที่ต้องหา", code: "SRC-2026-00128", body: "เก็บรายละเอียดสินค้าและจำนวน เปรียบเทียบตัวเลือกผู้ขาย และอ้างอิงกลับไปยังเอกสารขาย ในเดโมใช้รายการขวด PET เป็นตัวอย่าง", href: "/demo/erp/sourcing/projects" },
    { title: "ออกใบเสนอราคา", code: "QT-2026-0215", body: "สรุปสินค้า จำนวน ราคา และเงื่อนไขให้ฝ่ายขายตรวจสอบ ก่อนเปลี่ยนเป็นคำสั่งขายโดยอ้างอิงเอกสารเดิม", href: "/demo/erp/sales/quotations" },
    { title: "ติดตามคำสั่งขาย", code: "SO-2026-0342", body: "ดูสถานะคำสั่งขาย สินค้าที่พร้อมขาย และข้อมูลเครดิตตัวอย่าง หน้าจอนี้แสดงว่าสินค้ายังไม่พอและเชื่อมไปยังใบสั่งซื้อกับ Shipment ที่เกี่ยวข้อง", href: "/demo/erp/sales/orders/so1" },
    { title: "จัดซื้อกับผู้ขาย", code: "PO-CN-2026-0188", body: "ใบสั่งซื้อเก็บสกุลเงิน เงื่อนไขชำระเงิน และรายการสินค้า พร้อมอ้างอิงคำสั่งขายและการนำเข้าที่เกี่ยวข้อง", href: "/demo/erp/purchasing/orders/po1" },
    { title: "ติดตามการนำเข้า", code: "SHP-2026-0091", body: "ดูสถานะขนส่ง วันออกและวันถึงที่คาดไว้ เอกสารประกอบ และค่าใช้จ่ายตัวอย่าง โดยย้อนกลับไปยังใบสั่งซื้อได้", href: "/demo/erp/import/shipments/shp1" },
    { title: "ตรวจการจัดสรรต้นทุน", code: "Landed Cost", body: "ลองดูว่าฐานการจัดสรรตามมูลค่า จำนวน น้ำหนัก หรือปริมาตร ทำให้ต้นทุนต่อสินค้าต่างกันอย่างไร วิธีใช้กับข้อมูลจริงต้องตกลงกับผู้ดูแลบัญชีและผู้รับผิดชอบต้นทุนก่อน", href: "/demo/erp/import/landed-cost" },
  ],
  openStep: "ดูหน้าจอเดโม", salesAlt: "ข้อมูลจำลองคำสั่งขาย SO-2026-0342 และเส้นทางเอกสารใน ERP เดโม", salesCaption: "ภาพหน้าจอเดโม: คำสั่งขายเชื่อมกับใบเสนอราคา ใบสั่งซื้อ และ Shipment",
  stockTitle: "สถานะสินค้าและคำสั่งขายต้องตรวจได้จากข้อมูลเดียวกัน",
  stockBody: "ในหน้าตัวอย่าง คำสั่งขายอยู่สถานะรอสินค้าและมีการเตือนว่าสินค้ายังไม่พอ จุดนี้ช่วยให้ผู้พัฒนากับทีมขายหารือกันได้ชัดว่าควรอนุญาตการจองสินค้าเมื่อใด ต้องอ้างอิง Shipment ใด และให้ใครอนุมัติกรณีเกินวงเงิน ข้อกำหนดเหล่านี้ควรมีตัวอย่างสำหรับทดสอบก่อนเปิดใช้",
  costTitle: "ต้นทุนนำเข้าควรตรวจย้อนกลับได้",
  costBody: "หน้าคำนวณต้นทุนในเดโมแยกราคาสินค้า อัตราแลกเปลี่ยน และรายการค่าใช้จ่ายให้ตรวจทีละส่วน พร้อมแสดงสัดส่วนที่จัดสรรให้แต่ละสินค้า ตัวเลขในภาพใช้สาธิตการทำงานของหน้าจอ ไม่ใช่อัตราภาษี ต้นทุนจริง หรือคำแนะนำการบันทึกบัญชี",
  costAlt: "ข้อมูลจำลองหน้าจอคำนวณ Landed Cost และสัดส่วนการจัดสรรใน ERP เดโม", costCaption: "ภาพหน้าจอเดโม: เปรียบเทียบต้นทุนและฐานจัดสรรจากข้อมูลตัวอย่าง",
  checksTitle: "ก่อนใช้กับข้อมูลจริง ต้องตกลงและทดสอบอะไรบ้าง",
  checks: ["ตรวจรหัสสินค้า หน่วยนับ และยอดตั้งต้นให้ตรงกับข้อมูลที่ผู้รับผิดชอบยืนยัน", "กำหนดสิทธิ์ว่าใครเห็นต้นทุน อนุมัติเอกสาร หรือแก้ข้อมูลได้", "ยืนยันสูตรและเงื่อนไขด้านต้นทุน บัญชี และเอกสารกับผู้ดูแลที่เกี่ยวข้อง", "ทดสอบการเชื่อมระบบเดิม และตรวจผลนำเข้าข้อมูลก่อนเปิดให้ทีมใช้", "ตกลงการยืนยันตัวตน ฐานข้อมูล การสำรอง และผู้ดูแลหลังส่งมอบ"],
  limitation: "เดโมนี้ใช้ข้อมูลจำลองและสถานะในเบราว์เซอร์ บางปุ่มแสดงผลเพื่อสาธิตขั้นตอน การใช้งานจริงยังต้องพัฒนาและทดสอบตามขอบเขตที่ตกลงกัน",
  prepareTitle: "อยากได้ ERP แบบนี้ ควรเริ่มจากอะไร", prepareBody: "เริ่มจากขั้นตอนที่อยากแก้ก่อนหนึ่งส่วน พร้อมตัวอย่างเอกสารที่ลบข้อมูลสำคัญแล้ว ใช้เช็กลิสต์ด้านล่างช่วยรวบรวมผู้ใช้ ข้อมูลเดิม การเชื่อมต่อ และเงื่อนไขตรวจรับ จากนั้นจึงประเมินขอบเขต ราคา และระยะเวลา",
  download: "ดาวน์โหลดเช็กลิสต์ ERP (.csv)", consult: "ปรึกษาฟรี", serviceLink: "ดูรายละเอียดบริการและการประเมินราคา ERP",
};

export const erpGuideCopy: Record<Locale, typeof th> = {
  th,
  en: {
    tag: "An ERP demo walkthrough", home: "Home", service: "Custom ERP development", title: "ERP example for B2B import and distribution", description: "Follow sales, purchasing, and import documents in LCS Enterprise ERP, with screenshots from our own demo and a checklist for planning your system.", author: "Prepared by the LIMIT CODE STUDIO team", published: "3 November 2026",
    disclosure: "This walkthrough uses our demo with fictional names, records, and figures. It illustrates workflow design and is not a case study of a live client installation.", flowTitle: "How the documents connect", flowIntro: "Start with a product requirement, compare suppliers, prepare sales and purchasing documents, and track incoming stock. Document IDs, SKUs, quantities, and status need traceable references.",
    steps: [
      { title: "Define the sourcing requirement", code: "SRC-2026-00128", body: "Record product requirements and quantities, compare supplier options, and link the chosen option to the sales process. The example uses a PET bottle item.", href: "/demo/erp/sourcing/projects" },
      { title: "Prepare the quotation", code: "QT-2026-0215", body: "Review items, quantities, prices, and terms before converting to a sales order referencing the original quotation.", href: "/demo/erp/sales/quotations" },
      { title: "Track the sales order", code: "SO-2026-0342", body: "Review the order, available stock, and sample credit information. The screen shows insufficient stock and references the purchase order and shipment.", href: "/demo/erp/sales/orders/so1" },
      { title: "Create the purchase order", code: "PO-CN-2026-0188", body: "Keep currency, payment terms, and items connected to the related sales order and import shipment.", href: "/demo/erp/purchasing/orders/po1" },
      { title: "Track the import shipment", code: "SHP-2026-0091", body: "Review transport status, expected dates, supporting documents, and sample costs, with a reference back to purchasing.", href: "/demo/erp/import/shipments/shp1" },
      { title: "Review cost allocation", code: "Landed Cost", body: "Explore value, quantity, weight, and volume allocation bases. Real accounting treatment must be agreed with the responsible accounting and costing team.", href: "/demo/erp/import/landed-cost" },
    ],
    openStep: "View demo screen", salesAlt: "Sample sales order SO-2026-0342 and related ERP document flow", salesCaption: "Demo screenshot: sales order linked to quotation, purchasing, and shipment", stockTitle: "Stock and order status need a shared reference", stockBody: "The example order is awaiting stock and shows an availability warning. This gives sales and development teams a concrete way to agree reservation rules, shipment references, and credit approvals, then turn those rules into acceptance tests.", costTitle: "Import costs should be traceable", costBody: "The demo calculator separates item cost, exchange rate, and additional charges, then displays the share allocated to each SKU. Figures illustrate the interface; they are not tax rates, actual business costs, or accounting advice.", costAlt: "Sample landed-cost allocation screen from the ERP demo", costCaption: "Demo screenshot: costs and allocation bases using sample data",
    checksTitle: "What to agree before using real data", checks: ["Validate product IDs, units, and opening balances with responsible users", "Define who may view costs, approve documents, or edit records", "Confirm costing, accounting, and document rules with the relevant owners", "Test integrations and reconcile imported data before launch", "Agree authentication, database, backups, and ongoing ownership"], limitation: "This demo uses sample records and browser state. Some actions illustrate a workflow. Production use requires development and testing against an agreed scope.", prepareTitle: "How to start a similar ERP project", prepareBody: "Choose one workflow to improve and prepare redacted document samples. Use the checklist to capture users, data, integrations, and acceptance criteria before estimating scope, cost, and delivery.", download: "Download ERP checklist (.csv)", consult: "Free consultation", serviceLink: "See ERP development and project assessment",
  },
  zh: {
    tag: "ERP 演示流程说明", home: "首页", service: "ERP 定制开发", title: "B2B 进口与分销 ERP 流程示例", description: "通过自有演示系统的真实界面截图，了解销售、采购、进口单据之间的联系，以及规划 ERP 前应准备的资料。", author: "由 LIMIT CODE STUDIO 团队整理", published: "2026 年 11 月 3 日", disclosure: "本文使用我们演示系统中的虚构名称、单据和数字说明流程设计，并非真实客户上线案例。", flowTitle: "单据之间如何连接", flowIntro: "从商品需求、供应商比较到销售、采购和进口跟踪，重点是单据编号、商品编码、数量和状态能够相互追溯。",
    steps: [
      { title: "明确采购需求", code: "SRC-2026-00128", body: "记录商品要求和数量，比较供应商方案，并关联销售流程。示例使用 PET 瓶商品。", href: "/demo/erp/sourcing/projects" },
      { title: "准备报价", code: "QT-2026-0215", body: "核对商品、数量、价格和条件，再转换为关联原报价的销售单。", href: "/demo/erp/sales/quotations" },
      { title: "跟踪销售单", code: "SO-2026-0342", body: "查看订单、可用库存和模拟信用信息。界面提示库存不足，并关联采购单和运输批次。", href: "/demo/erp/sales/orders/so1" },
      { title: "创建采购单", code: "PO-CN-2026-0188", body: "记录币种、付款条件和商品，关联相关销售单与进口批次。", href: "/demo/erp/purchasing/orders/po1" },
      { title: "跟踪进口批次", code: "SHP-2026-0091", body: "查看运输状态、预计日期、文件与模拟费用，并可追溯采购单。", href: "/demo/erp/import/shipments/shp1" },
      { title: "检查成本分摊", code: "Landed Cost", body: "比较按金额、数量、重量或体积的分摊。真实核算规则需与会计及成本负责人确认。", href: "/demo/erp/import/landed-cost" },
    ],
    openStep: "查看演示界面", salesAlt: "模拟销售单 SO-2026-0342 及相关 ERP 单据流程", salesCaption: "演示截图：销售单连接报价、采购与运输批次", stockTitle: "库存与订单状态需要统一依据", stockBody: "示例订单处于等待库存状态，并提示可用数量不足。团队可据此明确预留规则、运输批次引用及信用审批，再将规则转为验收测试。", costTitle: "进口成本应能追溯", costBody: "演示界面分开展示商品金额、汇率和附加费用，再显示各商品的分摊比例。数字仅说明界面功能，不代表税率、实际企业成本或会计建议。", costAlt: "ERP 演示系统中的模拟到岸成本分摊界面", costCaption: "演示截图：使用模拟数据比较成本与分摊依据",
    checksTitle: "使用真实数据前需要确认什么", checks: ["由负责人确认商品编码、单位和期初余额", "明确谁能查看成本、审批或修改数据", "与相关负责人确认成本、会计和单据规则", "上线前测试集成并核对导入数据", "约定身份验证、数据库、备份和后续维护责任"], limitation: "本演示使用模拟数据及浏览器内状态，部分按钮仅演示流程。生产使用仍需按约定范围开发与测试。", prepareTitle: "如何开始类似的 ERP 项目", prepareBody: "先选择一个需要改善的流程，并准备删除敏感信息后的单据样本。使用清单整理用户、数据、集成和验收要求，再评估范围、费用与周期。", download: "下载 ERP 清单 (.csv)", consult: "免费咨询", serviceLink: "了解 ERP 开发和项目评估",
  },
};
