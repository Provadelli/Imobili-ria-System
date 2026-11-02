import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Market } from "@/components/sections/market";
import { Residences } from "@/components/sections/residences";
import { ScrollShowcase } from "@/components/sections/scroll-showcase";
import { Amenities } from "@/components/sections/amenities";
import { About } from "@/components/sections/about";
import { Team } from "@/components/sections/team";
import { Location } from "@/components/sections/location";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex w-full flex-col outline-none">
        <Hero />
        <Manifesto />
        <Market />
        <Residences />
        <ScrollShowcase />
        <Amenities />
        <About />
        <Team />
        <Location />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
