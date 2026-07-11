import Image from "next/image";
import { CLIENTS } from "@/lib/site";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Clients() {
  return (
    <section id="clients" className="scroll-mt-20 border-t border-slate-100 py-16 sm:py-20">
      <Container>
        <Reveal className="text-center">
          <SectionTag>ลูกค้าของเรา</SectionTag>
        </Reveal>

        <Reveal className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
            {CLIENTS.map((client) => (
              <li key={client.name}>
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                  aria-label={client.name}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={client.width}
                    height={client.height}
                    className="h-8 w-auto max-w-[180px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10 sm:max-w-[220px]"
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
