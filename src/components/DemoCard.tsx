"use client";

import Link from "next/link";
import Image from "next/image";
import type { Demo } from "@/lib/demos";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { fill } from "@/lib/i18n/format";
import { CropFrame } from "./ui";
import { Icon } from "./Icon";

const cardClass =
  "group flex h-full flex-col border border-slate-200 bg-white transition-colors hover:border-brand-300";

function OssCover({
  demo,
  tagline,
  previewAlt,
}: {
  demo: Demo;
  tagline: string;
  previewAlt: string;
}) {
  if (demo.preview) {
    return (
      <Image
        src={demo.preview}
        alt={`${previewAlt} ${demo.name}`}
        fill
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px"
        className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 bg-linear-to-br ${demo.swatch} transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white">
        <Icon name={demo.icon} className="size-10" />
        <p className="font-display text-xl font-bold tracking-tight">{demo.name}</p>
        <p className="max-w-[18rem] text-xs text-white/80">{tagline}</p>
      </div>
    </div>
  );
}

export function DemoCard({ demo }: { demo: Demo }) {
  const { t } = useLocale();
  const href = demo.liveUrl ?? `/demo/${demo.slug}`;
  const isExternal = Boolean(demo.liveUrl);
  const isOss = Boolean(demo.openSource);
  const ctaLabel = isOss ? t.showcase.openOss : isExternal ? t.showcase.openLive : t.showcase.openDemo;
  const ossKind = demo.openSource?.kind ? t.showcase.ossKinds[demo.openSource.kind] : null;
  const badge = ossKind?.short ?? t.showcase.categories[demo.category];
  const tagline = ossKind?.label ?? demo.tagline;
  const description = ossKind
    ? fill(ossKind.about, { name: demo.name })
    : demo.description;

  const inner = (
    <>
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        {isOss ? (
          <OssCover demo={demo} tagline={tagline} previewAlt={t.showcase.previewAlt} />
        ) : (
          <Image
            src={demo.preview!}
            alt={`${t.showcase.previewAlt} ${demo.name}`}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px"
            className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-white/70 bg-white/92 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700 backdrop-blur">
          <Icon name={demo.icon} className="size-3.5" />
          {badge}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-ink/88 px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          {ctaLabel}
          <Icon name="arrow" className="size-3.5" />
        </span>
        {isOss ? (
          <span className="absolute right-3 top-3 bg-slate-900 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
            {t.showcase.ossBadge}
          </span>
        ) : isExternal ? (
          <span className="absolute right-3 top-3 bg-emerald-600 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
            Live
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink">{demo.name}</h3>
        <p className={`mt-0.5 text-sm font-medium ${demo.accentText}`}>{tagline}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {demo.tags.map((tag) => (
            <span
              key={tag}
              className="border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <CropFrame className="h-full">
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${cardClass} h-full`}>
          {inner}
        </a>
      </CropFrame>
    );
  }

  return (
    <CropFrame className="h-full">
      <Link href={href} className={`${cardClass} h-full`}>
        {inner}
      </Link>
    </CropFrame>
  );
}
