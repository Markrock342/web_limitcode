import Image from "next/image";
import { TECH, TECH_GROUPS, GROUP_STYLE, techIconUrl } from "@/lib/tech";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function TechStack() {
  return (
    <section className="relative scroll-mt-20 overflow-hidden bg-[#070d1f] py-20 text-white sm:py-24">
      {/* colorful backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="beam-x top-[192px] [animation-delay:-3s] [animation-duration:12s]" />
      </div>
      <div className="pointer-events-none absolute -left-32 top-0 size-96 animate-aurora rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 size-80 animate-aurora rounded-full bg-violet-500/15 blur-3xl [animation-delay:-6s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-72 animate-aurora rounded-full bg-emerald-500/10 blur-3xl [animation-delay:-12s]" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3.5 py-1.5 text-sm font-medium text-brand-200">
            <span className="size-1.5 rounded-full bg-brand-400" />
            เทคโนโลยีที่เราใช้
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            เครื่องมือทันสมัย ที่ดูแลต่อได้จริง
          </h2>
          <p className="mt-4 text-lg text-white/70">
            เราเลือกเทคโนโลยีมาตรฐานสากล วางระบบให้ต่อยอดในอนาคตได้ ไม่ผูกขาดจนไปต่อไม่ได้
          </p>
        </Reveal>

        {/* logo marquee — หยุดเมื่อ hover ให้กดอ่านได้ */}
        <Reveal className="marquee-pause mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {[...TECH, ...TECH].map((t, i) => (
              <span
                key={`${t.name}-${i}`}
                className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 shadow-sm backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10"
              >
                <TechLogo item={t} size={22} />
                <span className="font-display text-sm font-semibold text-white/90">{t.name}</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* grouped cards with logos */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TECH_GROUPS.map((g, i) => {
            const style = GROUP_STYLE[g];
            const items = TECH.filter((t) => t.group === g);
            return (
              <Reveal key={g} delay={i * 60}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.accent}`} />
                  <div className={`mt-1 inline-flex rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${style.label} ${style.glow}`}>
                    {g}
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {items.map((t) => (
                      <li key={t.name} className="flex items-center gap-2.5">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.06]">
                          <TechLogo item={t} size={18} />
                        </span>
                        <span className="text-sm font-medium leading-tight text-white/85">{t.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* featured logo strip */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {TECH.slice(0, 8).map((t) => (
              <div
                key={t.name}
                title={t.name}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
              >
                <TechLogo item={t} size={24} />
                <span className="hidden text-xs font-semibold text-white/80 sm:inline">{t.name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function TechLogo({ item, size }: { item: { icon: string; color: string; name: string }; size: number }) {
  return (
    <Image
      src={techIconUrl(item.icon, item.color)}
      alt={`${item.name} logo`}
      width={size}
      height={size}
      className="shrink-0"
      unoptimized
    />
  );
}
