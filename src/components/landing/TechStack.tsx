import Image from "next/image";
import { TECH, TECH_GROUPS, GROUP_STYLE, techLogoSrc, type TechItem } from "@/lib/tech";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function TechStack() {
  return (
    <section className="relative scroll-mt-20 overflow-hidden bg-[#070d1f] py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="beam-x top-[192px] [animation-delay:-3s] [animation-duration:12s]" />
      </div>
      <div className="pointer-events-none absolute -left-32 top-0 size-96 animate-aurora rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 size-80 animate-aurora rounded-full bg-violet-500/15 blur-3xl [animation-delay:-6s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-72 animate-aurora rounded-full bg-emerald-500/10 blur-3xl [animation-delay:-12s]" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-brand-300">เทคโนโลยีที่เราใช้</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            เครื่องมือทันสมัย ที่ดูแลต่อได้จริง
          </h2>
          <p className="mt-4 text-lg text-white/70">
            เลือกเทคโนโลยีมาตรฐานสากล วางระบบให้ต่อยอดได้ ไม่ผูกขาดจนไปต่อไม่ได้
          </p>
        </Reveal>

        <Reveal className="marquee-pause mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {[...TECH, ...TECH].map((t, i) => (
              <span
                key={`${t.name}-${i}`}
                className="inline-flex items-center gap-2.5 whitespace-nowrap px-3 py-2 transition-colors hover:bg-white/[0.06]"
              >
                <TechLogo item={t} size={22} />
                <span className="font-display text-sm font-semibold text-white/90">{t.name}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-9">
          {TECH_GROUPS.map((g, i) => {
            const style = GROUP_STYLE[g];
            const items = TECH.filter((t) => t.group === g);
            return (
              <Reveal key={g} delay={i * 50}>
                <div className="group relative h-full p-1">
                  <div className={`mb-3 h-0.5 w-10 bg-gradient-to-r ${style.accent}`} />
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${style.label}`}>
                    {style.title}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {items.map((t) => (
                      <li key={t.name} className="flex items-center gap-2.5">
                        <TechLogo item={t} size={18} />
                        <span className="text-sm font-medium leading-tight text-white/85">{t.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function TechLogo({ item, size }: { item: TechItem; size: number }) {
  return (
    <Image
      src={techLogoSrc(item)}
      alt=""
      width={size}
      height={size}
      className="shrink-0 object-contain"
      unoptimized
    />
  );
}
