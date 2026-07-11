"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addJob, DAYS, type JobStatus, useGuardNest } from "../store";

const SERVICES = ["กำจัดปลวก", "พ่นแมลง", "กำจัดมดและแมลงสาบ", "ตรวจพื้นที่ก่อนบริการ", "วางเหยื่อปลวก"];
const TECHS = ["ช่างก้อง", "ช่างบอย", "ช่างนิด", "ช่างวิน"];

export function GuardNewJobPage() {
  const { state, setState } = useGuardNest();
  const router = useRouter();
  const [customerId, setCustomerId] = useState(state.customers[0]?.id ?? "");
  const [type, setType] = useState(SERVICES[0]);
  const [tech, setTech] = useState(TECHS[0]);
  const [day, setDay] = useState<(typeof DAYS)[number]>("จ.");
  const [time, setTime] = useState("09:00");
  const [notes, setNotes] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const customer = state.customers.find((item) => item.id === customerId);
    if (!customer) return;
    setState((current) => addJob(current, {
      customerId: customer.id,
      customer: customer.name,
      address: customer.address,
      type,
      tech,
      notes: notes.trim() || "สร้างจากหน้าสร้างงาน",
      status: "นัดหมาย" as JobStatus,
      day,
      time,
    }));
    router.push("/demo/field-crm/jobs");
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl space-y-5">
      <header><p className="text-xs font-bold tracking-[0.18em] text-sky-700">NEW JOB ORDER</p><h1 className="mt-1 font-display text-3xl font-bold text-[#0b1f3a]">สร้างงานใหม่</h1><p className="mt-1 text-sm text-slate-600">บันทึกงานและส่งเข้าคิวทีมหน้างานทันที</p></header>
      <section className="grid gap-5 border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">ลูกค้า<select value={customerId} onChange={(event) => setCustomerId(event.target.value)} className="mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-sky-500">{state.customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">บริการ<select value={type} onChange={(event) => setType(event.target.value)} className="mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-sky-500">{SERVICES.map((service) => <option key={service}>{service}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">ช่างผู้รับผิดชอบ<select value={tech} onChange={(event) => setTech(event.target.value)} className="mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-sky-500">{TECHS.map((item) => <option key={item}>{item}</option>)}</select></label>
        <div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium text-slate-700">วัน<select value={day} onChange={(event) => setDay(event.target.value as (typeof DAYS)[number])} className="mt-1.5 w-full border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-sky-500">{DAYS.map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-sm font-medium text-slate-700">เวลา<input value={time} onChange={(event) => setTime(event.target.value)} className="mt-1.5 w-full border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-sky-500" /></label></div>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">หมายเหตุ<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} placeholder="รายละเอียดสำหรับทีมหน้างาน" className="mt-1.5 w-full border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-sky-500" /></label>
      </section>
      <button type="submit" className="bg-[#0b1f3a] px-5 py-3 text-sm font-semibold text-white">สร้างและดูรายการงาน</button>
    </form>
  );
}
