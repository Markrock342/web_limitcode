import { LINE_ID } from "@/lib/site";
import { Container, LineButton, LineGlyph } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

const HELP = [
  "เล่าปัญหาที่ยังทำบน LINE / Excel / เอกสาร",
  "ส่งตัวอย่างระบบหรือ workflow ที่อยากได้",
  "บอกโมดูลที่จำเป็นก่อน (จอง / CRM / Dashboard / AI)",
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-[#0b1f3a] py-20 text-white sm:py-24">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                มีโจทย์ระบบที่อยากทำให้เป็นจริง
                <br />
                คุยกับเราได้เลย
              </h2>
              <p className="mt-4 max-w-lg text-lg text-white/70">
                ส่ง workflow ปัจจุบัน ปัญหาที่ทีมเจอ หรือตัวอย่างระบบที่อยากได้
                มาให้ทีมช่วยประเมิน scope และแนวทางเบื้องต้นได้ครับ
              </p>
              <ul className="mt-6 space-y-2.5">
                {HELP.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-white/80">
                    <Icon name="check" className="size-4 shrink-0 text-brand-300" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center bg-[#06C755] text-white">
                  <LineGlyph className="size-6" />
                </span>
                <div>
                  <p className="text-sm text-white/55">ทักหาเราได้ที่ LINE OA</p>
                  <p className="font-display text-2xl font-bold tracking-tight">{LINE_ID}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/55">ปรึกษาฟรี · ตอบไว · เป็นกันเอง</p>
              <LineButton className="mt-5 w-full sm:w-auto">ทัก LINE OA: {LINE_ID}</LineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
