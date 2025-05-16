import { getContentById, getContentsByIds, getReferencing } from "../core/client";
import type { NonMultilingual } from "../internals/NonMultilingualT";
import type { Introduction } from "./Introduction";
import { SCHEMAS } from "./schemas";

export interface Article {
  name: NonMultilingual<string>,
  content: NonMultilingual<string>,
}

export async function getArticleById(id: string) {
  return await getContentById<Article>(SCHEMAS.ARTICLES, id);
}

export async function getArticleByIds(ids: string) {
  return await getContentsByIds<Article>(SCHEMAS.ARTICLES, ids);
}

// 1:n, only restuns the first one
export async function getArticleReferencing(id: string) {
  const referencing = await getReferencing<Introduction>(SCHEMAS.ARTICLES, id);
  return referencing.items.find(item => item.schemaName === SCHEMAS.INTRODUCTIONS);
}
