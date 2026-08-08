"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Customer } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { Modal, PageHeader } from "@/components/demos/erp/components/erp/ui";

export default function CustomersPage() {
  const erp = useErp();
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    taxId: "",
    industry: "",
    contact: "",
    phone: "",
    paymentTermDays: 30,
    creditLimit: 300_000,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("new=1")) {
      setCreateOpen(true);
      window.history.replaceState(null, "", "/demo/erp/crm/customers");
    }
  }, []);

  const submit = () => {
    if (!form.name.trim()) {
      erp.toast("กรุณากรอกชื่อบริษัทลูกค้า", "warning");
      return;
    }
    erp.addCustomer(form);
    setCreateOpen(false);
    setForm({ name: "", taxId: "", industry: "", contact: "", phone: "", paymentTermDays: 30, creditLimit: 300_000 });
  };

  return (
    <div>
      <PageHeader
        title="Customers"
        subtitle="ฐานข้อมูลลูกค้า B2B พร้อมวงเงินเครดิตและยอดคงค้าง"
        actions={
          <button onClick={() => setCreateOpen(true)} className="btn-primary text-xs">
            + สร้างลูกค้าใหม่
          </button>
        }
      />

      <DataTable<Customer>
        rows={erp.customers}
        searchKeys={(c) => `${c.code} ${c.name} ${c.industry} ${c.salesperson} ${c.contact}`}
        filters={[
          {
            label: "กลุ่มลูกค้า",
            options: ["Key Account", "Wholesale", "Distributor", "B2C / SME"],
            match: (c, v) => c.group === v,
          },
          {
            label: "พนักงานขาย",
            options: ["วิชัย ส.", "อรทัย พ.", "ธนกร ล."],
            match: (c, v) => c.salesperson === v,
          },
        ]}
        onRowClick={(c) => router.push(`/demo/erp/crm/customers/${c.id}`)}
        columns={[
          { key: "code", label: "รหัส", sortable: true, render: (c) => <span className="num font-semibold text-slate-500">{c.code}</span> },
          {
            key: "name",
            label: "ชื่อลูกค้า",
            sortable: true,
            render: (c) => (
              <div>
                <p className="font-semibold text-slate-800">{c.name}</p>
                <p className="text-[11px] text-slate-400">{c.industry}</p>
              </div>
            ),
          },
          { key: "group", label: "กลุ่ม" },
          { key: "salesperson", label: "พนักงานขาย" },
          {
            key: "credit",
            label: "วงเงินเครดิต",
            align: "right",
            sortable: true,
            sortValue: (c) => c.creditLimit,
            render: (c) => <span className="num">{displayMoney(c.creditLimit, erp.currency)}</span>,
          },
          {
            key: "outstanding",
            label: "ยอดคงค้าง",
            align: "right",
            sortable: true,
            sortValue: (c) => erp.outstandingAR(c.id),
            render: (c) => {
              const out = erp.outstandingAR(c.id);
              const over = out > c.creditLimit;
              return (
                <span className={`num font-semibold ${over ? "text-red-600" : "text-slate-700"}`}>
                  {displayMoney(out, erp.currency)}
                </span>
              );
            },
          },
          {
            key: "available",
            label: "เครดิตคงเหลือ",
            align: "right",
            render: (c) => {
              const avail = c.creditLimit - erp.outstandingAR(c.id);
              return (
                <span className={`num font-semibold ${avail < 0 ? "text-red-600" : "text-emerald-600"}`}>
                  {displayMoney(avail, erp.currency)}
                </span>
              );
            },
          },
          { key: "paymentTermDays", label: "เครดิตเทอม", align: "center", render: (c) => `${c.paymentTermDays} วัน` },
        ]}
      />

      {/* create customer modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="สร้างลูกค้าใหม่ (B2B)">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">ชื่อบริษัท *</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="บริษัท ตัวอย่าง จำกัด" />
          </div>
          <div>
            <label className="label">เลขผู้เสียภาษี</label>
            <input className="input" value={form.taxId} onChange={(e) => setForm({ ...form, taxId: e.target.value })} placeholder="0105xxxxxxxxx" />
          </div>
          <div>
            <label className="label">อุตสาหกรรม</label>
            <input className="input" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="อาหารและเครื่องดื่ม" />
          </div>
          <div>
            <label className="label">ผู้ติดต่อ</label>
            <input className="input" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          </div>
          <div>
            <label className="label">โทรศัพท์</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="label">เครดิตเทอม (วัน)</label>
            <select
              className="input"
              value={form.paymentTermDays}
              onChange={(e) => setForm({ ...form, paymentTermDays: Number(e.target.value) })}
            >
              <option value={0}>เงินสด</option>
              <option value={15}>15 วัน</option>
              <option value={30}>30 วัน</option>
              <option value={45}>45 วัน</option>
              <option value={60}>60 วัน</option>
            </select>
          </div>
          <div>
            <label className="label">วงเงินเครดิต (฿)</label>
            <input
              type="number"
              className="input num"
              value={form.creditLimit}
              onChange={(e) => setForm({ ...form, creditLimit: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button className="btn-outline text-xs" onClick={() => setCreateOpen(false)}>
            ยกเลิก
          </button>
          <button className="btn-primary text-xs" onClick={submit}>
            บันทึกลูกค้า
          </button>
        </div>
      </Modal>
    </div>
  );
}
