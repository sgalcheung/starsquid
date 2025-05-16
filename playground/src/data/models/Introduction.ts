import { getCollection, type CollectionEntry } from "astro:content";
import { getReferences } from "../core/client";
import type { NonMultilingual } from "../internals/NonMultilingualT";
import type { Chapter } from "./Chapter";
import { SCHEMAS } from "./schemas";

export interface Introduction {
  title: NonMultilingual<string>,
  description: NonMultilingual<string>,
  chapters: NonMultilingual<Array<Chapter>>,
  slug: NonMultilingual<string>,
  author: NonMultilingual<Array<string>>,
}

interface IntroductionReference {
  name: NonMultilingual<string>,
}

export type IntroductionCollectionType = CollectionEntry<(typeof SCHEMAS)["INTRODUCTIONS"]>;

export async function getAllIntroductions() {
  const introductions = await getCollection(SCHEMAS.INTRODUCTIONS);
  return introductions
    .sort((a, b) => (a.data.created < b.data.created ? 1 : -1));
}

export async function getIntroductionBySlug(slug: string) {
  return (await getCollection(SCHEMAS.INTRODUCTIONS, ({ data }) => {
    return data.data?.slug.iv === slug;
  }))[0];
}

export async function getIntroductionReferences(id: string) {
  const references = await getReferences<IntroductionReference>(SCHEMAS.INTRODUCTIONS, id);
  return references.items.filter(item => item.schemaName === SCHEMAS.ARTICLES);
}
