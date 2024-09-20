import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// https://ui.shadcn.com/docs/components/accordion
// standard
interface AccordionComponentProps {
  data: {
    title: string;
    description: string;
  }[];
}

export const AccordionComponent: React.FC<{
  data: AccordionComponentProps["data"];
}> = ({ data }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((item, index) => {
        return (
          <AccordionItem key={index} value={`item-${index.toFixed()}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

interface CatalogComponentProps {
  data: {
    label: string;
    items: {
      label: string;
      link: string;
    }[];
  }[];
}

export const CatalogComponent: React.FC<{
  data: CatalogComponentProps["data"];
}> = ({ data }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((item, index) => {
        return (
          <AccordionItem key={index} value={`item-${index.toFixed()}`}>
            <AccordionTrigger>{item.label}</AccordionTrigger>
            {/* Render multiple clickable contents per trigger */}
            {item.items.map((item, contentIndex) => (
              <AccordionContent key={contentIndex}>
                <a href={item.link} className="text-blue-500 hover:underline">
                  {item.label}
                </a>
              </AccordionContent>
            ))}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
