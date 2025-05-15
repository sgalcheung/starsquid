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

export async function getIntroductionReferences(id: string) {
  const references = await getReferences<IntroductionReference>(SCHEMAS.INTRODUCTIONS, id);
  return references.items.filter(item => item.schemaName === SCHEMAS.ARTICLES);
}
