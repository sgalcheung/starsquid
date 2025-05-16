import type { Loader } from "astro/loaders";
import {
  defineCollection,
} from "astro:content";
import {
  SYSTEM_SCHEMAS,
  SYSTEM_SCHEMAS_Map,
} from "./data/models/schemas.js";
import { SquidexClientFactory } from "./data/core/api.js";
import type { LoaderCollectionOpts } from "./type.js";
import { AstroError } from "astro/errors";
import { zodSchemaFromSquidexSchema } from "./data/models/data-schema.js";

export function squidexCollections({
  squidexAppName,
  squidexUrl = import.meta.env.SQUIDEX_URL,
  squidexClientId = import.meta.env.SQUIDEX_CLIENT_ID,
  squidexClientSecret = import.meta.env.SQUIDEX_CLIENT_SECRET,
  squidexClient,
  squidexSchemas,
}: LoaderCollectionOpts) {
  if (!squidexClient) {
    console.log("Creating new Squidex client");
    if (!squidexUrl || !squidexClientId || !squidexClientSecret) {
      throw new AstroError(
        `Missing Squidex configuration. Please set the following environment variables: 
        ${!squidexUrl ? "SQUIDEX_URL, " : ""}${!squidexClientId ? "SQUIDEX_CLIENT_ID, " : ""}${!squidexClientSecret ? "SQUIDEX_CLIENT_SECRET" : ""}`.replace(/, $/, ".")
      );
    }
  } else {
    console.log("Using provided Squidex client");
  }
  const client = squidexClient ?? SquidexClientFactory(squidexAppName, squidexClientId, squidexClientSecret, squidexUrl);

  const squidexSchemaLoader = (schemaName: string) => squidexLoader({ schemaName, client });
  const squidexMakeSchemaLoader = (schemaName: string) => squidexMakeLoader({ schemaName, client });

  const collections = Object.fromEntries(
    squidexSchemas.map((schema) => {
      const isSystemSchema = Object.values(SYSTEM_SCHEMAS).includes(schema as SYSTEM_SCHEMAS);
      return [schema, defineCollection({ loader: isSystemSchema ? squidexMakeSchemaLoader(schema) : squidexSchemaLoader(schema) })];
    })
  );

  return collections;
}

const loaderName = "starsquid-loader";

function squidexLoader({
  schemaName,
  client,
}: {
  schemaName: string,
  client: ReturnType<typeof SquidexClientFactory>;
}): Loader {
  return {
    name: loaderName,
    load: async ({ logger, parseData, store }) => {
      const contents = await client.contents.getContents(schemaName);
      for (const item of contents.items) {
        const id = item.id;
        const parsedData = await parseData({ id, data: JSON.parse(JSON.stringify(item)) });
        store.set({ id, data: parsedData });
      }
      logger.info(`Loaded ${contents.total} records from "${schemaName}"`);
    },
    schema: async () =>
      await zodSchemaFromSquidexSchema({
        schemaName: schemaName,
        client: client,
      }),
  }
}

function squidexMakeLoader({
  schemaName,
  client,
}: {
  schemaName: string;
  client: ReturnType<typeof SquidexClientFactory>;
}): Loader {
  return {
    name: loaderName,
    load: async ({ store, parseData, logger }) => {
      switch (schemaName) {
        case SYSTEM_SCHEMAS.APP: {
          const app = await client.apps.getApp();
          const id = app.id;
          const data = await parseData({ id, data: JSON.parse(JSON.stringify(app)) });
          store.set({ id, data });
          break;
        }
        case SYSTEM_SCHEMAS.NEWS: {
          const news = await client.news.getNews({ version: 1 });
          const id = String(news.version);
          const data = await parseData({ id, data: JSON.parse(JSON.stringify(news)) });
          store.set({ id, data });
          break;
        }
        default:
          break;
      }

      logger.info(`Loaded record from system schema "${schemaName}"`);
    },
    schema: () => SYSTEM_SCHEMAS_Map.get(schemaName)!,
  };
}
