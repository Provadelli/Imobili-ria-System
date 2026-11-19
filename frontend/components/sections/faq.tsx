import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, MaskText, Reveal } from "@/components/reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="defer-render bg-cream py-28 lg:py-40">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <Eyebrow index="09">Dúvidas</Eyebrow>
          <MaskText
            id="faq-title"
            lines={["Perguntas", <em key="i" className="italic">frequentes.</em>]}
            className="mt-6 font-display text-title font-light"
          />
        </div>

        <Reveal delay={0.1} className="lg:col-span-8">
          <Accordion type="single" collapsible className="border-t border-line">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-b border-line">
                <AccordionTrigger className="items-center gap-6 rounded-none py-7 font-display text-2xl font-normal hover:no-underline lg:text-3xl **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-ink">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-8 text-base leading-relaxed text-stone">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
