import { z } from "astro/zod";
import { getSchema, nonMultilingualSchema, SQUIDEX_CONTENT_SCHEMAS } from "./common";
import type { ContentDtoType } from "starsquid/schemas";
import { getContentById, getContentByIds, getReferencing } from "@/scripts/clinet";
import { introductionDataSchema } from "./Introduction";

export const articleDataSchema = z.object({
  name: nonMultilingualSchema(z.string()),
  content: nonMultilingualSchema(z.string()),
});

export const articleSchema = getSchema(articleDataSchema);

export type ArticleSchemaType = ContentDtoType<typeof articleSchema>;


export async function getArticleById(id: string) {
  const result = await getContentById(SQUIDEX_CONTENT_SCHEMAS.ARTICLES, articleDataSchema, id);
  if (!result) {
    throw new Error(`Article with id ${id} not found`);
  }
  return result;
}

export async function getArticleByIds(ids: string[]) {
  const result = await getContentByIds(SQUIDEX_CONTENT_SCHEMAS.ARTICLES, articleDataSchema, ids);
  return result;
}

// 1:n, only restuns the first one
export async function getArticleReferencing(id: string) {
  const referencing = await getReferencing(
    SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS,
    introductionDataSchema,
    id);
  return referencing.items[0];
}
