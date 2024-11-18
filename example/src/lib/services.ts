import { CATALOGS_CACHE_TIMEOUT } from "@/helpers/constants";
import { getFromRedis, setIfChanged, storeRedis } from "./redis";
// import { getIntro } from "./api";
import { getCollection } from "astro:content";
import { SQUIDEX_CONTENT_SCHEMAS } from "@/content/schemas";
import { dataMap, type CatalogType } from "./convert";

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

export async function getIntroFromCache(
  slug: string
): Promise<{ intro?: IntroductionItem; catalogs?: CatalogType }> {
  // const value = await getFromRedis(slug);
  // if (value) {
  //   return JSON.parse(value);
  // }

  // const { intros } = await getIntro(slug);

  const intros = (
    await getCollection(SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS)
  )?.[0] as IntroductionsResponse;
  if (!intros) return {};

  let intro: IntroductionItem | undefined;
  if (intros.data && Array.isArray(intros.data.items)) {
    intro = intros.data.items.find((item) => item.data.slug.iv === slug);
  }

  let catalogs;
  if (intro) {
    catalogs = dataMap(intro);

    // TODO: optimize cache logic, not every load cache, only difference
    // await storeRedis(slug, JSON.stringify(catalogs), CATALOGS_CACHE_TIMEOUT);
    await setIfChanged(slug, JSON.stringify(catalogs), CATALOGS_CACHE_TIMEOUT);
  }

  return { intro, catalogs };
}

export async function getCatalogs(slug: string): Promise<CatalogType> {
  let catalogs: CatalogType;
  const data = await getFromRedis(slug);
  if (data) {
    catalogs = JSON.parse(data) as CatalogType;
  } else {
    const result = await getIntroFromCache(slug);
    catalogs = result.catalogs!;
  }

  return catalogs;
}
