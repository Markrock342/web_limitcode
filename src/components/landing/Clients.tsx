"use client";

import Image from "next/image";
import { CLIENTS } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, CropFrame, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Clients() {
  const { t } = useLocale();

  return (
    <section id="clients" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionTag>{t.clients.tag}</SectionTag>
        </Reveal>

        <Reveal className="mt-8">
          <CropFrame className="border border-slate-200 bg-white">
            <div className="sheet-wash px-6 py-10 sm:px-10 sm:py-12">
              <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 sm:gap-y-10">
                {CLIENTS.map((client) => (
                  <li key={client.name}>
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="client-link inline-flex items-center justify-center"
                      aria-label={client.name}
                    >
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={client.width}
                        height={client.height}
                        className={
                          client.height > client.width
                            ? "client-logo h-20 w-auto max-w-[120px] object-contain sm:h-24 sm:max-w-[140px]"
                            : "client-logo h-9 w-auto max-w-[160px] object-contain sm:h-11 sm:max-w-[220px]"
                        }
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </CropFrame>
        </Reveal>
      </Container>
    </section>
  );
}
