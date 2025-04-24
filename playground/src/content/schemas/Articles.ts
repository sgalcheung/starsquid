import { z } from "astro/zod";
import { getSchema, nonMultilingualSchema } from "./common";
import type { ContentDtoType } from "desquidex/schemas";
import { getContentById, getContentByIds } from "@/scripts/clinet";

export const articleDataSchema = z.object({
  name: nonMultilingualSchema(z.string()),
  content: nonMultilingualSchema(z.string()),
});

export const articleSchema = getSchema(articleDataSchema);

export type ArticleSchemaType = ContentDtoType<typeof articleSchema>;


export async function getArticleById(id: string) {
  const result = await getContentById("articles", articleDataSchema, id);
  if (!result) {
    throw new Error(`Article with id ${id} not found`);
  }
  return result as ArticleSchemaType;
}

export async function getArticleByIds(ids: string[]) {
  const result = await getContentByIds("articles", articleDataSchema, ids);
  return result;
}
