import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-surface py-space-xl">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="mb-space-lg text-center">
          <span className="mb-space-xs block text-label-md uppercase tracking-[0.2em] text-secondary">
            Perguntas Frequentes
          </span>
          <h2 id="faq-heading" className="font-heading text-headline-lg text-primary">
            Tudo o que você precisa saber
          </h2>
        </div>

        <Accordion type="single" collapsible className="gap-2">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-outline-variant/30">
              <AccordionTrigger className="font-heading text-headline-sm text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-body-md text-on-surface-variant">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
