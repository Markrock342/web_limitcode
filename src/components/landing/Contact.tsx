"use client";

import Link from "next/link";
import { CONTACT, LINE_ID } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Badge, Container, FacebookGlyph, LineButton, LineGlyph, PhoneGlyph, EmailGlyph } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Typewriter } from "@/components/Typewriter";

export function Contact() {
  const { t } = useLocale();
  const phrases = [...t.contact.phrases];

  return (
    <section id="contact" data-analytics-region="homepage_contact" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 overflow-hidden rounded-3xl bg-brand-700 px-6 py-10 text-white shadow-float sm:px-10 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:px-14 lg:py-14">
          <Reveal>
            <Badge tone="dark">{t.nav.contact}</Badge>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,1.2rem+2vw,2.35rem)] font-bold leading-tight tracking-tight">
              <Typewriter key={phrases.join("|")} phrases={phrases} className="text-white" />
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/80">{t.contact.body}</p>
            <ul className="mt-6 space-y-2.5">
              {t.contact.help.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-white/90">
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Icon name="check" className="size-3 text-white" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-float">
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[#06C755] text-white">
                    <LineGlyph className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-500">{t.contact.channel}</p>
                    <p className="font-display text-2xl font-bold tracking-tight">{LINE_ID}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-500">{t.contact.vibe}</p>
                <LineButton className="mt-5 w-full" trackingSource="homepage_contact">
                  {t.contact.lineCta} {LINE_ID}
                </LineButton>
                <div className="mt-5 space-y-0.5 border-t border-line pt-4 text-sm">
                  <a href={CONTACT.phoneHref} className="flex min-h-11 items-center gap-2.5 text-slate-700 hover:text-brand-700">
                    <PhoneGlyph className="size-4 shrink-0 text-slate-400" />
                    {t.contact.call} {CONTACT.personThai} {CONTACT.phoneDisplay}
                  </a>
                  <a href={CONTACT.emailHref} className="flex min-h-11 items-center gap-2.5 break-all text-slate-700 hover:text-brand-700">
                    <EmailGlyph className="size-4 shrink-0 text-slate-400" />
                    {CONTACT.email}
                  </a>
                  <a href={CONTACT.salesEmailHref} className="flex min-h-11 items-center gap-2.5 break-all text-slate-700 hover:text-brand-700">
                    <EmailGlyph className="size-4 shrink-0 text-slate-400" />
                    {CONTACT.salesEmail}
                  </a>
                  <a
                    href={CONTACT.pageFacebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2.5 text-slate-700 hover:text-brand-700"
                  >
                    <FacebookGlyph className="size-4 shrink-0 text-slate-400" />
                    {CONTACT.pageFacebookName}
                  </a>
                  <a
                    href={CONTACT.facebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2.5 text-slate-700 hover:text-brand-700"
                  >
                    <FacebookGlyph className="size-4 shrink-0 text-slate-400" />
                    Facebook {CONTACT.person}
                  </a>
                  <Link href="/contact" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-700 hover:underline">
                    {t.contact.console}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
