"use client";

import { useSyncExternalStore } from "react";

// DBD requires the supplied markup to remain unchanged. This is static,
// reviewed HTML from the approval email, never user-provided runtime input.
const DBD_MARKUP = `<a href='https://dbdregistered.dbd.go.th/api/public/shopinfo?param=6C25347AAAB4768EC0553C228C819831880F06364562B11E01A6320E3CE83443' target="_blank">
<img src='https://dbdregistered.dbd.go.th/api/public/banner?param=6C25347AAAB4768EC0553C228C819831880F06364562B11E01A6320E3CE83443' />
</a>`;

const subscribe = () => () => {};
const isApprovedDomain = () => window.location.hostname === "www.limitcode.shop";
const serverSnapshot = () => false;

export function DbdRegistered() {
  const approved = useSyncExternalStore(subscribe, isApprovedDomain, serverSnapshot);

  if (!approved) return null;

  return (
    <div
      aria-label="DBD Registered — Limitcode Studio"
      className="mt-6 w-80 max-w-full [&_a]:block [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-brand-600 [&_img]:block [&_img]:h-auto [&_img]:max-w-full"
      dangerouslySetInnerHTML={{ __html: DBD_MARKUP }}
    />
  );
}
