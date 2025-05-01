import type { APIContext } from "astro";
import { getCatalog, type CatalogType } from "@/scripts/convert";
import { getIntroductionBySlug } from "@/content/schemas/Introduction";

export async function loadCatalogFromSession(
  context: APIContext
): Promise<CatalogType> {
  const filterUri = ["/intro", "/column"];
  if (!filterUri.some(uri => context.url.pathname.startsWith(uri))) return [];
  const slug = context.params.slug;

  const column_name = slug;
  if (!column_name) {
    return [];
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

  return catalogs;
}
