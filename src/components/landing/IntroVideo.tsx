"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, CropFrame, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

/** ไฟล์คลิปแนะนำตามภาษา — ภาษาไทยใช้ชื่อไฟล์เดิม */
const SUFFIX = { th: "", en: "-en", zh: "-zh" } as const;

export function IntroVideo() {
  const { t, locale } = useLocale();
  const base = `/video/limitcode-intro${SUFFIX[locale]}`;

  return (
    <section id="intro-video" data-analytics-region="homepage_video" className="scroll-mt-20 pb-16 sm:pb-20">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionTag>{t.video.tag}</SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.6rem,1.15rem+1.8vw,2.3rem)] font-bold tracking-tight text-ink">
            {t.video.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">{t.video.body}</p>
        </Reveal>

        <Reveal className="mt-8">
          <CropFrame className="border border-slate-200 bg-ink">
            <video
              key={locale}
              className="block aspect-video w-full"
              controls
              playsInline
              preload="none"
              poster={`${base}.jpg`}
              width={1280}
              height={720}
            >
              <source src={`${base}.mp4`} type="video/mp4" />
              {t.video.fallback}
            </video>
          </CropFrame>
        </Reveal>
      </Container>
    </section>
  );
}
