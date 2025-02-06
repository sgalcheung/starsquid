import React, { useState } from "react";

interface Catalog {
	label: string;
	items?: {
		label: string;
		link: string;
	}[];
}

interface CatalogListProps {
	catalogs: Catalog[];
}

export default function CatalogList({ catalogs }: CatalogListProps) {
	const [openSections, setOpenSections] = useState<number[]>([]);

	const toggleSection = (index: number) => {
		setOpenSections((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
		);
	};

	return (
		<div className="w-full max-w-md mx-auto">
			{catalogs.map((course, index) => (
				<div key={course.label} className="mb-2">
					<button
						type="button"
						className="flex justify-between items-center w-full p-4 text-left bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						onClick={() => toggleSection(index)}
					>
						<span className="text-lg font-medium">{course.label}</span>
						<span
							className={`transition-transform${
								openSections.includes(index)
									? " transform rotate-180"
									: ""
							}`}
						>
							{/* We'll replace this with an Astro Icon */}
							<span className="icon-placeholder" />
						</span>
					</button>
					{openSections.includes(index) && course.items && (
						<div className="mt-2 ml-4">
							{course.items.map((subsection) => (
								<div key={subsection.link} className="py-2">
									<h3 className="text-md font-medium">{subsection.label}</h3>
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
