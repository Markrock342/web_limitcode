"use client";

import Image from "next/image";
import { CLIENTS } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Clients() {
  const { t } = useLocale();

  return (
    <section id="clients" className="relative scroll-mt-20 bg-white py-12 sm:py-14">
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

      <Container>
        <Reveal>
          <div className="flex items-center justify-center gap-5">
            <span aria-hidden className="h-px w-14 bg-gradient-to-r from-transparent to-violet-400 sm:w-24" />
            <p className="bg-gradient-to-r from-violet-700 to-brand-600 bg-clip-text font-display text-lg font-bold text-transparent sm:text-xl">
              {t.clients.tag}
            </p>
            <span aria-hidden className="h-px w-14 bg-gradient-to-l from-transparent to-brand-400 sm:w-24" />
          </div>
        </Reveal>

        <ul className="mt-8 grid grid-cols-3 items-center gap-y-6 lg:grid-cols-6">
          {CLIENTS.map((client, i) => (
            <Reveal as="li" key={client.name} delay={i * 80} variant="scale">
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={client.name}
                className="group flex h-20 items-center justify-center px-3 sm:px-5"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className={`w-auto object-contain transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 ${
                    client.height > client.width ? "h-16 sm:h-20" : "max-h-10 max-w-full sm:max-h-11"
                  }`}
                />
              </a>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
