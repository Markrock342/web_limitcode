"use client";

/* =========================================================
   ERP Store — mock in-memory state + business actions
   ออกแบบให้เปลี่ยนเป็น API layer จริงได้ภายหลัง
   (ทุก action คือจุดที่จะกลายเป็น API call)
   ========================================================= */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  ApprovalRequest,
  ARInvoice,
  Currency,
  Customer,
  Delivery,
  NotificationItem,
  Opportunity,
  PipelineStage,
  Product,
  PurchaseOrder,
  Quotation,
  SalesOrder,
  Shipment,
  SourcingProject,
  SoStatus,
} from "@/components/demos/erp/types/erp";
import { SHIPMENT_FLOW } from "@/components/demos/erp/types/erp";
import { CUSTOMERS, PRODUCTS } from "@/components/demos/erp/data/masters";
import {
  AP_INVOICES,
  AR_INVOICES,
  DELIVERIES,
  PURCHASE_ORDERS,
  QUOTATIONS,
  SALES_ORDERS,
  SHIPMENTS,
  SOURCING_PROJECTS,
} from "@/components/demos/erp/data/docs";
import { APPROVALS, NOTIFICATIONS, OPPORTUNITIES } from "@/components/demos/erp/data/ops";
import { docGrand, TODAY } from "@/components/demos/erp/lib/format";
import type { UiLanguage } from "@/components/demos/erp/lib/i18n";

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

interface Toast {
  id: number;
  msg: string;
  type: "success" | "info" | "warning";
}

interface ErpState {
  customers: Customer[];
  products: Product[];
  opportunities: Opportunity[];
  quotations: Quotation[];
  salesOrders: SalesOrder[];
  purchaseOrders: PurchaseOrder[];
  shipments: Shipment[];
  arInvoices: ARInvoice[];
  apInvoices: typeof AP_INVOICES;
  sourcingProjects: SourcingProject[];
  approvals: ApprovalRequest[];
  notifications: NotificationItem[];
  deliveries: Delivery[];
  /* ui */
  currency: Currency;
  branch: string;
  warehouse: string;
  language: UiLanguage;
  toasts: Toast[];
}

interface ErpActions {
  toast: (msg: string, type?: Toast["type"]) => void;
  dismissToast: (id: number) => void;
  setCurrency: (c: Currency) => void;
  setBranch: (b: string) => void;
  setWarehouse: (w: string) => void;
  setLanguage: (language: UiLanguage) => void;
  resetDemo: () => void;
  markNotificationsRead: () => void;

  addCustomer: (c: Pick<Customer, "name" | "taxId" | "industry" | "contact" | "phone" | "paymentTermDays" | "creditLimit">) => void;
  moveOpportunity: (id: string, stage: PipelineStage) => void;
  convertQuotation: (qId: string) => string | undefined;
  approvePO: (poId: string) => void;
  advanceShipment: (shpId: string) => void;
  receiveShipment: (shpId: string) => void;
  reserveSO: (soId: string) => boolean;
  advanceSO: (soId: string) => void;
  issueInvoice: (soId: string) => void;
  recordPayment: (invId: string) => void;
  decideApproval: (id: string, approve: boolean) => void;
  selectSourcingSupplier: (projectId: string, supplierId: string) => void;
  sendSourcingQuotation: (projectId: string) => void;

  outstandingAR: (customerId: string) => number;
}

const seed = (): Omit<ErpState, "currency" | "branch" | "warehouse" | "language" | "toasts"> => ({
  customers: clone(CUSTOMERS),
  products: clone(PRODUCTS),
  opportunities: clone(OPPORTUNITIES),
  quotations: clone(QUOTATIONS),
  salesOrders: clone(SALES_ORDERS),
  purchaseOrders: clone(PURCHASE_ORDERS),
  shipments: clone(SHIPMENTS),
  arInvoices: clone(AR_INVOICES),
  apInvoices: clone(AP_INVOICES),
  sourcingProjects: clone(SOURCING_PROJECTS),
  approvals: clone(APPROVALS),
  notifications: clone(NOTIFICATIONS),
  deliveries: clone(DELIVERIES),
});

const ErpContext = createContext<(ErpState & ErpActions) | null>(null);

let toastSeq = 1;

export function ErpProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ErpState>(() => ({
    ...seed(),
    currency: "THB",
    branch: "สำนักงานใหญ่ (กรุงเทพฯ)",
    warehouse: "Bangkok WH",
    language: "th",
    toasts: [],
  }));

  useEffect(() => {
    const saved = window.localStorage.getItem("lcs-erp-language");
    if (saved === "en" || saved === "th") {
      queueMicrotask(() => setState((current) => ({ ...current, language: saved })));
    }
  }, []);

  const toast = useCallback((msg: string, type: Toast["type"] = "success") => {
    const id = toastSeq++;
    setState((s) => ({ ...s, toasts: [...s.toasts, { id, msg, type }] }));
    setTimeout(() => {
      setState((s) => ({ ...s, toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3800);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setState((s) => ({ ...s, toasts: s.toasts.filter((t) => t.id !== id) }));
  }, []);

  const outstandingAR = useCallback(
    (customerId: string) =>
      state.arInvoices
        .filter((i) => i.customerId === customerId && i.status !== "Paid")
        .reduce((s, i) => s + (i.amount - i.paid), 0),
    [state.arInvoices],
  );

  const actions: ErpActions = useMemo(
    () => ({
      toast,
      dismissToast,
      outstandingAR,
      setCurrency: (currency) => setState((s) => ({ ...s, currency })),
      setBranch: (branch) => setState((s) => ({ ...s, branch })),
      setWarehouse: (warehouse) => setState((s) => ({ ...s, warehouse })),
      setLanguage: (language) => {
        window.localStorage.setItem("lcs-erp-language", language);
        setState((s) => ({ ...s, language }));
      },

      resetDemo: () => {
        setState((s) => ({ ...s, ...seed() }));
        toast("รีเซ็ต Demo กลับสู่ข้อมูลตั้งต้นแล้ว", "info");
      },

      markNotificationsRead: () =>
        setState((s) => ({
          ...s,
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),

      addCustomer: (c) => {
        setState((s) => {
          const id = `c${s.customers.length + 1}_${Date.now() % 1000}`;
          const code = `CUS-${String(s.customers.length + 1).padStart(4, "0")}`;
          const customer: Customer = {
            id,
            code,
            name: c.name,
            taxId: c.taxId || "-",
            branch: "สำนักงานใหญ่",
            industry: c.industry || "-",
            group: "Wholesale",
            salesperson: "วิชัย ส.",
            priceList: "Wholesale B",
            paymentTermDays: c.paymentTermDays,
            creditLimit: c.creditLimit,
            contact: c.contact,
            phone: c.phone,
            email: "-",
            billingAddress: "-",
            shippingAddress: "-",
            since: TODAY,
          };
          return { ...s, customers: [customer, ...s.customers] };
        });
        toast(`สร้างลูกค้าใหม่ "${c.name}" แล้ว`);
      },

      moveOpportunity: (id, stage) => {
        setState((s) => ({
          ...s,
          opportunities: s.opportunities.map((o) => (o.id === id ? { ...o, stage } : o)),
        }));
        toast(`ย้าย Opportunity ไปขั้น "${stage}"`);
      },

      convertQuotation: (qId) => {
        let newSoId: string | undefined;
        setState((s) => {
          const q = s.quotations.find((x) => x.id === qId);
          if (!q || q.status === "Converted") return s;
          newSoId = `so_new_${Date.now() % 100000}`;
          const soNumber = `SO-2026-0${360 + s.salesOrders.length}`;
          const so: SalesOrder = {
            id: newSoId,
            number: soNumber,
            customerId: q.customerId,
            quotationId: q.id,
            date: TODAY,
            requiredDate: q.validUntil,
            status: "Confirmed",
            warehouse: "Bangkok WH",
            vatPct: q.vatPct,
            items: clone(q.items),
          };
          return {
            ...s,
            salesOrders: [so, ...s.salesOrders],
            quotations: s.quotations.map((x) =>
              x.id === qId ? { ...x, status: "Converted" as const, soId: newSoId } : x,
            ),
          };
        });
        if (newSoId) toast("แปลง Quotation เป็น Sales Order แล้ว");
        return newSoId;
      },

      approvePO: (poId) => {
        setState((s) => ({
          ...s,
          purchaseOrders: s.purchaseOrders.map((p) =>
            p.id === poId && (p.status === "Pending Approval" || p.status === "Draft")
              ? { ...p, status: "Approved" as const }
              : p,
          ),
        }));
        toast("อนุมัติ Purchase Order แล้ว");
      },

      advanceShipment: (shpId) => {
        setState((s) => {
          const shp = s.shipments.find((x) => x.id === shpId);
          if (!shp) return s;
          const idx = SHIPMENT_FLOW.indexOf(shp.status);
          if (idx < 0 || idx >= SHIPMENT_FLOW.length - 2) return s; // ขั้นสุดท้ายต้องกด "รับเข้าโกดัง"
          const next = SHIPMENT_FLOW[idx + 1];
          return {
            ...s,
            shipments: s.shipments.map((x) => (x.id === shpId ? { ...x, status: next } : x)),
          };
        });
        const shp = state.shipments.find((x) => x.id === shpId);
        if (shp) {
          const idx = SHIPMENT_FLOW.indexOf(shp.status);
          if (idx >= 0 && idx < SHIPMENT_FLOW.length - 2)
            toast(`อัปเดตสถานะ ${shp.number} → "${SHIPMENT_FLOW[idx + 1]}"`, "info");
        }
      },

      receiveShipment: (shpId) => {
        setState((s) => {
          const shp = s.shipments.find((x) => x.id === shpId);
          if (!shp || shp.received) return s;
          const po = s.purchaseOrders.find((p) => p.id === shp.poId);
          const products = s.products.map((prod) => {
            const line = po?.items.find((it) => it.productId === prod.id);
            if (!line) return prod;
            return {
              ...prod,
              stock: prod.stock.map((w, i) =>
                i === 0
                  ? {
                      ...w,
                      onHand: w.onHand + line.qty,
                      incoming: Math.max(0, w.incoming - line.qty),
                    }
                  : w,
              ),
            };
          });
          return {
            ...s,
            products,
            shipments: s.shipments.map((x) =>
              x.id === shpId
                ? { ...x, status: "Completed" as const, received: true, qcResult: "Pass" as const }
                : x,
            ),
            purchaseOrders: s.purchaseOrders.map((p) =>
              p.id === shp.poId ? { ...p, status: "Received" as const } : p,
            ),
          };
        });
        toast("รับสินค้าเข้าโกดัง + QC ผ่าน — สต็อกอัปเดตแล้ว");
      },

      reserveSO: (soId) => {
        let ok = false;
        setState((s) => {
          const so = s.salesOrders.find((x) => x.id === soId);
          if (!so) return s;
          const insufficient = so.items.some((it) => {
            const p = s.products.find((pp) => pp.id === it.productId);
            if (!p) return false;
            const wh = p.stock[0];
            return wh.onHand - wh.reserved < it.qty;
          });
          if (insufficient) return s;
          ok = true;
          const products = s.products.map((prod) => {
            const line = so.items.find((it) => it.productId === prod.id);
            if (!line) return prod;
            return {
              ...prod,
              stock: prod.stock.map((w, i) =>
                i === 0 ? { ...w, reserved: w.reserved + line.qty } : w,
              ),
            };
          });
          return {
            ...s,
            products,
            salesOrders: s.salesOrders.map((x) =>
              x.id === soId ? { ...x, status: "Reserved" as const } : x,
            ),
          };
        });
        if (ok) toast("จองสต็อก (Reservation) ให้ Sales Order แล้ว");
        else toast("สต็อกไม่พอสำหรับการจอง — รอสินค้าเข้า", "warning");
        return ok;
      },

      advanceSO: (soId) => {
        const flow: SoStatus[] = ["Reserved", "Picking", "Packing", "Ready to Ship", "Delivered"];
        setState((s) => {
          const so = s.salesOrders.find((x) => x.id === soId);
          if (!so) return s;
          const idx = flow.indexOf(so.status);
          if (idx < 0 || idx === flow.length - 1) return s;
          const next = flow[idx + 1];

          let deliveries = s.deliveries;
          let products = s.products;
          let deliveryId = so.deliveryId;

          if (next === "Delivered") {
            deliveryId = `dl_new_${Date.now() % 100000}`;
            deliveries = [
              {
                id: deliveryId,
                number: `DO-2026-0${420 + s.deliveries.length}`,
                soId: so.id,
                customerId: so.customerId,
                date: TODAY,
                vehicle: "6 ล้อ ฮีโน่ (83-4412 กทม.)",
                driver: "สมศักดิ์ ใจดี",
                packages: Math.ceil(so.items.reduce((t, i) => t + i.qty, 0) / 500),
                weightKg: Math.round(so.items.reduce((t, i) => t + i.qty * 0.03, 0)),
                status: "Delivered",
              },
              ...s.deliveries,
            ];
            products = s.products.map((prod) => {
              const line = so.items.find((it) => it.productId === prod.id);
              if (!line) return prod;
              return {
                ...prod,
                stock: prod.stock.map((w, i) =>
                  i === 0
                    ? {
                        ...w,
                        onHand: Math.max(0, w.onHand - line.qty),
                        reserved: Math.max(0, w.reserved - line.qty),
                      }
                    : w,
                ),
              };
            });
          }

          return {
            ...s,
            products,
            deliveries,
            salesOrders: s.salesOrders.map((x) =>
              x.id === soId ? { ...x, status: next, deliveryId } : x,
            ),
          };
        });
        toast("อัปเดตสถานะ Sales Order แล้ว", "info");
      },

      issueInvoice: (soId) => {
        setState((s) => {
          const so = s.salesOrders.find((x) => x.id === soId);
          if (!so || so.invoiceId) return s;
          const cust = s.customers.find((c) => c.id === so.customerId);
          const credit = cust?.paymentTermDays ?? 30;
          const due = new Date(TODAY + "T00:00:00");
          due.setDate(due.getDate() + credit);
          const invId = `inv_new_${Date.now() % 100000}`;
          const inv: ARInvoice = {
            id: invId,
            number: `INV-2026-0${900 + s.arInvoices.length}`,
            customerId: so.customerId,
            soId: so.id,
            date: TODAY,
            dueDate: due.toISOString().slice(0, 10),
            amount: Math.round(docGrand(so.items, so.vatPct)),
            paid: 0,
            status: "Open",
          };
          return {
            ...s,
            arInvoices: [inv, ...s.arInvoices],
            salesOrders: s.salesOrders.map((x) =>
              x.id === soId ? { ...x, status: "Invoiced" as const, invoiceId: invId } : x,
            ),
          };
        });
        toast("ออกใบแจ้งหนี้ (Invoice) แล้ว — เข้าสู่ Accounts Receivable");
      },

      recordPayment: (invId) => {
        setState((s) => {
          const inv = s.arInvoices.find((x) => x.id === invId);
          if (!inv || inv.status === "Paid") return s;
          return {
            ...s,
            arInvoices: s.arInvoices.map((x) =>
              x.id === invId ? { ...x, paid: x.amount, status: "Paid" as const } : x,
            ),
            salesOrders: s.salesOrders.map((x) =>
              x.invoiceId === invId ? { ...x, status: "Paid" as const } : x,
            ),
          };
        });
        toast("บันทึกรับชำระเงินแล้ว — AR อัปเดต");
      },

      decideApproval: (id, approve) => {
        setState((s) => {
          const apv = s.approvals.find((a) => a.id === id);
          let purchaseOrders = s.purchaseOrders;
          if (approve && apv?.refLink === "/demo/erp/purchasing/orders/po4") {
            purchaseOrders = s.purchaseOrders.map((p) =>
              p.id === "po4" ? { ...p, status: "Approved" as const } : p,
            );
          }
          return {
            ...s,
            purchaseOrders,
            approvals: s.approvals.map((a) =>
              a.id === id
                ? { ...a, status: approve ? ("Approved" as const) : ("Rejected" as const) }
                : a,
            ),
          };
        });
        toast(approve ? "อนุมัติรายการแล้ว" : "ปฏิเสธรายการแล้ว", approve ? "success" : "warning");
      },

      selectSourcingSupplier: (projectId, supplierId) => {
        setState((s) => ({
          ...s,
          sourcingProjects: s.sourcingProjects.map((p) =>
            p.id === projectId
              ? { ...p, selectedSupplierId: supplierId, status: "Supplier Selected" as const }
              : p,
          ),
        }));
        toast("เลือกซัพพลายเออร์สำหรับโปรเจกต์ Sourcing แล้ว");
      },

      sendSourcingQuotation: (projectId) => {
        setState((s) => {
          const proj = s.sourcingProjects.find((p) => p.id === projectId);
          if (!proj || proj.quotationId) return s;
          const qId = `q_new_${Date.now() % 100000}`;
          const q: Quotation = {
            id: qId,
            number: `QT-2026-0${245 + s.quotations.length}`,
            customerId: proj.customerId,
            date: TODAY,
            validUntil: proj.requiredDate,
            salesperson: proj.salesperson,
            paymentTerms: "Credit 30 วัน",
            deliveryTerms: "ส่งถึงที่ลูกค้า",
            vatPct: 7,
            status: "Sent",
            sourcingId: proj.id,
            items: [
              {
                sku: "CUSTOM",
                name: proj.title,
                qty: proj.qty,
                unit: "PCS",
                unitPrice: proj.targetPrice,
                cost:
                  proj.options.find((o) => o.supplierId === proj.selectedSupplierId)
                    ?.landedUnitCostTHB ?? 0,
              },
            ],
          };
          return {
            ...s,
            quotations: [q, ...s.quotations],
            sourcingProjects: s.sourcingProjects.map((p) =>
              p.id === projectId
                ? { ...p, quotationId: qId, status: "Quotation Sent" as const }
                : p,
            ),
          };
        });
        toast("สร้างและส่ง Quotation จากโปรเจกต์ Sourcing แล้ว");
      },
    }),
    [toast, dismissToast, outstandingAR, state.shipments],
  );

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);

  return <ErpContext.Provider value={value}>{children}</ErpContext.Provider>;
}

export function useErp() {
  const ctx = useContext(ErpContext);
  if (!ctx) throw new Error("useErp must be used within ErpProvider");
  return ctx;
}
