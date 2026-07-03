import { LINE_ID } from "@/lib/site";
import { Container, LineButton, LineGlyph } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

const HELP = [
  "ส่งตัวอย่างเว็บที่คุณชอบมาให้ดู",
  "บอกฟีเจอร์หรือระบบที่อยากได้",
  "เล่าปัญหาธุรกิจที่อยากแก้",
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/40 bg-gradient-to-br from-brand-700 via-brand-600 to-ink p-8 text-white shadow-lift sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-dots opacity-10" />
            <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/10 blur-2xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  มีไอเดียหรืออยากเริ่มทำระบบ
                  <br />
                  คุยกับเราได้เลย
                </h2>
                <p className="mt-4 max-w-lg text-lg text-white/85">
                  ส่งตัวอย่างเว็บ ฟีเจอร์ที่อยากได้ หรือปัญหาธุรกิจที่อยากแก้
                  มาให้ทีมช่วยประเมินเบื้องต้นได้ครับ
                </p>
                <ul className="mt-6 space-y-2.5">
                  {HELP.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-white/90">
                      <span className="inline-flex size-5 items-center justify-center rounded-full bg-white/20">
                        <Icon name="check" className="size-3.5" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-[#06C755] text-white">
                    <LineGlyph className="size-7" />
                  </span>
                  <div>
                    <p className="text-sm text-white/75">ทักหาเราได้ที่ LINE OA</p>
                    <p className="font-display text-2xl font-bold tracking-tight">{LINE_ID}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/75">
                  ปรึกษาฟรี ไม่มีค่าใช้จ่าย ตอบไว คุยง่าย เป็นกันเอง
                </p>
                <LineButton className="mt-5 w-full">ทัก LINE OA: {LINE_ID}</LineButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
