import { USE_CASES } from "@/lib/site";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function UseCases() {
  return (
    <section className="scroll-mt-20 bg-gradient-to-b from-white to-brand-50/60 py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>ตัวอย่างการใช้งาน</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            ตัวอย่างระบบที่เราช่วยทำได้
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            ไม่ว่าจะธุรกิจแบบไหน เรามีแนวทางวางระบบให้เหมาะกับงานของคุณ
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u, i) => (
            <Reveal
              key={u.title}
              delay={(i % 3) * 80}
              className={i === 0 ? "lg:row-span-2" : ""}
            >
              <article
                className={`group flex h-full flex-col justify-between rounded-2xl border p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift ${
                  i === 0
                    ? "border-brand-500/40 bg-gradient-to-br from-brand-600 to-ink text-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div>
                  <div
                    className={`inline-flex size-11 items-center justify-center rounded-xl transition-transform duration-300 ease-out-quart group-hover:scale-110 group-hover:-rotate-3 ${
                      i === 0 ? "bg-white/15 text-white" : "bg-brand-50 text-brand-600"
                    }`}
                  >
                    <Icon name={u.icon} className="size-6" />
                  </div>
                  <h3
                    className={`mt-5 font-display text-lg font-bold ${
                      i === 0 ? "text-white" : "text-ink"
                    }`}
                  >
                    {u.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      i === 0 ? "text-white/85" : "text-slate-600"
                    }`}
                  >
                    {u.desc}
                  </p>
                </div>
                {i === 0 && (
                  <p className="mt-6 text-sm font-medium text-white/90">
                    ดูตัวอย่างจริงได้ในหน้า “ผลงานตัวอย่าง” ด้านล่าง ↓
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
