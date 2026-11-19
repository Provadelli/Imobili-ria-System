import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Numbers } from "@/components/sections/numbers";
import { Properties } from "@/components/sections/properties";
import { PlanSection } from "@/components/sections/plan-section";
import { Amenities } from "@/components/sections/amenities";
import { About } from "@/components/sections/about";
import { Team } from "@/components/sections/team";
import { Location } from "@/components/sections/location";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex w-full flex-col outline-none">
        <Hero />
        <Numbers />
        <Properties />
        <PlanSection />
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
