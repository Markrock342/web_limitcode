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
  iconOnly = false,
}: {
  className?: string;
  children?: React.ReactNode;
  showId?: boolean;
  iconOnly?: boolean;
}) {
  const label = typeof children === "string" ? children : "LINE OA";
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={iconOnly ? label : undefined}
      className={
        iconOnly
          ? `btn-sheen inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#06C755] text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#06C755]/30 ${className}`
          : `btn-sheen group inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[#06C755] px-5 py-3 text-sm font-semibold text-pretty text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#06C755]/30 sm:gap-2.5 sm:px-6 sm:py-3.5 sm:text-base ${className}`
      }
    >
      <LineGlyph className="size-5 shrink-0" />
      {iconOnly ? null : <span className="min-w-0 text-center">{children}</span>}
      {showId && !iconOnly ? <span className="font-mono text-sm opacity-90">{LINE_ID}</span> : null}
      {iconOnly ? null : (
        <Icon
          name="arrow"
          className="hidden size-4 -translate-x-0.5 opacity-0 transition-all sm:block group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}
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
      className={`group inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 active:scale-[0.97] sm:px-6 sm:py-3.5 sm:text-base ${className}`}
    >
      {children}
    </Link>
  );
}

export function LineGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`aspect-square shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
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

export function EmailGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="1.6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.2 7.2 7.8 6.2 7.8-6.2" />
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
