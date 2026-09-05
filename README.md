# LIMIT CODE STUDIO — เว็บไซต์ทีม + Live Showcase

เว็บไซต์ Landing Page สำหรับทีมฟรีแลนซ์สายพัฒนา **LIMIT CODE STUDIO**
พร้อม **ผลงานตัวอย่างแบบกดดูได้จริง (Live Demo)** หลายแนวในเว็บเดียว

> ติดต่อหลักผ่าน LINE OA: **@026iaomj**

## ฟีเจอร์

- **หน้าแรก (`/`)** — Landing Page ภาษาไทยครบทุก section
  - Hero · บริการ 6 แบบ · ทำไมต้องเรา · ขั้นตอนการทำงาน 5 สเต็ป · ตัวอย่างการใช้งาน · ผลงานตัวอย่าง · Tech Stack · ติดต่อ · Footer
- **ผลงานตัวอย่าง (`/showcase`)** — แกลเลอรีให้ลูกค้า "เลือกแนว" เว็บ พร้อมตัวกรองหมวดหมู่
- **Live Demo (`/demo/*`)** — ตัวอย่างเว็บที่กดเข้าไปใช้งานได้จริง เปิดผ่านเว็บของทีม
  - `/demo/restaurant` — เว็บร้านอาหาร/คาเฟ่ + เมนู + จองโต๊ะ
  - `/demo/shop` — เว็บขายของออนไลน์ + ตะกร้า + เช็คเอาท์
  - `/demo/booking` — ระบบจองบริการคลินิก/ความงาม (multi-step)
  - `/demo/dashboard` — ระบบหลังบ้าน Dashboard + กราฟ + ตารางออเดอร์
  - `/demo/corporate` — เว็บไซต์บริษัท B2B
- Responsive รองรับมือถือเต็มรูปแบบ + motion design ธีม "software house" (data beam วิ่งตาม grid, terminal จำลอง build/deploy, scroll-reveal, spotlight card, เส้น process วาดตัวเอง) เคารพ `prefers-reduced-motion` ทุกจุด

## เทคโนโลยี

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4**
- **TypeScript**
- ฟอนต์ไทย `IBM Plex Sans Thai` + ฟอนต์ display `Sora` (self-hosted ผ่าน `next/font`)

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด http://localhost:3000
```

## Build / Production

```bash
npm run build
npm run start
```

## Conversion Analytics

เว็บใช้ Vercel Web Analytics และ custom events โดยไม่ส่งชื่อ เบอร์โทร อีเมล หรือข้อมูลในฟอร์ม:

- `line_click` — คลิก LINE OA พร้อม `source` ของตำแหน่งปุ่ม
- `work_open` — เปิดงาน Live, Demo หรือ OSS พร้อม `item` และ `kind`
- `pricing_view` — เห็นส่วนราคาในหน้าแรก

หลัง deploy ให้เปิด Web Analytics ใน Vercel Project Dashboard จึงจะเห็นข้อมูลจริง ส่วน custom events ต้องใช้แพ็กเกจ Vercel ที่รองรับฟีเจอร์นี้

## โครงสร้างหลัก

```
src/
  app/
    page.tsx                 # หน้าแรก (Landing)
    showcase/page.tsx        # แกลเลอรีผลงาน + ตัวกรอง
    demo/<slug>/page.tsx     # หน้า Live Demo แต่ละแนว
  components/
    landing/                 # section ของหน้าแรก
    demos/                   # ตัว Live Demo (Restaurant, Shop, Booking, Dashboard, Corporate)
    DemoChrome.tsx           # กรอบครอบ demo (แถบ LIMIT CODE + สลับ demo อื่น)
    ...                      # Navbar, Footer, DemoCard, ui, ฯลฯ
  lib/
    site.ts                  # ข้อมูลแบรนด์ บริการ ขั้นตอน tech stack + LINE OA
    demos.ts                 # ข้อมูลผลงานตัวอย่าง
```

## แก้ข้อมูลติดต่อ / เนื้อหา

- LINE OA และข้อความแบรนด์: `src/lib/site.ts` (ตัวแปร `LINE_ID`, `LINE_URL`, `BRAND`)
- รายการผลงานตัวอย่าง: `src/lib/demos.ts`

## Deploy

Deploy ได้ทันทีบน **Vercel** (แนะนำ) — import repo แล้ว Vercel จะตรวจจับ Next.js ให้อัตโนมัติ
หรือใช้ `npm run build && npm run start` บนเซิร์ฟเวอร์ Node ใดก็ได้

---

ออกแบบและพัฒนาโดยทีม LIMIT CODE STUDIO
