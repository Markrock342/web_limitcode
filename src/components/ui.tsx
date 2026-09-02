import Link from "next/link";
import { LINE_ID, LINE_URL } from "@/lib/site";
import { Icon } from "./Icon";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700">
      <span aria-hidden className="h-px w-7 bg-brand-500" />
      {children}
    </span>
  );
}

export function CropFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden className="pointer-events-none absolute -left-px -top-px z-2 size-2.5 border-l-[1.5px] border-t-[1.5px] border-brand-500" />
      <span aria-hidden className="pointer-events-none absolute -right-px -top-px z-2 size-2.5 border-r-[1.5px] border-t-[1.5px] border-brand-500" />
      <span aria-hidden className="pointer-events-none absolute -bottom-px -left-px z-2 size-2.5 border-b-[1.5px] border-l-[1.5px] border-brand-500" />
      <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px z-2 size-2.5 border-b-[1.5px] border-r-[1.5px] border-brand-500" />
      {children}
    </div>
  );
}

export function LineButton({
  className = "",
  children = `ปรึกษาฟรีผ่าน LINE OA`,
  showId = false,
}: {
  className?: string;
  children?: React.ReactNode;
  showId?: boolean;
}) {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-sheen group inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[#06C755] px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#06C755]/30 ${className}`}
    >
      <LineGlyph className="size-5 shrink-0" />
      <span>{children}</span>
      {showId && <span className="font-mono text-sm opacity-90">{LINE_ID}</span>}
      <Icon
        name="arrow"
        className="size-4 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
      />
    </a>
  );
}

export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3.5 text-base font-semibold text-brand-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 active:scale-[0.97] ${className}`}
    >
      {children}
    </Link>
  );
}

export function LineGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5c5.79 0 10.5 3.83 10.5 8.55 0 1.9-.74 3.6-2.27 5.27-1.5 1.7-3.86 3.62-7.06 5.65-.55.33-.94.04-.86-.5.05-.32.2-1.18.2-1.18.05-.36.1-.92-.04-1.27-.16-.4-.79-.6-1.25-.7C5.62 17.65 1.5 14.32 1.5 11.05 1.5 6.33 6.21 2.5 12 2.5ZM8.13 9.02a.5.5 0 0 0-.5.5v3.96a.5.5 0 0 0 1 0v-3.96a.5.5 0 0 0-.5-.5Zm9.62 0h-1.9a.34.34 0 0 0-.35.35v3.96c0 .19.16.35.35.35h1.9a.35.35 0 0 0 0-.7h-1.55v-.78h1.55a.35.35 0 0 0 0-.7h-1.55v-.78h1.55a.35.35 0 0 0 0-.7Zm-5.2 0a.5.5 0 0 0-.5.5v2.45l-1.96-2.69a.5.5 0 0 0-.9.3v3.9a.5.5 0 0 0 1 0v-2.45l1.97 2.7a.5.5 0 0 0 .89-.3V9.52a.5.5 0 0 0-.5-.5Zm1.62 0a.34.34 0 0 0-.35.35v3.96c0 .19.16.35.35.35h1.9a.35.35 0 0 0 0-.7h-1.55V9.37a.34.34 0 0 0-.35-.35Z" />
    </svg>
  );
}

export function PhoneGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.2 3.8h3.1l1.3 3.2-1.9 1.2a12.4 12.4 0 0 0 6.1 6.1l1.2-1.9 3.2 1.3v3.1c0 .7-.5 1.4-1.2 1.5-7.2 1.2-13.4-5-12.2-12.2.1-.7.8-1.3 1.4-1.3Z"
      />
    </svg>
  );
}

export function FacebookGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14.2 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6H17.5V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H8v3.2h2.8V22h3.4Z" />
    </svg>
  );
}
