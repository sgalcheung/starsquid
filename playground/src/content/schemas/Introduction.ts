import { getEntry, type CollectionEntry } from "astro:content";
import { componentSchema, nonMultilingualSchema, SQUIDEX_CONTENT_SCHEMAS } from "./common";
import { z } from "astro/zod";
import { type ContentDtoType, type ContentsDtoType } from "starsquid/schemas";
const chapters = z.array(
  z
    .object({
      title: z.string(),
      articles: z.array(z.string()),
    })
    .merge(componentSchema),
);

export const introductionDataSchema = z.object({
  title: nonMultilingualSchema(z.string()),
  description: nonMultilingualSchema(z.string()),
  chapters: nonMultilingualSchema(chapters),
  slug: nonMultilingualSchema(z.string()),
  // author: nonMultilingualSchema(z.array(reference(SQUIDEX_CONTENT_SCHEMAS.AUTHORS))),
  author: nonMultilingualSchema(z.array(z.string())),
});

export type IntroductionDataSchemaType = z.infer<typeof introductionDataSchema>;
export type IntroductionDtoType = ContentDtoType<typeof introductionDataSchema>;
export type IntroductionCollectionType = CollectionEntry<typeof SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS>;

const introductionReferencesSchema = z.object({
  name: nonMultilingualSchema(z.string()),
});

export type IntroductionReferencesSchemaType = z.infer<typeof introductionReferencesSchema>;
export type IntroductionReferenceDtoType = ContentDtoType<typeof introductionReferencesSchema>;
export type IntroductionReferencesDtoType = ContentsDtoType<typeof introductionReferencesSchema>;

// export async function getAllIntroductions() {
//   const introductions = await getCollection(SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS);
//   return introductions
//     .sort((a, b) => (a.data.created < b.data.created ? 1 : -1));
// }

export async function getIntroductionBySlug(slug: string) {
  const introduction = await getEntry(SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS, slug);
  return introduction;
}
