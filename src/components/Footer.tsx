"use client";

import Link from "next/link";
import { BRAND, CONTACT, LINE_ID, LINE_URL } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Container, LineGlyph } from "./ui";
import { BrandWordmark, Logo } from "./Logo";

export function Footer() {
  const { t, locale } = useLocale();
  const tagline =
    locale === "th"
      ? BRAND.tagline
      : locale === "en"
        ? "Three-person freelance team, not a company. Websites, booking, CRM, and the tools a business actually uses."
        : "三人独立接案团队，不是公司。网站、预约、CRM，以及生意真正在用的那摊。";

  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#f7f9fc]">
      <div className="h-px bg-linear-to-r from-brand-600 via-brand-400 to-sky-400" />
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <Logo className="size-9" />
              <BrandWordmark />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{tagline}</p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="line_click"
              data-track-source="footer"
              data-track-label="LINE OA"
              className="mt-5 inline-flex items-center gap-2 bg-[#06C755] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <LineGlyph className="size-4" />
              LINE OA: {LINE_ID}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm min-[480px]:grid-cols-3">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                {t.footer.services}
              </p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/#services" className="hover:text-brand-700">{t.footer.booking}</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">{t.footer.crm}</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">{t.footer.dashboard}</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">{t.footer.ai}</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                {t.footer.work}
              </p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/showcase" className="hover:text-brand-700">{t.footer.allWork}</Link></li>
                <li><Link href="/#clients" className="hover:text-brand-700">{t.footer.clients}</Link></li>
                <li><Link href="/demo/court-booking" className="hover:text-brand-700">SmashLane</Link></li>
                <li><Link href="/demo/field-crm" className="hover:text-brand-700">GuardNest CRM</Link></li>
                <li><Link href="/demo/ai-cms" className="hover:text-brand-700">NovaOracle AI</Link></li>
              </ul>
            </div>
            <div className="col-span-2 min-[480px]:col-span-1">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                {t.footer.contact}
              </p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/contact" className="hover:text-brand-700">{t.footer.contactUs}</Link></li>
                <li>
                  <a href={CONTACT.phoneHref} className="hover:text-brand-700">
                    {t.footer.call} {CONTACT.personThai} {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.emailHref} className="break-all hover:text-brand-700">
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.salesEmailHref} className="break-all hover:text-brand-700">
                    {CONTACT.salesEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.pageFacebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-700"
                  >
                    {CONTACT.pageFacebookName}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.facebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-700"
                  >
                    Facebook {CONTACT.person}
                  </a>
                </li>
                <li>
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-event="line_click"
                    data-track-source="footer_contact_list"
                    data-track-label="LINE OA"
                    className="hover:text-brand-700"
                  >
                    LINE OA {LINE_ID}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LIMIT CODE STUDIO</p>
          <div className="flex flex-wrap items-center gap-3">
            <p>{t.footer.madeBy}</p>
            <LanguageSwitcher size="compact" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
