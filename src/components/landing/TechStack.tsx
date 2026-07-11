import Image from "next/image";
import { TECH, techIconUrl } from "@/lib/tech";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function TechStack() {
  return (
    <section className="relative scroll-mt-20 overflow-hidden bg-[#070d1f] py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
      <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-sky-500/10 blur-3xl" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-brand-300">เทคโนโลยีที่เราใช้</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            เครื่องมือทันสมัย ที่ดูแลต่อได้จริง
          </h2>
          <p className="mt-4 text-lg text-white/65">
            เลือกเทคโนโลยีมาตรฐานสากล วางระบบให้ต่อยอดได้ ไม่ผูกขาดจนไปต่อไม่ได้
          </p>
        </Reveal>

        <Reveal className="marquee-pause mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-10">
            {[...TECH, ...TECH].map((t, i) => (
              <span
                key={`${t.name}-${i}`}
                className="inline-flex items-center gap-2.5 whitespace-nowrap"
              >
                <Image
                  src={techIconUrl(t.icon, t.color)}
                  alt=""
                  width={22}
                  height={22}
                  className="shrink-0 opacity-90"
                  unoptimized
                />
                <span className="font-display text-sm font-semibold text-white/80">{t.name}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {TECH.slice(0, 8).map((t) => (
            <span key={t.name} className="inline-flex items-center gap-2 text-white/55" title={t.name}>
              <Image
                src={techIconUrl(t.icon, t.color)}
                alt=""
                width={20}
                height={20}
                unoptimized
              />
              <span className="text-xs font-medium">{t.name}</span>
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
