"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, ShoppingBag, CreditCard, Landmark, QrCode, Package, Plus, Minus } from "lucide-react";

type Product = { id: number; name: string; price: number; img: string };

const PRODUCTS: Product[] = [
  { id: 1, name: "กระเป๋าหนังพรีเมียม", price: 1290, img: "/img/prod-1.jpg" },
  { id: 2, name: "นาฬิกาข้อมือมินิมอล", price: 1890, img: "/img/prod-2.jpg" },
  { id: 3, name: "กระเป๋าเป้รุ่นใหม่", price: 990, img: "/img/prod-3.jpg" },
  { id: 4, name: "รองเท้าผ้าใบสีสด", price: 1490, img: "/img/prod-4.jpg" },
  { id: 5, name: "กระเป๋าเป้สีเข้ม", price: 1190, img: "/img/prod-5.jpg" },
  { id: 6, name: "หมวกไหมพรมนุ่ม", price: 390, img: "/img/prod-6.jpg" },
];

const PAYMENTS = [
  { id: "card", label: "บัตรเครดิต / เดบิต", Icon: CreditCard },
  { id: "bank", label: "โอนผ่านธนาคาร", Icon: Landmark },
  { id: "promptpay", label: "พร้อมเพย์", Icon: QrCode },
];

export function ShopDemo() {
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1, 2: 1, 6: 1 });
  const [pay, setPay] = useState("card");

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: number) =>
    setCart((c) => {
      const n = (c[id] ?? 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = Object.entries(cart).reduce(
    (s, [id, q]) => s + (PRODUCTS.find((p) => p.id === Number(id))?.price ?? 0) * q,
    0
  );

  return (
    <div className="bg-rose-50/50 font-sans text-slate-700">
      {/* nav */}
      <header className="sticky top-12 z-30 border-b border-pink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-6 text-pink-500" />
            <span className="font-display text-xl font-bold tracking-tight text-pink-500">SweetShop</span>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-slate-500 md:flex">
            <span className="cursor-pointer hover:text-pink-500">หน้าแรก</span>
            <span className="cursor-pointer hover:text-pink-500">สินค้า</span>
            <span className="cursor-pointer hover:text-pink-500">โปรโมชั่น</span>
            <span className="cursor-pointer hover:text-pink-500">ติดต่อเรา</span>
          </nav>
          <span className="relative inline-flex size-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
            <ShoppingCart className="size-5" />
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-pink-500 text-[11px] font-bold text-white">
              {count}
            </span>
          </span>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_20rem]">
        <div>
          {/* hero */}
          <section className="relative overflow-hidden rounded-3xl">
            <Image src="/img/shop-hero.jpg" alt="" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/85 via-pink-500/55 to-transparent" />
            <div className="relative z-10 max-w-sm p-8 text-white">
              <span className="inline-block rounded-full bg-white/25 px-3 py-1 text-xs font-semibold backdrop-blur">New Collection</span>
              <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight">สดใส น่ารัก<br />สีพาสเทล</h1>
              <p className="mt-2 text-sm text-white/90">ของน่ารักครบทุกชิ้น เลือกช้อปง่าย ๆ พร้อมส่งถึงบ้าน</p>
              <button className="mt-4 rounded-full bg-white px-6 py-2.5 font-semibold text-pink-600 shadow-lg hover:bg-pink-50">ช้อปเลย</button>
            </div>
          </section>

          {/* products */}
          <section className="mt-7">
            <h2 className="font-display text-xl font-bold text-slate-900">สินค้าแนะนำ</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {PRODUCTS.map((p) => (
                <article key={p.id} className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={p.img} alt={p.name} fill sizes="(max-width:640px) 100vw, 280px" className="object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-display text-sm font-bold text-slate-900">{p.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-display font-bold text-pink-500">฿{p.price.toLocaleString()}</span>
                      <button onClick={() => add(p.id)} className="inline-flex items-center gap-1 rounded-full bg-pink-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-pink-600">
                        <Plus className="size-3.5" /> ใส่ตะกร้า
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* right rail */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          {/* cart */}
          <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display font-bold text-slate-900"><ShoppingBag className="size-4 text-pink-500" /> ตะกร้าสินค้า</h3>
              <span className="grid size-6 place-items-center rounded-full bg-pink-100 text-xs font-bold text-pink-500">{count}</span>
            </div>
            <div className="mt-3 space-y-3">
              {count === 0 && <p className="py-6 text-center text-sm text-slate-400">ยังไม่มีสินค้า</p>}
              {Object.entries(cart).map(([id, q]) => {
                const p = PRODUCTS.find((x) => x.id === Number(id))!;
                return (
                  <div key={id} className="flex items-center gap-2.5">
                    <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
                      <Image src={p.img} alt={p.name} fill sizes="44px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-800">{p.name}</p>
                      <p className="text-xs text-pink-500">฿{p.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => remove(p.id)} className="grid size-6 place-items-center rounded-md bg-pink-100 text-pink-500"><Minus className="size-3.5" /></button>
                      <span className="w-4 text-center text-xs font-semibold">{q}</span>
                      <button onClick={() => add(p.id)} className="grid size-6 place-items-center rounded-md bg-pink-500 text-white"><Plus className="size-3.5" /></button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-pink-100 pt-3">
              <span className="text-sm text-slate-500">รวมทั้งหมด</span>
              <span className="font-display text-xl font-bold text-slate-900">฿{total.toLocaleString()}</span>
            </div>
            <button disabled={count === 0} className="mt-3 w-full rounded-full bg-pink-500 py-2.5 text-sm font-semibold text-white hover:bg-pink-600 disabled:bg-slate-200 disabled:text-slate-400">
              ไปชำระเงิน
            </button>
          </div>

          {/* payment */}
          <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
            <h3 className="flex items-center gap-2 font-display font-bold text-slate-900"><CreditCard className="size-4 text-pink-500" /> ชำระเงินออนไลน์</h3>
            <div className="mt-3 space-y-2">
              {PAYMENTS.map(({ id, label, Icon }) => (
                <button key={id} onClick={() => setPay(id)} className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${pay === id ? "border-pink-400 bg-pink-50" : "border-slate-200 hover:bg-pink-50/50"}`}>
                  <span className={`grid size-4 place-items-center rounded-full border-2 ${pay === id ? "border-pink-500" : "border-slate-300"}`}>
                    {pay === id && <span className="size-2 rounded-full bg-pink-500" />}
                  </span>
                  <Icon className="size-4 text-slate-500" />
                  <span className="font-medium text-slate-700">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* order summary */}
          <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
            <h3 className="flex items-center gap-2 font-display font-bold text-slate-900"><Package className="size-4 text-pink-500" /> สรุปออเดอร์</h3>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">รหัสสั่งซื้อ</dt><dd className="font-mono text-slate-700">#SS67042</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">วันที่สั่งซื้อ</dt><dd className="text-slate-700">15 พ.ค. 2567</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">ยอดรวม</dt><dd className="font-bold text-slate-900">฿{total.toLocaleString()}</dd></div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">สถานะ</dt>
                <dd><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">กำลังจัดส่ง</span></dd>
              </div>
            </dl>
            <button className="mt-3 w-full rounded-full border border-pink-200 py-2 text-sm font-semibold text-pink-500 hover:bg-pink-50">ดูรายละเอียดออเดอร์</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
