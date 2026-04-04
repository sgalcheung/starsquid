import type { Loader } from "astro/loaders";
import { defineCollection } from "astro:content";
import {
  appDtoSchema,
  newsDtoSchema,
  SYSTEM_SCHEMAS,
} from "./data/models/schemas.js";
import { SquidexClientFactory } from "./data/core/api.js";
import type { LoaderCollectionOpts } from "./type.js";
import { AstroError } from "astro/errors";
import { zodSchemaFromSquidexSchema } from "./data/models/data-schema.js";
import { createAuxiliaryTypeStore, printNode, zodToTs } from "zod-to-ts";

const loaderName = "starsquid-loader";

type SystemCollections = {
  [SYSTEM_SCHEMAS.APP]: ReturnType<
    typeof defineCollection<typeof appDtoSchema>
  >;
  [SYSTEM_SCHEMAS.NEWS]: ReturnType<
    typeof defineCollection<typeof newsDtoSchema>
  >;
};

export function createSquidexCollections(opts: LoaderCollectionOpts) {
  const dynamic = squidexCollections(opts);
  const system = squidexSystemCollections(opts);

  return {
    ...dynamic,
    ...system,
  };
}

function squidexCollections({
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
        ${!squidexUrl ? "SQUIDEX_URL, " : ""}${
          !squidexClientId ? "SQUIDEX_CLIENT_ID, " : ""
        }${!squidexClientSecret ? "SQUIDEX_CLIENT_SECRET" : ""}`.replace(
          /, $/,
          ".",
        ),
      );
    }
  } else {
    console.log("Using provided Squidex client");
  }
  const client =
    squidexClient ??
    SquidexClientFactory(
      squidexAppName,
      squidexClientId,
      squidexClientSecret,
      squidexUrl,
    );

  const squidexSchemaLoader = (schemaName: string) => {
    return squidexLoader({ schemaName, client });
  };

  const collections = Object.fromEntries(
    squidexSchemas.map((schema) => {
      return [
        schema,
        defineCollection({
          loader: squidexSchemaLoader(schema),
        }),
      ];
    }),
  );

  return collections;
}

function squidexSystemCollections(
  opts: LoaderCollectionOpts,
): SystemCollections {
  const {
    squidexAppName,
    squidexUrl = import.meta.env.SQUIDEX_URL,
    squidexClientId = import.meta.env.SQUIDEX_CLIENT_ID,
    squidexClientSecret = import.meta.env.SQUIDEX_CLIENT_SECRET,
    squidexClient,
  } = opts;

  if (!squidexClient) {
    console.log("Creating new Squidex client");
    if (!squidexUrl || !squidexClientId || !squidexClientSecret) {
      throw new AstroError(
        `Missing Squidex configuration. Please set the following environment variables: 
        ${!squidexUrl ? "SQUIDEX_URL, " : ""}${
          !squidexClientId ? "SQUIDEX_CLIENT_ID, " : ""
        }${!squidexClientSecret ? "SQUIDEX_CLIENT_SECRET" : ""}`.replace(
          /, $/,
          ".",
        ),
      );
    }
  } else {
    console.log("Using provided Squidex client");
  }
  const client =
    squidexClient ??
    SquidexClientFactory(
      squidexAppName,
      squidexClientId,
      squidexClientSecret,
      squidexUrl,
    );

  const systemCollections = {
    [SYSTEM_SCHEMAS.APP]: defineCollection({
      schema: appDtoSchema,
      loader: squidexSystemLoader({
        schemaName: SYSTEM_SCHEMAS.APP,
        client,
      }),
    }),

    [SYSTEM_SCHEMAS.NEWS]: defineCollection({
      schema: newsDtoSchema,
      loader: squidexSystemLoader({
        schemaName: SYSTEM_SCHEMAS.NEWS,
        client,
      }),
    }),
  };

  return systemCollections;
}

function squidexLoader({
  schemaName,
  client,
}: {
  schemaName: string;
  client: ReturnType<typeof SquidexClientFactory>;
}): Loader {
  return {
    name: loaderName,
    load: async ({ renderMarkdown, logger, parseData, store }) => {
      // Dynamically fetch schema and content
      const schema = await zodSchemaFromSquidexSchema({
        schemaName: schemaName,
        client: client,
      });
      const contents = await client.contents.getContents(schemaName);

      for (const item of contents.items) {
        const id = item.id;
        // Use dynamic schema for parsing the data field
        const parsedData = schema.parse(item);

        const content = item.data?.content?.iv;

        store.set({
          id,
          data: parsedData,
          rendered: content ? await renderMarkdown(content) : undefined,
        });
      }
      logger.info(`Loaded ${contents.total} records from "${schemaName}"`);
    },
    createSchema: async () => {
      const schema = await zodSchemaFromSquidexSchema({
        schemaName: schemaName,
        client: client,
      });
      const auxiliaryTypeStore = createAuxiliaryTypeStore();
      const { node } = zodToTs(schema, { auxiliaryTypeStore });

      const nodeString = printNode(node);
      // console.log(nodeString);

      return {
        schema,
        types: `export type Entry = ${nodeString}`,
      };
    },
  } satisfies Loader;
}

function squidexSystemLoader({
  schemaName,
  client,
}: {
  schemaName: SYSTEM_SCHEMAS;
  client: ReturnType<typeof SquidexClientFactory>;
}) {
  return {
    name: loaderName,
    load: async ({ renderMarkdown, store, parseData, logger }) => {
      switch (schemaName) {
        case SYSTEM_SCHEMAS.APP: {
          const app = await client.apps.getApp();
          const id = app.id;
          const data = await parseData({
            id,
            data: JSON.parse(JSON.stringify(app)),
          });
          store.set({ id, data });
          break;
        }
        case SYSTEM_SCHEMAS.NEWS: {
          const news = await client.news.getNews({ version: 1 });

          for (const feature of news.features) {
            const id = crypto.randomUUID();
            store.set({
              id,
              data: feature as unknown as Record<string, unknown>,
              rendered: await renderMarkdown(feature.text),
            });
          }
          break;
        }
        default:
          break;
      }

      logger.info(`Loaded record from system schema "${schemaName}"`);
    },
  } satisfies Loader;
}
