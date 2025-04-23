import { z } from "astro/zod";
import { nonMultilingualSchema } from "./common";
import { squidexClient } from "../../scripts/clinet";
import { contentDtoSchema } from "desquidex/schemas";
import type { CollectionEntry } from "astro:content";

type articleData = CollectionEntry<'article'>["data"];

export const articleSchema: articleData = z.object({
  name: nonMultilingualSchema(z.string()),
  content: nonMultilingualSchema(z.string()),
});


export async function getArticleById(id: string) {
  const article = await squidexClient.contents.getContent("articles", id);
  const parsedContentsSchema = contentDtoSchema(articleSchema);
  const parsedContents =
    await parsedContentsSchema.safeParseAsync(article);
  const result= parsedContents.success ? parsedContents.data : null;
  return result;
}
