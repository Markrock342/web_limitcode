"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";

// DBD requires the supplied markup to remain unchanged. This is static,
// reviewed HTML from the approval email, never user-provided runtime input.
const DBD_MARKUP = `<a href='https://dbdregistered.dbd.go.th/api/public/shopinfo?param=6C25347AAAB4768EC0553C228C819831880F06364562B11E01A6320E3CE83443' target="_blank">
<img src='https://dbdregistered.dbd.go.th/api/public/banner?param=6C25347AAAB4768EC0553C228C819831880F06364562B11E01A6320E3CE83443' />
</a>`;

const subscribe = () => () => {};
const isApprovedDomain = () => window.location.hostname === "www.limitcode.shop";
const serverSnapshot = () => false;
const DBD_PROFILE_URL = "https://dbdregistered.dbd.go.th/api/public/shopinfo?param=6C25347AAAB4768EC0553C228C819831880F06364562B11E01A6320E3CE83443";

export function DbdRegistered() {
  const { locale } = useLocale();
  const approved = useSyncExternalStore(subscribe, isApprovedDomain, serverSnapshot);

  if (!approved) return null;

  return (
    <div
      role="group"
      aria-label="DBD Registered — Limitcode Studio"
      className="mt-6 w-80 max-w-full [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-brand-600 [&_img]:block [&_img]:h-auto [&_img]:max-w-full"
    >
      <div dangerouslySetInnerHTML={{ __html: DBD_MARKUP }} />
      <a
        href={DBD_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-xs font-medium text-brand-700 underline underline-offset-4"
      >
        {locale === "th"
          ? "ตรวจสอบ DBD Registered"
          : locale === "en"
            ? "Verify DBD Registered"
            : "查看 DBD 注册资料"}
      </a>
    </div>
  );
}
