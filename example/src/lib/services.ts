import { CATALOGS_CACHE_TIMEOUT } from "@/helpers/constants";
import { getFromRedis, storeRedis } from "./redis";
import { getIntro } from "./api";

export async function getIntroFromCache(slug: string) {
  const value = await getFromRedis(slug);
  if (value) {
    return JSON.parse(value);
  }

  const { intros } = await getIntro(slug);

  if (!intros || intros.length !== 1) return null;

  const intro = intros[0].flatData;

  await storeRedis(slug, JSON.stringify(intro), CATALOGS_CACHE_TIMEOUT);

  return intro;
}
