import type { Metadata } from "next";
import { cookies } from "next/headers";
import { IBM_Plex_Sans_Thai, Sora } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { htmlLang, LOCALE_COOKIE, parseLocale } from "@/lib/i18n/config";
import {
  defaultMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const thai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);

  return (
    <html
      lang={htmlLang(locale)}
      data-locale={locale}
      className={`${thai.variable} ${display.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-ink">
        <LocaleProvider initialLocale={locale}>
          <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
          {children}
          <AnalyticsTracker />
        </LocaleProvider>
      </body>
    </html>
  );
}
