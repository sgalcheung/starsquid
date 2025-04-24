import { defineMiddleware } from "astro:middleware";
import { CATALOGS_CACHE_TIMEOUT, COLUMN } from "@/helpers/constants";
import { dataMap, type CatalogType } from "@/scripts/convert";
import { getIntroductionBySlug } from "@/content/schemas/Introduction";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  // const url = new URL(context.request.url);
  // console.log("middleware url", context.request.url); // eg: http://localhost:4321/intro/test-course/
  // const urlCIDParam = url.searchParams.get("cid");
  // console.log("middleware",urlCIDParam);
  if (!context.url.pathname.startsWith("/intro")) return next();
  const slug = context.params.slug;

  const column_name = slug;
  if (!column_name) {
    return next();
  }
  const sessionData = await context.session?.get(column_name) || '[]';
  let catalogs = JSON.parse(sessionData) as CatalogType;

  if (!catalogs || catalogs.length === 0) {
    const intro = await getIntroductionBySlug(column_name);
    if (intro) {
      catalogs = await dataMap(intro);
      context.session?.set(
        column_name,
        JSON.stringify(catalogs),
        { ttl: CATALOGS_CACHE_TIMEOUT, }
      );
    }
  }

  return next();
});
