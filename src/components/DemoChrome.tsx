import Link from "next/link";
import { DEMOS, type Demo } from "@/lib/demos";
import { LINE_URL } from "@/lib/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { LineGlyph } from "./ui";

export function DemoChrome({
  demo,
  children,
}: {
  demo: Demo;
  children: React.ReactNode;
}) {
  const others = DEMOS.filter((d) => d.slug !== demo.slug);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Studio bar — shows this is a demo viewed through LIMIT CODE STUDIO */}
      <div className="sticky top-0 z-50 border-b border-slate-800 bg-ink text-white">
        <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/showcase" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white">
            <Icon name="arrow" className="size-4 rotate-180" />
            <span className="hidden sm:inline">กลับไปดูผลงานทั้งหมด</span>
            <span className="sm:hidden">ผลงานทั้งหมด</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-white/60">
            <Logo className="size-6" />
            <span className="hidden md:inline">ตัวอย่างจาก</span>
            <span className="font-display font-bold text-white">LIMIT CODE STUDIO</span>
            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
              DEMO
            </span>
          </div>

          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#06C755] px-3.5 py-1.5 text-xs font-semibold text-white"
          >
            <LineGlyph className="size-4" />
            <span className="hidden sm:inline">อยากได้แบบนี้ ทักเลย</span>
            <span className="sm:hidden">ทัก LINE</span>
          </a>
        </div>
      </div>

      {/* The demo itself */}
      <div className="flex-1">{children}</div>

      {/* Switch to other demos + CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-ink">ดูตัวอย่างแนวอื่นต่อ</p>
              <p className="mt-1 text-sm text-slate-600">
                ตัวอย่างทั้งหมดนี้ออกแบบและพัฒนาโดยทีม LIMIT CODE STUDIO
              </p>
            </div>
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50"
            >
              ดูทั้งหมด
              <Icon name="arrow" className="size-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((d) => {
              const href = d.liveUrl ?? `/demo/${d.slug}`;
              const linkClass =
                "group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft";
              const content = (
                <>
                  <span
                    className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${d.swatch} text-white`}
                  >
                    <Icon name={d.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-bold text-ink">{d.name}</span>
                    <span className="block truncate text-xs text-slate-500">{d.category}</span>
                  </span>
                </>
              );

              return d.liveUrl ? (
                <a
                  key={d.slug}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {content}
                </a>
              ) : (
                <Link key={d.slug} href={href} className={linkClass}>
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-slate-700">
              <span className="font-semibold text-ink">สนใจทำเว็บแนวนี้?</span>{" "}
              ทักมาคุยรายละเอียดและประเมินราคาเบื้องต้นได้เลย
            </p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#06C755] px-5 py-2.5 text-sm font-semibold text-white"
            >
              <LineGlyph className="size-4" />
              ปรึกษาฟรีผ่าน LINE OA
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
