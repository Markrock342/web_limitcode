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
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700">
      <span className="size-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
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
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#06C755] px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-4 focus-visible:ring-[#06C755]/30 ${className}`}
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
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3.5 text-base font-semibold text-brand-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 ${className}`}
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
