import { getCollection, getEntry, reference } from "astro:content";
import { componentSchema, nonMultilingualSchema, SQUIDEX_CONTENT_SCHEMAS } from "./common";
import { z } from "astro/zod";
import { getReferencesById } from "@/scripts/clinet";

const chapters = z.array(
  z
    .object({
      title: z.string(),
      articles: z.array(z.string()),
    })
    .merge(componentSchema),
);

export const introductionSchema = z.object({
  title: nonMultilingualSchema(z.string()),
  description: nonMultilingualSchema(z.string()),
  chapters: nonMultilingualSchema(chapters),
  slug: nonMultilingualSchema(z.string()),
  author: nonMultilingualSchema(z.array(reference(SQUIDEX_CONTENT_SCHEMAS.AUTHORS))),
});

const introductionReferencesSchema = z.object({
  name: nonMultilingualSchema(z.string()),
});

export async function getAllIntroductions() {
  const introductions = await getCollection(SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS);
  return introductions
    .sort((a, b) => (a.data.created < b.data.created ? 1 : -1));
}

export async function getIntroductionBySlug(slug: string) {
  const introduction = await getEntry(SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS, slug);
  return introduction;
}

export async function getIntroductionReferencesById(id: string) {
  const references = await getReferencesById(
    SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS, 
    introductionReferencesSchema, 
    id);
  return references;
}
