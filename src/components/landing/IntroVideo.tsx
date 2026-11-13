"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

/** ไฟล์คลิปแนะนำตามภาษา — ภาษาไทยใช้ชื่อไฟล์เดิม */
const SUFFIX = { th: "", en: "-en", zh: "-zh" } as const;

export function IntroVideo() {
  const { t, locale } = useLocale();
  const base = `/video/limitcode-intro${SUFFIX[locale]}`;

  return (
    <section id="intro-video" data-analytics-region="homepage_video" className="scroll-mt-20 py-12 sm:py-16">
      <Container>
        <Reveal>
          <SectionHeading tag={t.video.tag} title={t.video.title} body={t.video.body} className="max-w-3xl" />
        </Reveal>

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-line bg-ink shadow-float">
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
