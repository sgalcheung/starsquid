import { COLUMN_ARTICLE_PATH } from "@/helpers/constants";
import type { CollectionEntry } from "astro:content";
import { SQUIDEX_CONTENT_SCHEMAS } from "@/content/schemas/common";
// import { getArticleById } from "@/content/schemas/Articles";
import { getIntroductionReferences } from "@/content/schemas/Introduction";

export interface CatalogType
  extends Array<{
    label: string;
    items: Array<{
      label: string;
      link: string;
    }>;
  }> { }

// export async function dataMap(
//   intro: CollectionEntry<(typeof SQUIDEX_CONTENT_SCHEMAS)["INTRODUCTIONS"]>,
// ): Promise<CatalogType> {
//   const chapters = intro.data.data?.chapters?.iv ?? [];
//   if (!chapters) {
//     return [];
//   }

//   intro.data.referenceData = intro.data.referenceData || {};
//   intro.data.referenceData.articles = intro.data.referenceData.articles || {};
//   // console.log("--before--", intro.data.referenceData.articles);
//   const storeArticleIds = Object.keys(intro.data.referenceData?.articles ?? {});
//   // console.log(storeArticleIds.length)
//   const articleIds: string[] = chapters.flatMap((c) => c.articles ?? []);

//   for (const id of articleIds) {
//     if (storeArticleIds.includes(id)) {
//       continue;
//     }
//     const article = await getArticleById(id);
//     if (article) {
//       if (intro.data.referenceData?.articles) {
//         intro.data.referenceData.articles[article.id] = article.data;
//       }
//     }
//   }

//   // const articleIds = chapters.flatMap((c) => c.articles);
//   // const articles = await Promise.all(
//   //   articleIds.map(
//   //     async (id) => await getArticleById(id),
//   //   ),
//   // );

//   // for (const article of articles) {
//   //   if (article) {
//   //     if (intro.data.referenceData?.articles) {
//   //       intro.data.referenceData.articles[article.id] = article.data;
//   //     }
//   //   }
//   // }

//   // console.log("--after--",intro.data.referenceData.articles);

//   return chapters.map((sidebarItem) => {
//     return {
//       label: sidebarItem.title ?? "Untitled", // Chapter, secondary directory
//       items:
//         sidebarItem.articles.map((id) => {
//           const article = intro.data.referenceData?.articles[id];
//           return {
//             label: article?.name?.iv ?? "Unknown",
//             link: `/${COLUMN_ARTICLE_PATH}/${id}`,
//           };
//         }) ?? [],
//     };
//   });
// }

export async function getCatalog(
  intro: CollectionEntry<typeof SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS>,
): Promise<CatalogType> {
  const { id, data } = intro.data;
  const chapters = data?.chapters?.iv ?? [];
  if (!chapters.length) return [];

  const articlesMap = { ...intro.data.referenceData?.articles };

  const references = await getIntroductionReferences(id);
  for (const ref of references) {
    if (ref && ref.schemaName === SQUIDEX_CONTENT_SCHEMAS.ARTICLES) {
      articlesMap[ref.id] = ref.data;
    }
  }

  return chapters.map((chapter) => ({
    label: chapter.title ?? "Untitled",
    items: (chapter.articles ?? []).map((articleId) => {
      const article = articlesMap[articleId];
      return {
        label: article?.name?.iv ?? "Unknown",
        link: `/${COLUMN_ARTICLE_PATH}/${articleId}`,
      };
    }),
  }));
}
