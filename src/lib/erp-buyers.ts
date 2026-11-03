import type { Locale } from "@/lib/i18n/config";

export const ERP_CHECKLIST_PATH = "/resources/erp-project-checklist.csv";

const th = {
  title: "ERP สำเร็จรูปหรือพัฒนาเฉพาะ ควรเลือกแบบไหน",
  intro: "เริ่มจากขั้นตอนที่ทีมต้องใช้จริง แล้วลองเทียบทั้งสองทางเลือกด้วยข้อมูลชุดเดียวกัน ประเด็นสำคัญคือระบบรองรับงานได้แค่ไหนและมีค่าใช้จ่ายอะไรตลอดการใช้งาน",
  criterion: "สิ่งที่ควรตรวจ", packaged: "ERP สำเร็จรูป", custom: "ERP พัฒนาเฉพาะ",
  rows: [
    { criterion: "ขั้นตอนงาน", packaged: "ทดลองขั้นตอนมาตรฐาน และระบุส่วนที่ต้องตั้งค่าหรือซื้อส่วนเสริม", custom: "กำหนดหน้าจอ ลำดับอนุมัติ และเงื่อนไขเฉพาะเป็นขอบเขตพัฒนา" },
    { criterion: "การเชื่อมระบบเดิม", packaged: "ตรวจ API สิทธิ์ใช้งาน และข้อจำกัดของส่วนเชื่อมต่อ", custom: "ตรวจ API และตัวอย่างข้อมูลของระบบปลายทางก่อนยืนยันว่าเชื่อมได้" },
    { criterion: "ค่าใช้จ่าย", packaged: "ตรวจค่าผู้ใช้ โมดูล ส่วนเสริม ติดตั้ง ย้ายข้อมูล และดูแลต่อ", custom: "แยกค่าพัฒนา เซิร์ฟเวอร์ บริการภายนอก ย้ายข้อมูล และดูแลต่อ" },
    { criterion: "ข้อมูลและการส่งมอบ", packaged: "ขอดูวิธีส่งออกข้อมูล รูปแบบไฟล์ และค่าใช้จ่ายเมื่อต้องย้ายระบบ", custom: "ระบุสิทธิ์ในซอร์สโค้ด บัญชีระบบ คู่มือ และวิธีส่งออกข้อมูลในข้อตกลง" },
    { criterion: "การเปิดใช้งาน", packaged: "ประเมินเวลาตั้งค่า ย้ายข้อมูล ทดลอง และอบรมตามงานจริง", custom: "แบ่งส่งมอบเป็นช่วง พร้อมเกณฑ์ตรวจรับก่อนขยายโมดูล" },
  ],
  costsTitle: "ขอใบเสนอราคา ERP ให้เทียบกันได้ ต้องแยกอะไรบ้าง",
  costs: ["หน้าจอและเงื่อนไขที่รวมในค่าพัฒนา", "ข้อมูลเดิมที่ต้องจัดรูปแบบและย้ายเข้าระบบ", "การเชื่อมต่อและค่าบริการ API หรือเครื่องมือภายนอก", "เซิร์ฟเวอร์ พื้นที่เก็บข้อมูล และการสำรองข้อมูล", "การทดสอบ อบรม ส่งมอบ และช่วงดูแลหลังเปิดใช้"],
  note: "ราคาตั้งต้นที่เห็นจากแต่ละผู้ให้บริการอาจครอบคลุมคนละส่วน ควรใช้ขอบเขต ผู้ใช้ และข้อมูลชุดเดียวกันในการขอประเมิน ราคาของ LIMIT CODE STUDIO จะยืนยันหลังดูรายละเอียดงาน",
  checklistTitle: "เตรียมข้อมูลก่อนขอประเมิน ERP",
  checklistBody: "ดาวน์โหลดเช็กลิสต์ CSV ภาษาไทย เปิดใน Excel หรือ Google Sheets แล้วกรอกส่วนที่ทราบได้เลย มีตัวอย่างสมมติและหัวข้อเรื่องสิทธิ์ผู้ใช้ ข้อมูลตั้งต้น การเชื่อมต่อ และการตรวจรับงาน",
  download: "ดาวน์โหลดเช็กลิสต์ ERP (.csv)",
  privacy: "ใช้สำเนาเอกสารที่ลบข้อมูลสำคัญแล้ว ไม่ต้องส่งรหัสผ่านหรือ API key เพื่อขอประเมินเบื้องต้น",
  guideTitle: "ดูตัวอย่างการเชื่อมงานใน ERP นำเข้า–จัดจำหน่าย",
  guideBody: "ดูเอกสารคำสั่งขาย ใบสั่งซื้อ Shipment และหน้าคำนวณต้นทุนจากเดโมของเรา พร้อมคำอธิบายทีละขั้น ใช้ข้อมูลจำลองทั้งหมด",
  guideLink: "ดูตัวอย่างขั้นตอน ERP พร้อมภาพหน้าจอ",
};

export const erpBuyerCopy: Record<Locale, typeof th> = {
  th,
  en: {
    title: "Off-the-shelf ERP or custom development?", intro: "Start with the workflow your team needs, and assess both options against the same sample data. Check how well each fits the work and which costs continue after launch.", criterion: "What to check", packaged: "Off-the-shelf ERP", custom: "Custom ERP",
    rows: [
      { criterion: "Workflow", packaged: "Trial the standard process and identify configuration or add-ons.", custom: "Specify screens, approvals, and business rules in the development scope." },
      { criterion: "Existing systems", packaged: "Check API access, licensing, and connector limitations.", custom: "Review target APIs and sample data before confirming integration feasibility." },
      { criterion: "Costs", packaged: "Check users, modules, add-ons, setup, migration, and support.", custom: "Separate development, hosting, external services, migration, and support." },
      { criterion: "Data and handover", packaged: "Check data-export formats and the cost of leaving the system.", custom: "Agree source-code rights, system accounts, documentation, and data exports." },
      { criterion: "Launch", packaged: "Assess setup, migration, trials, and training against actual workflows.", custom: "Agree phased deliveries and acceptance criteria before expanding modules." },
    ],
    costsTitle: "What should an ERP quote separate?", costs: ["Included screens and business rules", "Data cleanup and migration scope", "Integrations and external API or service charges", "Hosting, storage, and backups", "Testing, training, handover, and post-launch support"],
    note: "Starting prices from different providers may cover different work. Compare the same scope, users, and data. LIMIT CODE STUDIO confirms pricing after reviewing project details.",
    checklistTitle: "Prepare for an ERP assessment", checklistBody: "Download the Thai-language CSV checklist for Excel or Google Sheets. It includes sample entries covering user roles, opening data, integrations, and acceptance criteria.", download: "Download ERP checklist (.csv)", privacy: "Share redacted document samples. Passwords and API keys are not needed for an initial assessment.",
    guideTitle: "See an import and distribution ERP workflow", guideBody: "Follow sales orders, purchase orders, shipments, and landed-cost screens from our own demo. All records and figures are sample data.", guideLink: "Explore the illustrated ERP workflow",
  },
  zh: {
    title: "现成 ERP 还是定制开发？", intro: "先明确团队需要的流程，再使用同一组样本数据评估两种方案。重点是流程适配程度，以及上线后的持续费用。", criterion: "评估项目", packaged: "现成 ERP", custom: "定制 ERP",
    rows: [
      { criterion: "业务流程", packaged: "试用标准流程，确认配置和附加模块。", custom: "在开发范围中明确界面、审批及业务规则。" },
      { criterion: "现有系统", packaged: "检查 API 权限、许可和连接器限制。", custom: "先查看目标系统 API 与样本数据，再确认连接可行性。" },
      { criterion: "费用", packaged: "检查用户、模块、附加项、实施、迁移与支持费用。", custom: "区分开发、服务器、外部服务、数据迁移与后续支持。" },
      { criterion: "数据与交付", packaged: "确认数据导出格式，以及迁出时的费用。", custom: "书面约定源码使用权、账号、文档和数据导出方式。" },
      { criterion: "上线", packaged: "按实际流程评估配置、迁移、试用和培训时间。", custom: "分阶段交付，约定验收标准后再扩展模块。" },
    ],
    costsTitle: "ERP 报价应该拆分哪些费用？", costs: ["包含的界面和业务规则", "原始数据整理与迁移范围", "系统集成及外部 API 或服务费用", "服务器、存储和备份", "测试、培训、交付和上线后的支持"],
    note: "各服务商的起步价格可能涵盖不同内容，应使用同样的范围、用户和数据比较。LIMIT CODE STUDIO 会在了解项目后确认报价。",
    checklistTitle: "准备 ERP 评估资料", checklistBody: "下载泰文 CSV 清单，可用 Excel 或 Google Sheets 打开。包含用户角色、初始数据、集成与验收项目的模拟示例。", download: "下载 ERP 清单 (.csv)", privacy: "请提供已删除敏感信息的样本。初步评估无需提供密码或 API 密钥。",
    guideTitle: "查看进口与分销 ERP 流程示例", guideBody: "按步骤查看我们演示系统中的销售单、采购单、运输批次与到岸成本界面。全部记录及数字均为模拟数据。", guideLink: "查看 ERP 流程与界面示例",
  },
};
