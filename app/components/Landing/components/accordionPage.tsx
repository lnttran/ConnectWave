import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
    return (
        <Accordion type="single" collapsible className="w-full dark:bg-[#2F3046] bg-white rounded-3xl dark:text-gray-50 text-gray-900 font-logo-font lg:text-[2rem] p-10">
            <AccordionItem value="item-1">
                <AccordionTrigger >Why chose us?</AccordionTrigger>
                <AccordionContent >
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>How it works?</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" >
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
