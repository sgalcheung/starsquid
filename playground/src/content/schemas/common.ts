import { z } from "astro/zod";

export enum SQUIDEX_CONTENT_SCHEMAS {
  INTRODUCTIONS = "introductions",
  // ARTICLES = "articles",
}

export const idSchema = z.object({
	id: z.string(),
});

export const componentSchema = z.object({
	schemaId: z.string().optional(),
	schemaName: z.string().optional(),
});

export function nonMultilingualSchema<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		iv: schema,
	});
}
