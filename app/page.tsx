import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { HighlightsBar } from "@/components/sections/highlights-bar";
import { ScrollShowcase } from "@/components/sections/scroll-showcase";
import { About } from "@/components/sections/about";
import { Differentials } from "@/components/sections/differentials";
import { Residences } from "@/components/sections/residences";
import { Amenities } from "@/components/sections/amenities";
import { Location } from "@/components/sections/location";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex w-full flex-col">
        <Hero />
        <HighlightsBar />
        <ScrollShowcase />
        <About />
        <Differentials />
        <Residences />
        <Amenities />
        <Location />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
