"use client";

import Link from "next/link";
import Image from "next/image";
import { CLIENT_WORK, DEMOS, SYSTEM_DEMOS } from "@/lib/demos";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, CropFrame, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

const FEATURED = [...CLIENT_WORK.slice(0, 3), ...SYSTEM_DEMOS.slice(0, 3)];

export function ShowcasePreview() {
  const { t } = useLocale();

  return (
    <section id="showcase" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionTag>{t.showcase.tag}</SectionTag>
            <h2 className="mt-5 font-display text-[clamp(1.75rem,1.2rem+2vw,2.35rem)] font-bold tracking-tight text-ink">
              {t.showcase.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">{t.showcase.body}</p>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-700 transition hover:gap-3"
            >
              {t.showcase.seeAll}
              <Icon name="arrow" className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((d, i) => {
            const href = d.liveUrl ?? `/demo/${d.slug}`;
            const external = Boolean(d.liveUrl);
            const Tag = external ? "a" : Link;
            const extra = external
              ? { href, target: "_blank", rel: "noopener noreferrer" }
              : { href };
            return (
              <Reveal key={d.slug} delay={(i % 3) * 60}>
                <Tag {...(extra as { href: string })} className="group block">
                  <CropFrame className="border border-slate-200 bg-slate-100">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={d.preview!}
                        alt={`${t.showcase.previewAlt} ${d.name}`}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px"
                        className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
                      />
                    </div>
                  </CropFrame>
                  <p className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-600">
                    {t.showcase.categories[d.category]}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-700">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{d.tagline}</p>
                </Tag>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-500">
            {localeMore(DEMOS.length - FEATURED.length, t.showcase.more)}{" "}
            <Link href="/showcase" className="font-semibold text-brand-700 hover:underline">
              {t.showcase.moreLink}
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function localeMore(count: number, moreWord: string) {
  return `+ ${count} ${moreWord}`;
}
