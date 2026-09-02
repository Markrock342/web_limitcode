export const LOCALES = ["th", "en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "th";
export const LOCALE_COOKIE = "lcs-locale";

export type LocaleMeta = {
  id: Locale;
  /** Short code on the button / menu — user asked ENG TH ZN */
  code: "ENG" | "TH" | "ZN";
  /** Label on the closed pill, matching the KindGo-style control */
  pill: string;
  htmlLang: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { id: "en", code: "ENG", pill: "ENGLISH", htmlLang: "en" },
  th: { id: "th", code: "TH", pill: "ไทย", htmlLang: "th" },
  zh: { id: "zh", code: "ZN", pill: "中文", htmlLang: "zh-CN" },
};

export const LOCALE_ORDER: Locale[] = ["en", "th", "zh"];

export function isLocale(value: unknown): value is Locale {
  return value === "th" || value === "en" || value === "zh";
}

export function parseLocale(value: string | undefined | null): Locale {
  if (isLocale(value)) return value;
  return DEFAULT_LOCALE;
}

export function htmlLang(locale: Locale): string {
  return LOCALE_META[locale].htmlLang;
}
