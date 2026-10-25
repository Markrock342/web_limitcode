# LIMIT CODE STUDIO — เว็บไซต์ทีม + Live Showcase

เว็บไซต์ Landing Page สำหรับทีมฟรีแลนซ์สายพัฒนา **LIMIT CODE STUDIO**
พร้อม **ผลงานตัวอย่างแบบกดดูได้จริง (Live Demo)** หลายแนวในเว็บเดียว

> ติดต่อหลักผ่าน LINE OA: **@026iaomj**

## ฟีเจอร์

- **หน้าแรก (`/`)** — Landing Page ภาษาไทยครบทุก section
  - Hero · บริการ 6 แบบ · ทำไมต้องเรา · ขั้นตอนการทำงาน 5 สเต็ป · ตัวอย่างการใช้งาน · ผลงานตัวอย่าง · Tech Stack · ติดต่อ · Footer
- **ผลงานตัวอย่าง (`/showcase`)** — แกลเลอรีให้ลูกค้า "เลือกแนว" เว็บ พร้อมตัวกรองหมวดหมู่
- **ข่าวและสื่อ (`/#news`)** — สรุปบทสัมภาษณ์ทีมจาก Marketimes Asia พร้อมเครดิตผู้เขียน วันที่ และลิงก์ต้นฉบับ รองรับไทย อังกฤษ และจีน
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

## ตรวจคุณภาพและอัปเดตแพ็กเกจ

ใช้ Node.js 24 และติดตั้ง Browser สำหรับทดสอบครั้งแรกด้วย `npx playwright install chromium`

```bash
npm run lint       # ESLint
npm run typecheck  # สร้าง Route Types และตรวจ TypeScript
npm test           # ทดสอบ Visitor API ด้วยข้อมูลจำลอง ไม่ต้อง Build หรือใช้ Token จริง
npm run test:e2e   # Build แล้วทดสอบ Desktop/Mobile ด้วย Playwright
npm run check      # รวมทุกขั้นตอนข้างต้น พร้อม npm audit (High/Critical ต้องผ่าน)
```

Playwright ใช้ Production Build บน `127.0.0.1:3118` และตรวจข่าว/ภาพทีม เมนู ภาษา ปุ่ม LINE ตัวนับผู้ชม หน้าพิมพ์ และ ERP Demo ที่เกี่ยวข้อง โดยไม่ส่งข้อความ LINE ไม่สร้างลูกค้า และไม่อ่าน Analytics Production; เลขผู้ชมในชุดทดสอบเป็นข้อมูลจำลองเท่านั้น

GitHub Actions รัน `npm run check` เมื่อ Push เข้า `main` หรือเปิด PR ส่วน Dependabot เปิด PR อัปเดต npm/Actions รายสัปดาห์ โดยไม่ Merge หรือ Deploy ให้อัตโนมัติ การอัปเดต Major ของ npm ยังต้องตรวจความเข้ากันได้แยกต่างหาก

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
- ข่าวและสื่อ: `src/lib/press.ts` สำหรับข้อมูลแหล่งข่าว และส่วน `press` ใน `src/lib/i18n/messages.ts` สำหรับข้อความทั้ง 3 ภาษา
- ภาพข่าว: `public/press/marketimes-asia-limitcode-team.webp` ย่อจากภาพทีมในบทความต้นฉบับของ Marketimes Asia โดยคงภาพเต็มและแสดงเครดิตใต้ภาพ URL ต้นทางบันทึกไว้ใน `PRESS_FEATURE.imageSource`

## ยอดผู้เข้าชมหน้าแรก

ด้านล่างสุดของหน้าแรกแสดงไอคอนตาและยอดผู้เข้าชมสะสมจาก Vercel Web Analytics ผ่าน `/api/visitors` ไม่ใช่จำนวนคนออนไลน์ และไม่ใช่จำนวนบุคคลที่ยืนยันตัวตน เริ่มนับเมื่อเปิด Analytics; ผู้เข้าชมรายเดิมอาจนับใหม่ในวันถัดไปตามนิยามของ Vercel

- เปิด Web Analytics ของโปรเจกต์ `web-limitcode` ก่อน Deploy (แพ็กเกจ Hobby มีโควตาฟรีแบบจำกัด)
- ตั้ง `VISITOR_ANALYTICS_TOKEN` เป็น Secret ฝั่งเซิร์ฟเวอร์ โดยจำกัดสิทธิ์และอายุ Token ให้แคบที่สุดที่บัญชีรองรับ (บางบัญชีจำกัดได้เพียงระดับทีม ไม่ใช่เฉพาะโปรเจกต์) ห้ามใช้ `NEXT_PUBLIC_` หรือ Commit Token
- ตั้ง `VISITOR_ANALYTICS_PROJECT_ID` และ `VISITOR_ANALYTICS_TEAM_ID` ให้ตรงกับโปรเจกต์และทีม Vercel ของเว็บ
- API ส่งออกเฉพาะจำนวนรวม ไม่ส่ง Token หรือข้อมูลรายบุคคล และ Cache 5 นาทีเพื่อไม่ให้การแสดงยอดทำให้หน้าเว็บช้า
- หากดึงข้อมูลไม่ได้ จะแสดง `—` แทนตัวเลขสมมติ; บน Local ต้องตั้งค่า Environment เองเพื่อดูยอดจริง

## Deploy

Deploy ได้ทันทีบน **Vercel** (แนะนำ) — import repo แล้ว Vercel จะตรวจจับ Next.js ให้อัตโนมัติ
หรือใช้ `npm run build && npm run start` บนเซิร์ฟเวอร์ Node ใดก็ได้

---

ออกแบบและพัฒนาโดยทีม LIMIT CODE STUDIO
