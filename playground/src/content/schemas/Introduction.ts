import { componentSchema, nonMultilingualSchema } from "./common";
import { z } from "astro/zod";

const loadNonMultilingualSchema = async () => {
	const { nonMultilingualSchema } = await import("./common");
	return nonMultilingualSchema;
};

const chapters = z.array(
	z
		.object({
			title: z.string(),
			articles: z.array(z.string()),
		})
		.merge(componentSchema),
);
// export const introductionSchema = async (): Promise<z.ZodTypeAny> => {
//   // const nonMultilingualSchema = await loadNonMultilingualSchema();
//   return await z.object({
//     title: nonMultilingualSchema(z.string()),
//     description: nonMultilingualSchema(z.string()),
//     chapters: nonMultilingualSchema(chapters),
//     slug: nonMultilingualSchema(z.string()),
//   });
// };

export const introductionSchema = z.object({
	title: nonMultilingualSchema(z.string()),
	description: nonMultilingualSchema(z.string()),
	chapters: nonMultilingualSchema(chapters),
	slug: nonMultilingualSchema(z.string()),
});

// export type IntroductionSchemaType = z.infer<typeof introductionSchema>;
// export type IntroductionSchemaType = z.infer<
//   Awaited<ReturnType<typeof introductionSchema>>
// >;

// export const introductionSchemaInstance = await introductionSchema();
