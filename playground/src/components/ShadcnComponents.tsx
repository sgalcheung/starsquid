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

export function AccordionComponent({
	data
}: AccordionComponentProps) {
	return (
		<Accordion type="single" collapsible className="w-full">
			{data.map((item, index) => {
				return (
					<AccordionItem key={item.title} value={item.title}>
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
			{data.map((item) => {
				return (
					<AccordionItem key={item.label} value={item.label}>
						<AccordionTrigger>{item.label}</AccordionTrigger>
						{/* Render multiple clickable contents per trigger */}
						{item.items.map((subItem) => (
							<AccordionContent key={subItem.link}>
								<a
									href={subItem.link}
									className="text-blue-500 hover:underline"
								>
									{subItem.label}
								</a>
							</AccordionContent>
						))}
					</AccordionItem>
				);
			})}
		</Accordion>
	);
};
