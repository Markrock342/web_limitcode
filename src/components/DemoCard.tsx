import Link from "next/link";
import Image from "next/image";
import type { Demo } from "@/lib/demos";
import { Icon } from "./Icon";

export function DemoCard({ demo }: { demo: Demo }) {
  return (
    <Link
      href={`/demo/${demo.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
    >
      {/* real preview */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={demo.preview}
          alt={`ตัวอย่างเว็บ ${demo.name}`}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          <Icon name={demo.icon} className="size-3.5" />
          {demo.category}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          เปิดดูตัวอย่าง
          <Icon name="arrow" className="size-3.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink">{demo.name}</h3>
        <p className={`mt-0.5 text-sm font-medium ${demo.accentText}`}>{demo.tagline}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{demo.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {demo.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
