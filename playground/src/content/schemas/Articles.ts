import { z } from "astro/zod";
import { nonMultilingualSchema } from "./common";

const loadNonMultilingualSchema = async () => {
	const { nonMultilingualSchema } = await import("./common");
	return nonMultilingualSchema;
};

// export const articleSchema = async (): Promise<z.ZodTypeAny> => {
//   const nonMultilingualSchema = await loadNonMultilingualSchema();
//   return await z.object({
//     name: nonMultilingualSchema(z.string()),
//     content: nonMultilingualSchema(z.string()),
//   });
// };

export const articleSchema = z.object({
	name: nonMultilingualSchema(z.string()),
	content: nonMultilingualSchema(z.string()),
});

// export type ArticleSchemaType = z.infer<typeof articleSchema>;

// export const articleSchemaInstance = await articleSchema();
