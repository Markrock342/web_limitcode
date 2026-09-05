import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { WhyUs } from "@/components/landing/WhyUs";
import { Process } from "@/components/landing/Process";
import { UseCases } from "@/components/landing/UseCases";
import { ShowcasePreview } from "@/components/landing/ShowcasePreview";
import { TechStack } from "@/components/landing/TechStack";
import { Clients } from "@/components/landing/Clients";
import { Contact } from "@/components/landing/Contact";
import { Pricing } from "@/components/landing/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <ShowcasePreview />
        <UseCases />
        <Services />
        <Pricing />
        <WhyUs />
        <Process />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
