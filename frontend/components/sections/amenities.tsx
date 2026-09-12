import { amenities } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { AmenitiesCarousel } from "@/components/sections/amenities-carousel";

export function Amenities() {
  return (
    <section aria-labelledby="amenidades-heading" className="mx-auto max-w-7xl px-6 py-space-xl lg:px-12">
      <Reveal className="mx-auto mb-space-lg max-w-2xl text-center">
        <span className="mb-space-xs block text-label-md uppercase tracking-[0.2em] text-secondary">
          Comodidades Exclusivas
        </span>
        <h2 id="amenidades-heading" className="mb-4 font-heading text-headline-lg text-primary">
          Um clube privativo à sua disposição
        </h2>
        <p className="text-body-md text-on-surface-variant">
          Amenidades de nível internacional integradas ao seu dia a dia para
          proporcionar bem-estar sem sair de casa.
        </p>
      </Reveal>

      <AmenitiesCarousel items={amenities} />
    </section>
  );
}
