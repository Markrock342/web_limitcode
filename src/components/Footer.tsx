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
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
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
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#06C755] px-4 py-2 text-sm font-semibold text-white"
            >
              <LineGlyph className="size-4" />
              LINE OA: {LINE_ID}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold text-ink">{t.footer.services}</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/#services" className="hover:text-brand-700">{t.footer.booking}</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">{t.footer.crm}</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">{t.footer.dashboard}</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">{t.footer.ai}</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">{t.footer.work}</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/showcase" className="hover:text-brand-700">{t.footer.allWork}</Link></li>
                <li><Link href="/#clients" className="hover:text-brand-700">{t.footer.clients}</Link></li>
                <li><Link href="/demo/court-booking" className="hover:text-brand-700">SmashLane</Link></li>
                <li><Link href="/demo/field-crm" className="hover:text-brand-700">GuardNest CRM</Link></li>
                <li><Link href="/demo/ai-cms" className="hover:text-brand-700">NovaOracle AI</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">{t.footer.contact}</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/contact" className="hover:text-brand-700">{t.footer.contactUs}</Link></li>
                <li>
                  <a href={CONTACT.phoneHref} className="hover:text-brand-700">
                    {t.footer.call} {CONTACT.personThai} {CONTACT.phoneDisplay}
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
                  <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
                    LINE OA {LINE_ID}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
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
