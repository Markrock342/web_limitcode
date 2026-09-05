"use client";

import Link from "next/link";
import { CONTACT, LINE_ID } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, FacebookGlyph, LineButton, LineGlyph, PhoneGlyph, EmailGlyph } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Typewriter } from "@/components/Typewriter";

export function Contact() {
  const { t } = useLocale();
  const phrases = [...t.contact.phrases];

  return (
    <section id="contact" data-analytics-region="homepage_contact" className="relative scroll-mt-20 overflow-hidden bg-[#0b1f3a] py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-200">{t.contact.init}</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,1.2rem+2vw,2.35rem)] font-bold leading-tight tracking-tight">
              <Typewriter key={phrases.join("|")} phrases={phrases} className="text-white" />
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/70">{t.contact.body}</p>
            <ul className="mt-6 space-y-2.5">
              {t.contact.help.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-white/80">
                  <Icon name="check" className="size-4 shrink-0 text-brand-300" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="group relative overflow-hidden border border-white/15 bg-white/5">
              <span className="status-run" />
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-2.5">
                <span className="size-2 rounded-full bg-[#ff5f57]" />
                <span className="size-2 rounded-full bg-[#febc2e]" />
                <span className="size-2 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  channel.open
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center bg-[#06C755] text-white">
                    <LineGlyph className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm text-white/55">{t.contact.channel}</p>
                    <p className="font-display text-2xl font-bold tracking-tight">{LINE_ID}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/55">{t.contact.vibe}</p>
                <LineButton className="mt-5 w-full sm:w-auto">
                  {t.contact.lineCta} {LINE_ID}
                </LineButton>
                <div className="mt-5 space-y-1 text-sm">
                  <a href={CONTACT.phoneHref} className="flex min-h-11 items-center gap-2.5 text-white/80 hover:text-white">
                    <PhoneGlyph className="size-4 shrink-0 text-brand-300" />
                    {t.contact.call} {CONTACT.personThai} {CONTACT.phoneDisplay}
                  </a>
                  <a href={CONTACT.emailHref} className="flex min-h-11 items-center gap-2.5 break-all text-white/80 hover:text-white">
                    <EmailGlyph className="size-4 shrink-0 text-brand-300" />
                    {CONTACT.email}
                  </a>
                  <a href={CONTACT.salesEmailHref} className="flex min-h-11 items-center gap-2.5 break-all text-white/80 hover:text-white">
                    <EmailGlyph className="size-4 shrink-0 text-brand-300" />
                    {CONTACT.salesEmail}
                  </a>
                  <a
                    href={CONTACT.pageFacebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2.5 text-white/80 hover:text-white"
                  >
                    <FacebookGlyph className="size-4 shrink-0 text-brand-300" />
                    {CONTACT.pageFacebookName}
                  </a>
                  <a
                    href={CONTACT.facebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2.5 text-white/80 hover:text-white"
                  >
                    <FacebookGlyph className="size-4 shrink-0 text-brand-300" />
                    Facebook {CONTACT.person}
                  </a>
                  <Link href="/contact" className="inline-flex min-h-11 items-center font-mono text-[12px] text-brand-200 hover:text-white">
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
