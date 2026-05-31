"use client";

import Image from "next/image";
import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, Star, PartyPopper } from "lucide-react";

const MENU: Record<string, { n: string; en: string; p: number; img: string }[]> = {
  RECOMMENDED: [
    { n: "สลัดสุขภาพรวม", en: "Garden Salad", p: 220, img: "/img/food-2.jpg" },
    { n: "สเต๊กเนื้อย่าง", en: "Grilled Steak", p: 520, img: "/img/food-6.jpg" },
    { n: "พาสต้าทะเลรวม", en: "Seafood Pasta", p: 290, img: "/img/food-7.jpg" },
    { n: "เบอร์เกอร์เนื้อ", en: "Beef Burger", p: 260, img: "/img/food-4.jpg" },
  ],
  "MAIN DISH": [
    { n: "พิซซ่าหน้ารวม", en: "Supreme Pizza", p: 340, img: "/img/food-3.jpg" },
    { n: "สเต๊กจานพิเศษ", en: "Chef's Special Steak", p: 580, img: "/img/food-1.jpg" },
    { n: "ข้าวแกงกะหรี่", en: "Curry Rice Bowl", p: 180, img: "/img/food-5.jpg" },
  ],
  PASTA: [
    { n: "พาสต้าผัดรวม", en: "Mixed Pasta", p: 250, img: "/img/food-8.jpg" },
    { n: "สปาเกตตี้ทะเล", en: "Seafood Spaghetti", p: 290, img: "/img/food-7.jpg" },
  ],
  DRINK: [
    { n: "ลาเต้ร้อน", en: "Hot Latte", p: 110, img: "/img/drink-1.jpg" },
    { n: "อเมริกาโน่เย็น", en: "Iced Americano", p: 90, img: "/img/drink-2.jpg" },
  ],
  DESSERT: [
    { n: "โดนัทช็อกโกแลต", en: "Choco Donut", p: 90, img: "/img/dessert-1.jpg" },
    { n: "เค้กเบอร์รี่", en: "Berry Cake", p: 150, img: "/img/dessert-2.jpg" },
  ],
};

export function RestaurantDemo() {
  const [cat, setCat] = useState("RECOMMENDED");
  const [booked, setBooked] = useState(false);

  return (
    <div className="bg-[#fbf6ec] font-sans text-stone-700">
      {/* nav */}
      <header className="sticky top-12 z-30 border-b border-stone-800 bg-[#1c1a17] text-stone-100">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="font-display text-xl font-bold tracking-[0.2em] text-amber-400">BISTRO CAFÉ</span>
          <nav className="hidden gap-7 text-xs font-medium tracking-widest text-stone-300 md:flex">
            <a href="#menu" className="hover:text-amber-400">MENU</a>
            <a href="#book" className="hover:text-amber-400">RESERVATION</a>
            <a href="#contact" className="hover:text-amber-400">CONTACT</a>
          </nav>
          <a href="#book" className="rounded-full bg-amber-500 px-4 py-2 text-xs font-bold tracking-wide text-stone-900 hover:bg-amber-400">BOOK A TABLE</a>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto grid w-full max-w-6xl items-stretch gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[1.55fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl p-8 text-stone-100 sm:p-12">
          <Image src="/img/resto-hero.jpg" alt="" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120f0c]/90 via-[#120f0c]/70 to-[#120f0c]/30" />
          <div className="relative">
            <span className="text-xs font-semibold tracking-[0.3em] text-amber-400">FRESH · EVERYDAY</span>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl">
              GOOD FOOD<br /><span className="text-amber-400">GOOD MOOD</span>
            </h1>
            <p className="mt-4 max-w-sm text-stone-200">อร่อยทุกจาน บรรยากาศสุดพิเศษ วัตถุดิบคัดสรรสดใหม่ทุกวัน</p>
            <a href="#book" className="mt-6 inline-block rounded-full bg-amber-500 px-7 py-3 font-semibold text-stone-900 hover:bg-amber-400">จองโต๊ะเลย</a>
            <div className="mt-6 flex items-center gap-2 text-sm text-stone-300">
              <span className="flex text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</span>
              4.9 · รีวิว 500+ รายการ
            </div>
          </div>
        </div>

        {/* booking widget */}
        <div id="book" className="scroll-mt-28 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold text-stone-900">จองโต๊ะ</h2>
          {booked ? (
            <div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-center">
              <PartyPopper className="mx-auto size-9 text-emerald-500" />
              <p className="mt-1 font-display font-bold text-emerald-700">จองโต๊ะสำเร็จ!</p>
              <p className="text-sm text-emerald-600">แล้วพบกันที่ BISTRO CAFÉ</p>
              <button onClick={() => setBooked(false)} className="mt-3 text-sm font-semibold text-amber-600 underline">จองใหม่</button>
            </div>
          ) : (
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); setBooked(true); }}>
              <Field label="เลือกวันที่"><input type="date" required className="w-full rounded-xl border border-stone-200 px-3 py-2.5 outline-none focus:border-amber-400" /></Field>
              <Field label="เวลา">
                <select className="w-full rounded-xl border border-stone-200 px-3 py-2.5 outline-none focus:border-amber-400">
                  {["17:00", "18:00", "19:00", "20:00"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="จำนวนคน">
                <select className="w-full rounded-xl border border-stone-200 px-3 py-2.5 outline-none focus:border-amber-400">
                  {["2 ท่าน", "3 ท่าน", "4 ท่าน", "6 ท่าน", "8 ท่าน"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <button className="w-full rounded-full bg-amber-500 py-3 font-semibold text-stone-900 hover:bg-amber-400">จองโต๊ะเลย</button>
            </form>
          )}
        </div>
      </section>

      {/* menu */}
      <section id="menu" className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-12 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-amber-500">OUR MENU</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-stone-900">เมนูแนะนำ</h2>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Object.keys(MENU).map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-colors ${cat === c ? "bg-stone-900 text-white" : "border border-stone-300 bg-white text-stone-600 hover:bg-stone-100"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MENU[cat].map((m) => (
            <article key={m.en} className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={m.img} alt={m.n} fill sizes="(max-width:640px) 100vw, 280px" className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-stone-900">{m.n}</h3>
                <p className="text-xs text-stone-400">{m.en}</p>
                <p className="mt-2 font-display font-bold text-amber-600">฿{m.p}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* contact + map */}
      <section id="contact" className="scroll-mt-28 bg-[#1c1a17] py-14 text-stone-200">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-400">CONTACT</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">ติดต่อเรา</h2>
            <ul className="mt-5 space-y-3 text-stone-300">
              <li className="flex items-center gap-3"><Phone className="size-5 text-amber-400" /> 02-123-4567</li>
              <li className="flex items-center gap-3"><MessageCircle className="size-5 text-amber-400" /> @bistrocafe</li>
              <li className="flex items-center gap-3"><MapPin className="size-5 text-amber-400" /> 123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110</li>
              <li className="flex items-center gap-3"><Clock className="size-5 text-amber-400" /> เปิดทุกวัน 11:00–22:00</li>
            </ul>
          </div>
          <div className="relative min-h-[16rem] overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-200 to-sky-200">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <MapPin className="mx-auto size-10 text-rose-500" />
              <p className="mt-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700">BISTRO CAFÉ</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-stone-600">{label}</span>
      {children}
    </label>
  );
}
