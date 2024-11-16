import { AstroError } from "astro/errors";
import type { DataStore, Loader } from "astro/loaders";
import {
  defineCollection,
  type BaseSchema,
  type CollectionConfig,
} from "astro:content";
import { configService, type Config } from "./configService";
import { getClient } from "./data/core/client";
import {
  SCHEMAS,
  appDtoSchema,
  contentsDtoSchema,
  featuresDtoSchema,
} from "./data/models/schemas";

type DataEntry = Parameters<DataStore["set"]>[0];
// type CollectionSchema = {
//   [key: string]: CollectionConfig<ZodObject>;
// };

export function squidexCollections(config: Config) {
  configService.setConfig(config);

  const l = (type: SCHEMAS, contentSchema?: string) =>
    makeLoader({
      schema: type,
      contentSchema: contentSchema,
    });

  const generalCollection = {
    [SCHEMAS.APP]: defineCollection({
      schema: appDtoSchema,
      loader: l(SCHEMAS.APP),
    }),

    [SCHEMAS.FEATURES]: defineCollection({
      schema: featuresDtoSchema,
      loader: l(SCHEMAS.FEATURES),
    }),
  };

  // const result = {
  //   ...generalCollection,
  // };

  // if (config.squidexContentSchemas) {
  //   for (const schema of config.squidexContentSchemas) {
  //     result[schema] = defineCollection({
  //       schema: contentsDtoSchema,
  //       loader: l(SCHEMAS.CONTENTS, schema),
  //     });
  //   }
  // }

  if (config.squidexContentSchemas) {
    const dynamicCollections = config.squidexContentSchemas.reduce(
      (acc, schema) => {
        acc[schema] = defineCollection({
          schema: contentsDtoSchema,
          loader: l(SCHEMAS.CONTENTS, schema),
        });
        return acc;
      },
      {} as Record<string, CollectionConfig<BaseSchema>>
    );

    Object.assign(generalCollection, dynamicCollections);
  }

  return generalCollection;
}

function makeLoader({
  schema,
  contentSchema,
}: {
  schema: SCHEMAS;
  contentSchema?: string;
}) {
  const { client } = getClient();

  const name = contentSchema ?? schema.toString();

  const loader: Loader = {
    name: `desquidex-${name}`,
    load: async ({ store, parseData, logger, refreshContextData, meta }) => {

      if (refreshContextData?.webhookBody) {
        logger.info("Received incoming webhook");
        // do something with the webhook body
      }

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
        case SCHEMAS.CONTENTS: {
          const contents = await client.contents.getContents(contentSchema!);

          // const referenceIds = contents.items.map((item) => item.id);

          // const query = await client.contents.getAllContentsPost({
          //   ids: [],
          // });
          await Promise.all(
            contents.items.map(async (x) => {
              const references = await client.contents.getReferences(
                contentSchema!,
                x.id
              );
              if (references.total > 0) {
                x.referenceData = references.items.reduce(
                  (accumulator, item) => {
                    accumulator[item.id] = item.data;
                    return accumulator;
                  },
                  {} as {
                    [key: string]: {
                      [key: string]: any;
                    };
                  }
                );
              }
            })
          );

          const item = await parseData({
            id: String(contents.total),
            data: JSON.parse(JSON.stringify(contents)),
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
function docsSchema(): any {
  throw new Error("Function not implemented.");
}
