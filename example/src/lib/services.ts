import { CATALOGS_CACHE_TIMEOUT } from "@/helpers/constants";
import { getFromRedis, storeRedis } from "./redis";
// import { getIntro } from "./api";
import { getCollection } from "astro:content";
import { SQUIDEX_CONTENT_SCHEMAS } from "@/content/schemas";

export async function getIntroFromCache(slug: string) {
  const value = await getFromRedis(slug);
  if (value) {
    return JSON.parse(value);
  }

  // const { intros } = await getIntro(slug);
  interface SlugData {
    iv: string;
  }

  interface Description {
    iv: string;
  }

  type ReferenceArticles = Array<
    {
      id: string;
    } & ReferenceDataValue
  >;

  interface ChapterIv {
    schemaId: string;
    title: string;
    articles: string[];
    schemaName: string;
    referenceArticles: ReferenceArticles;
  }

  interface Chapters {
    iv: ChapterIv[];
  }

  type ReferenceDataValue = {
    name: { iv: string };
    content: { iv: string };
    slug: { iv: string };
  };

  interface IntroductionItem {
    data: {
      slug: SlugData;
      description: Description;
      chapters?: Chapters;
    };
    referenceData: Record<string, ReferenceDataValue>; // Keys are dynamic strings (e.g., UUIDs)
  }

  interface IntroductionsResponse {
    data?: {
      items?: IntroductionItem[];
    };
  }

  const intros = (
    await getCollection(SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS)
  )?.[0] as IntroductionsResponse;
  let intro: IntroductionItem | undefined;
  if (intros.data && Array.isArray(intros.data.items)) {
    intro = intros.data.items.find((item) => item.data.slug.iv === slug);
  }

  if (!intros) return null;

  if (intro) {
    const chapters = intro.data?.chapters?.iv!;
    if (!chapters) {
      return [];
    }

    chapters.forEach((item: ChapterIv) => {
      if (
        typeof intro.referenceData === "object" &&
        intro.referenceData !== null
      ) {
        item.referenceArticles = [];
        item.articles.forEach((articleId: string) => {
          if (intro.referenceData[articleId]) {
            item.referenceArticles.push({
              id: articleId,
              ...intro.referenceData[articleId],
            });
          }
        });
      }
    });
    await storeRedis(slug, JSON.stringify(intro), CATALOGS_CACHE_TIMEOUT);
  }

  return intro;
}
