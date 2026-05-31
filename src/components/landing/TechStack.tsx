import { TECH } from "@/lib/site";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

const GROUPS = ["Frontend", "Mobile", "Backend", "Database", "Hosting", "Integration"];

export function TechStack() {
  return (
    <section className="scroll-mt-20 bg-ink py-20 text-white sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-brand-200">
            <span className="size-1.5 rounded-full bg-brand-300" />
            เทคโนโลยีที่เราใช้
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            เครื่องมือทันสมัย ที่ดูแลต่อได้จริง
          </h2>
          <p className="mt-4 text-lg text-white/70">
            เราเลือกเทคโนโลยีมาตรฐานสากล วางระบบให้ต่อยอดในอนาคตได้ ไม่ผูกขาดจนไปต่อไม่ได้
          </p>
        </Reveal>

        {/* marquee */}
        <Reveal className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-3">
            {[...TECH, ...TECH].map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-display text-sm font-semibold text-white/90"
              >
                <span className="size-1.5 rounded-full bg-gradient-to-r from-brand-300 to-sky-300" />
                {t.name}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {GROUPS.map((g, i) => (
            <Reveal key={g} delay={i * 60}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-brand-200">{g}</p>
                <ul className="mt-2 space-y-1">
                  {TECH.filter((t) => t.group === g).map((t) => (
                    <li key={t.name} className="text-sm text-white/80">
                      {t.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
