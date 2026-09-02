"use client";

import Link from "next/link";
import Image from "next/image";
import { CLIENT_WORK, DEMOS, SYSTEM_DEMOS } from "@/lib/demos";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

const FEATURED = [...CLIENT_WORK.slice(0, 3), ...SYSTEM_DEMOS.slice(0, 3)];

export function ShowcasePreview() {
  const { t } = useLocale();

  return (
    <section id="showcase" className="scroll-mt-20 border-t border-slate-100 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionTag>{t.showcase.tag}</SectionTag>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t.showcase.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-slate-600">{t.showcase.body}</p>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:gap-3"
            >
              {t.showcase.seeAll}
              <Icon name="arrow" className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={d.preview}
                      alt={`${t.showcase.previewAlt} ${d.name}`}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium text-brand-600">{t.showcase.categories[d.category]}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink group-hover:text-brand-700">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{d.tagline}</p>
                </Tag>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 border-t border-slate-100 pt-8 text-center">
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
