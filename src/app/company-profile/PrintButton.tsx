"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-sheen inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-400"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-4">
        <path d="M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" strokeLinecap="round" />
        <path d="M7 8V4h10v4M7 14h10v6H7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      พิมพ์ / บันทึกเป็น PDF
    </button>
  );
}
