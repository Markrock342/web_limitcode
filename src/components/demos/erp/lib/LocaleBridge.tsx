"use client";

import { useEffect } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useErp } from "@/components/demos/erp/lib/store";

/** ERP internals are TH/EN only — ZN follows English. */
export function ErpLocaleBridge() {
  const { locale } = useLocale();
  const setLanguage = useErp().setLanguage;

  useEffect(() => {
    setLanguage(locale === "th" ? "th" : "en");
  }, [locale, setLanguage]);

  return null;
}
