import { CATALOGS_CACHE_TIMEOUT } from "@/helpers/constants";
import { getFromRedis, setIfChanged } from "./redis";
import { SQUIDEX_CONTENT_SCHEMAS } from "@/content/schemas";
import { dataMap, type CatalogType } from "./convert";
import { getEntry, type CollectionEntry } from "astro:content";

export async function getCatalogs(
  intro: CollectionEntry<SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS>
): Promise<CatalogType> {
  let catalogs: CatalogType = [];
  if (intro) {
    catalogs = await dataMap(intro);

    await setIfChanged(
      intro.data.data.slug.iv,
      JSON.stringify(catalogs),
      CATALOGS_CACHE_TIMEOUT
    );
  }

  return catalogs;
}

export async function getCatalogsFromRedis(slug: string): Promise<CatalogType> {
  let catalogs: CatalogType = {} as CatalogType;
  const data = await getFromRedis(slug);
  if (data) {
    catalogs = JSON.parse(data) as CatalogType;
  } else {
    const intro = await getEntry(SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS, slug);
    if (intro) {
      catalogs = await getCatalogs(intro);
    }
  }

  return catalogs;
}
