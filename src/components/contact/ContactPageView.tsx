"use client";

import {
  Container,
  CropFrame,
  EmailGlyph,
  FacebookGlyph,
  LineButton,
  LineGlyph,
  PhoneGlyph,
} from "@/components/ui";
import { CONTACT, LINE_ID } from "@/lib/site";
import { fill } from "@/lib/i18n/format";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { ContactMesh } from "./ContactMesh";
import { ChannelCard } from "./ChannelCard";

const STEPS = ["01 Requirement", "02 Scope", "03 Build", "04 Deploy"];

export function ContactPageView() {
  const { t } = useLocale();

  return (
    <main className="contact-stage">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0 -z-10 sheet-wash mask-[radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <ContactMesh />
        <span aria-hidden className="beam-x top-30 [animation-delay:-2s]" />
        <span aria-hidden className="beam-x top-[68%] [animation-delay:2.4s] [animation-duration:11s]" />
        <span aria-hidden className="beam-y left-[18%] [animation-delay:-5s]" />
        <div className="pointer-events-none absolute -top-24 -left-24 -z-10 size-88 animate-aurora rounded-full bg-brand-300/25 blur-3xl" />
        <div className="pointer-events-none absolute top-10 -right-16 -z-10 size-72 animate-aurora rounded-full bg-sky-300/20 blur-3xl [animation-delay:-8s]" />

        <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="contact-boot">
            <p className="inline-flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700">
              <span aria-hidden className="contact-ping size-1.5 bg-brand-500" />
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
            <div className="mt-7">
              <div className="relative mb-3 hidden h-px overflow-hidden bg-slate-200 sm:block">
                <span
                  aria-hidden
                  className="contact-rail pointer-events-none absolute top-0 left-0 h-px w-20 bg-linear-to-r from-transparent via-brand-500 to-transparent"
                />
              </div>
              <ol className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
                {STEPS.map((step) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="size-1.5 bg-brand-500" />
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <CropFrame className="contact-console relative overflow-hidden border border-slate-200 bg-[#0b1f3a] text-white shadow-lift">
            <span className="scan-line pointer-events-none absolute inset-x-0 top-0 h-16" />
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-2.5">
              <span className="size-2 rounded-full bg-[#ff5f57]" />
              <span className="size-2 rounded-full bg-[#febc2e]" />
              <span className="size-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                {t.contact.primary}
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300/90">
                <span aria-hidden className="contact-ping size-1.5 rounded-full bg-emerald-400" />
                link.ok
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
          </CropFrame>
        </Container>
      </section>

      <section className="relative overflow-hidden py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 sheet-wash opacity-60" />
        <Container className="relative">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ChannelCard
              href={CONTACT.phoneHref}
              delay={80}
              className="border border-slate-800 bg-[#0b1f3a] px-6 py-7 text-white hover:border-brand-400"
            >
              <PhoneGlyph className="size-6 text-brand-200" />
              <p className="mt-8 text-sm font-medium text-white/55">
                {t.contact.call} {CONTACT.personThai}
              </p>
              <p className="mt-1 font-display text-2xl font-bold tracking-tight">{CONTACT.phoneDisplay}</p>
              <p className="mt-3 text-sm text-white/70">
                {t.contact.tapToCall} {CONTACT.person}
              </p>
            </ChannelCard>

            <ChannelCard
              delay={160}
              className="border border-brand-700 bg-brand-800 px-6 py-7 text-white hover:border-brand-400"
            >
              <EmailGlyph className="size-6 text-brand-200" />
              <p className="mt-8 text-sm font-medium text-white/55">{t.contact.email}</p>
              <a
                href={CONTACT.emailHref}
                className="mt-1 block break-all font-display text-lg font-bold tracking-tight hover:underline sm:text-xl"
              >
                {CONTACT.email}
              </a>
              <p className="mt-4 text-sm font-medium text-white/55">{t.contact.salesEmail}</p>
              <a
                href={CONTACT.salesEmailHref}
                className="mt-1 block break-all font-display text-lg font-bold tracking-tight hover:underline sm:text-xl"
              >
                {CONTACT.salesEmail}
              </a>
            </ChannelCard>

            <ChannelCard
              href={CONTACT.pageFacebookHref}
              external
              delay={240}
              className="border border-slate-200 bg-white p-6 hover:border-brand-300"
            >
              <span className="inline-flex size-12 items-center justify-center bg-[#1877F2] text-white">
                <FacebookGlyph className="size-6" />
              </span>
              <p className="mt-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Facebook Page
              </p>
              <p className="mt-1 font-display text-xl font-bold text-ink">{CONTACT.pageFacebookLabel}</p>
              <p className="mt-2 text-sm text-brand-700">{CONTACT.pageFacebookName}</p>
            </ChannelCard>

            <ChannelCard
              href={CONTACT.facebookHref}
              external
              delay={320}
              className="flex min-h-45 flex-col justify-between border border-slate-200 bg-[#f7f9fc] p-6 hover:border-brand-300"
            >
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
            </ChannelCard>
          </div>
        </Container>
      </section>
    </main>
  );
}
