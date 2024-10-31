import { AstroError } from "astro/errors";
import type { DataStore, Loader } from "astro/loaders";
import { defineCollection } from "astro:content";
import { configService, type Config } from "./configService";
import type { AppDto, FeaturesDto } from "@squidex/squidex";
import { getClient } from "./data/core/client";
import { appDtoSchema, featuresDtoSchema } from "./schemas";

type DataEntry = Parameters<DataStore["set"]>[0];

export function squidexCollections(config: Config) {
  configService.setConfig(config);

  const l = (type: string) =>
    makeLoader({
      name: `desquidex-${type}`,
    });

  return {
    app: defineCollection({
      schema: appDtoSchema,
      loader: l("app"),
    }),

    news: defineCollection({
      schema: featuresDtoSchema,
      loader: l("features"),
    }),
  };
}

function makeLoader({ name }: { name: string }) {
  const { client } = getClient();

  const loader: Loader = {
    name,
    async load({ store, parseData }) {
      switch (name) {
        case "desquidex-app": {
          const app = await client.apps.getApp();
          const item = await parseData({
            id: String(app.id),
            data: JSON.parse(JSON.stringify(app)),
          });
          const storeEntry: DataEntry = { id: String(item.id), data: item };
          store.set(storeEntry);
          break;
        }
        case "desquidex-news": {
          const news = await client.news.getNews({ version: 1 });
          const item = await parseData({
            id: String(news.version),
            data: JSON.parse(JSON.stringify(news)),
          });
          const storeEntry: DataEntry = { id: String(item.id), data: item };
          store.set(storeEntry);

          // for (const rawNew of news) {
          //   console.log(rawNew);
          //   const item = await parseData({
          //     id: String(rawNew.name),
          //     data: JSON.parse(JSON.stringify(rawFeature)),
          //   });
          //   const storeEntry: DataEntry = { id: String(item.id), data: item };
          //   store.set(storeEntry);
          // }
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
