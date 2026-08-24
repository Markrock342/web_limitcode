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
                    className="client-logo h-9 w-auto max-w-[160px] object-contain sm:h-11 sm:max-w-[220px]"
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
