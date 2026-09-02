"use client";

import {
  Container,
  FacebookGlyph,
  LineButton,
  LineGlyph,
  PhoneGlyph,
} from "@/components/ui";
import { CONTACT, LINE_ID } from "@/lib/site";
import { fill } from "@/lib/i18n/format";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function ContactPageView() {
  const { t } = useLocale();

  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0 -z-10 sheet-wash mask-[radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <span aria-hidden className="beam-x top-30 [animation-delay:-2s]" />
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700">
              <span aria-hidden className="h-px w-7 bg-brand-500" />
              {t.contact.pageKicker}
            </p>
            <h1 className="mt-4 max-w-xl font-display text-[clamp(2rem,1.4rem+2.4vw,3rem)] font-extrabold leading-tight tracking-tight text-ink">
              {fill(t.contact.pageH1, { name: CONTACT.personThai, role: CONTACT.role })}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
              {fill(t.contact.pageLead, {
                person: CONTACT.person,
                role: CONTACT.role,
                n: CONTACT.teamSize,
              })}
            </p>
            <ol className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
              {["01 Requirement", "02 Scope", "03 Build", "04 Deploy"].map((step) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="size-1.5 bg-brand-500" />
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="relative overflow-hidden border border-slate-200 bg-[#0b1f3a] text-white shadow-lift">
            <span className="scan-line pointer-events-none absolute inset-x-0 top-0 h-16" />
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-2.5">
              <span className="size-2 rounded-full bg-[#ff5f57]" />
              <span className="size-2 rounded-full bg-[#febc2e]" />
              <span className="size-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                {t.contact.primary}
              </span>
            </div>
            <div className="p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-12 items-center justify-center bg-[#06C755]">
                  <LineGlyph className="size-6" />
                </span>
                <div>
                  <p className="text-sm text-white/55">LINE Official Account</p>
                  <p className="font-display text-3xl font-bold tracking-tight">{LINE_ID}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">{t.contact.primaryHint}</p>
              <LineButton className="mt-6 w-full">
                {t.contact.lineCta} {LINE_ID}
              </LineButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            <a
              href={CONTACT.phoneHref}
              className="group relative overflow-hidden border border-slate-800 bg-[#0b1f3a] px-6 py-7 text-white transition-colors hover:border-brand-400"
            >
              <span className="status-run" />
              <PhoneGlyph className="size-6 text-brand-200" />
              <p className="mt-8 text-sm font-medium text-white/55">
                {t.contact.call} {CONTACT.personThai}
              </p>
              <p className="mt-1 font-display text-3xl font-bold tracking-tight">{CONTACT.phoneDisplay}</p>
              <p className="mt-3 text-sm text-white/70">
                {t.contact.tapToCall} {CONTACT.person}
              </p>
            </a>

            <a
              href={CONTACT.pageFacebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden border border-slate-200 bg-white p-6 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
            >
              <span className="status-run" />
              <span className="inline-flex size-12 items-center justify-center bg-[#1877F2] text-white">
                <FacebookGlyph className="size-6" />
              </span>
              <p className="mt-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Facebook Page
              </p>
              <p className="mt-1 font-display text-xl font-bold text-ink">{CONTACT.pageFacebookLabel}</p>
              <p className="mt-2 text-sm text-brand-700">{CONTACT.pageFacebookName}</p>
            </a>

            <a
              href={CONTACT.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-45 flex-col justify-between overflow-hidden border border-slate-200 bg-[#f7f9fc] p-6 hover:border-brand-300"
            >
              <span className="status-run" />
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center bg-[#1877F2] text-white">
                  <FacebookGlyph className="size-5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {t.contact.personal}
                </span>
              </div>
              <div>
                <p className="font-display text-lg font-bold text-ink">{CONTACT.person}</p>
                <p className="mt-1 text-sm text-brand-700">{CONTACT.facebookLabel}</p>
              </div>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
