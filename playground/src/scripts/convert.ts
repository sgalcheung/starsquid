import { COLUMN_ARTICLE_PATH } from "@/helpers/constants";
import { getIntroductionReferences, type IntroductionCollectionType, type IntroductionDtoType } from "../data/models/Introduction";

export interface CatalogType
  extends Array<{
    label: string;
    items: Array<{
      label: string;
      link: string;
    }>;
  }> { }

export async function getCatalog(
  intro: IntroductionCollectionType,
): Promise<CatalogType>;
export async function getCatalog(
  intro: IntroductionDtoType,
): Promise<CatalogType>;

export async function getCatalog(
  value: IntroductionCollectionType | IntroductionDtoType,
): Promise<CatalogType> {
  const { id, data } = 'collection' in value ? value.data : value;

  const chapters = data?.chapters?.iv ?? [];
  if (chapters.length === 0) return [];

  const references = await getIntroductionReferences(id);
  const articlesMap = Object.fromEntries(
    references
      // .filter(ref => ref?.schemaName === SQUIDEX_CONTENT_SCHEMAS.ARTICLES)
      .map((ref) => {
        return [ref.id, { name: ref.data?.name?.iv ?? "Unknown" }];
      })
  );

  return chapters.map((chapter) => ({
    label: chapter.title ?? "Untitled",
    items: (chapter.articles ?? []).map((articleId) => {
      const article = articlesMap[articleId];
      return {
        label: article?.name ?? "Unknown",
        link: `/${COLUMN_ARTICLE_PATH}/${articleId}`,
      };
    }),
  }));
}
