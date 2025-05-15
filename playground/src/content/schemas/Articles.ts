import { z } from "astro/zod";
import { getSchema, nonMultilingualSchema } from "./common";
import type { ContentDtoType } from "starsquid/schemas";

export const articleDataSchema = z.object({
  name: nonMultilingualSchema(z.string()),
  content: nonMultilingualSchema(z.string()),
});

export const articleSchema = getSchema(articleDataSchema);

export type ArticleDtoType = ContentDtoType<typeof articleSchema>;
