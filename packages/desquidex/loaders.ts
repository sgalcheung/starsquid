import { AstroError } from "astro/errors";
import type { DataStore, Loader } from "astro/loaders";
import { defineCollection } from "astro:content";
import { configService, type Config } from "./configService";
import { getClient } from "./data/core/client";
import {
  SCHEMAS,
  appDtoSchema,
  featuresDtoSchema,
} from "./data/models/schemas";

type DataEntry = Parameters<DataStore["set"]>[0];

export function squidexCollections(config: Config) {
  configService.setConfig(config);

  const l = (type: SCHEMAS) =>
    makeLoader({
      schema: type,
    });

  return {
    [SCHEMAS.APP]: defineCollection({
      schema: appDtoSchema,
      loader: l(SCHEMAS.APP),
    }),

    [SCHEMAS.FEATURES]: defineCollection({
      schema: featuresDtoSchema,
      loader: l(SCHEMAS.FEATURES),
    }),
  };
}

function makeLoader({ schema }: { schema: SCHEMAS }) {
  const { client } = getClient();

  const loader: Loader = {
    name: `desquidex-${schema.toString()}`,
    load: async ({ store, parseData }) => {
      switch (schema) {
        case SCHEMAS.APP: {
          const app = await client.apps.getApp();
          const item = await parseData({
            id: String(app.id),
            data: JSON.parse(JSON.stringify(app)),
          });
          const storeEntry: DataEntry = { id: String(item.id), data: item };
          store.set(storeEntry);
          break;
        }
        case SCHEMAS.FEATURES: {
          const news = await client.news.getNews({ version: 1 });
          const item = await parseData({
            id: String(news.version),
            data: JSON.parse(JSON.stringify(news)),
          });
          const storeEntry: DataEntry = { id: String(item.id), data: item };
          store.set(storeEntry);
          break;
        }
        default:
          break;
      }
    },
  };
  return loader;
}

/**
 * Fetch all pages for a paginated WP endpoint.
 */
async function fetchAll(url: URL, page = 1, results: any[] = []) {
  url.searchParams.set("per_page", "100");
  url.searchParams.set("page", String(page));
  const response = await fetch(url);
  let data = await response.json();
  if (!Array.isArray(data)) {
    if (typeof data === "object") {
      data = Object.entries(data).map(([id, val]) => {
        if (typeof val === "object") return { id, ...val };
        return { id };
      });
    } else {
      throw new AstroError(
        "Expected WordPress API to return an array of items.",
        `Received ${typeof data}:\n\n\`\`\`json\n${JSON.stringify(
          data,
          null,
          2
        )}\n\`\`\``
      );
    }
  }
  results.push(...data);
  const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1");
  if (page < totalPages) return fetchAll(url, page + 1, results);
  return results;
}
