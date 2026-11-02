import { amenities } from "@/lib/content";
import { AmenitiesCarousel } from "@/components/sections/amenities-carousel";
import { Eyebrow, MaskText } from "@/components/reveal";

export function Amenities() {
  return (
    <section
      id="experiencias"
      aria-labelledby="experiencias-title"
      className="on-dark overflow-hidden bg-ink py-28 text-cream lg:py-40"
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Eyebrow index="05" className="text-champagne">
          Experiências
        </Eyebrow>
        <MaskText
          id="experiencias-title"
          lines={["Um clube privado", <em key="i" className="italic">dentro de casa.</em>]}
          className="mt-6 mb-16 font-display text-title font-light lg:mb-24"
        />
        <AmenitiesCarousel items={amenities} />
      </div>
    </section>
  );
}
