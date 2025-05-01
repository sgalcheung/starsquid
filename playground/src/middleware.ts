import { defineMiddleware } from "astro:middleware";
import { loadCatalogFromSession } from "@/scripts/session";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  // const url = new URL(context.request.url);
  // console.log("middleware url", context.request.url); // eg: http://localhost:4321/intro/test-course/
  // const urlCIDParam = url.searchParams.get("cid");
  // console.log("middleware",urlCIDParam);

  const catalogs = await loadCatalogFromSession(context);
  context.locals.catalogs = catalogs;

  return next();
});
