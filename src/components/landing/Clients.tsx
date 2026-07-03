import Image from "next/image";
import { CLIENTS } from "@/lib/site";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Clients() {
  return (
    <section id="clients" className="scroll-mt-20 border-t border-slate-100 bg-slate-50/60 py-16 sm:py-20">
      <Container>
        <Reveal className="text-center">
          <SectionTag>ลูกค้าของเรา</SectionTag>
        </Reveal>

        <Reveal className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {CLIENTS.map((client) => (
              <li key={client.name}>
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center rounded-2xl border border-transparent bg-white px-8 py-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-lift"
                  aria-label={client.name}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={client.width}
                    height={client.height}
                    className="h-8 w-auto max-w-[180px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-10 sm:max-w-[220px]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
