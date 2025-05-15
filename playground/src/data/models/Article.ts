import { getContentById, getContentsByIds, getReferencing } from "../core/client";
import type { ContentDto } from "../internals/ContentDtoT";
import type { NonMultilingual } from "../internals/NonMultilingualT";
import type { Chapter } from "./Chapter";
import type { Introduction } from "./Introduction";
import { SCHEMAS } from "./schemas";

export interface Article {
  name: NonMultilingual<string>,
  content: NonMultilingual<string>,
}

interface ArticleReferencing extends Partial<Introduction> {
  slug?: NonMultilingual<string>,
  chapters?: NonMultilingual<Array<Chapter>>,
}

export type ArticleReferencingContentDtoType = ContentDto<ArticleReferencing>;

export async function getArticleById(id: string) {
  return await getContentById<Article>(SCHEMAS.ARTICLES, id);
}

export async function getArticleByIds(ids: string) {
  return await getContentsByIds<Article>(SCHEMAS.ARTICLES, ids);
}

// 1:n, only restuns the first one
export async function getArticleReferencing(id: string) {
  const referencing = await getReferencing<ArticleReferencing>(SCHEMAS.ARTICLES, id);
  return referencing.items.find(item => item.schemaName === SCHEMAS.INTRODUCTIONS);
}
