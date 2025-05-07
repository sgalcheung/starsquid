import type { APIContext } from "astro";
import { getCatalog, type CatalogType } from "@/scripts/convert";
import { getIntroductionBySlug } from "@/content/schemas/Introduction";
import { COLUMN } from "@/helpers/constants";

export async function loadCatalogFromSession(
  context: APIContext
) {
  const { pathname } = context.url;
  if (!pathname.startsWith("/intro") && !pathname.startsWith("/column")) {
    return;
  }

  let column_name: string | undefined;
  if (pathname.startsWith("/intro")) {
    column_name = context.params.slug;
  }
  if (pathname.startsWith("/column")) {
    column_name = context.cookies.get(COLUMN)?.value;
  }
  if (!column_name) {
    return;
  }

  let catalogs: CatalogType = [];

  const sessionData = await context.session?.get(column_name) || '[]';

  const parsed = JSON.parse(sessionData);
  const isValidCatalog = Array.isArray(parsed) && parsed.length > 0;

  if (isValidCatalog) {
    if (process.env.NODE_ENV === 'development') {
      console.debug("load catalogs from session data");
    }
    catalogs = parsed as CatalogType;
  } else {
    const intro = await getIntroductionBySlug(column_name);
    if (intro) {
      catalogs = await getCatalog(intro);
      context.session?.set(column_name, JSON.stringify(catalogs));
    }
  }

  context.locals.catalogs = catalogs;
}
