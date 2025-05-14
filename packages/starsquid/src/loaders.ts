import type { DataStore, Loader } from "astro/loaders";
import {
  defineCollection,
  type BaseSchema,
  type CollectionConfig,
} from "astro:content";
import {
  SCHEMAS,
  SCHEMAS_CONST,
  appDtoSchema,
  contentDtoSchema,
  contentsDtoSchema,
  featuresDtoSchema,
  type SCHEMAS_VALUES,
} from "./data/models/schemas.js";
import type { ResourceLink } from "@squidex/squidex";
import { SquidexClientFactory } from "./data/core/api.js";
import type { LoaderCollectionOpts } from "./type.js";
import { AstroError } from "astro/errors";

type DataEntry = Parameters<DataStore["set"]>[0];

export function squidexCollections<T extends string>({
  squidexAppName,
  squidexUrl = import.meta.env.SQUIDEX_URL,
  squidexClientId = import.meta.env.SQUIDEX_CLIENT_ID,
  squidexClientSecret = import.meta.env.SQUIDEX_CLIENT_SECRET,
  squidexClient,
  squidexContentSchemaMapping,
}: LoaderCollectionOpts<T>) {
  if (squidexClient) {
    console.log("Using provided Squidex client");
  } else {
    console.log("Creating new Squidex client");
    if (!squidexUrl) {
      throw new AstroError(
        "Missing Squidex url. Set it in the SQUIDEX_URL environment variable or pass it as an option.",
      );
    }
    if (!squidexClientId) {
      throw new AstroError(
        "Missing Squidex app client Id. Set it in the SQUIDEX_CLIENT_ID environment variable or pass it as an option.",
      );
    }
    if (!squidexClientSecret) {
      throw new AstroError(
        "Missing Squidex app client secret. Set it in the SQUIDEX_CLIENT_SECRET environment variable or pass it as an option.",
      );
    }
  }
  const client = squidexClient ?? SquidexClientFactory(squidexAppName, squidexClientId, squidexClientSecret, squidexUrl);

  const l = (type: SCHEMAS, schema: BaseSchema, contentSchema?: string) =>
    makeLoader({
      type,
      schema,
      contentSchema,
      client,
    });

  let collections: Record<string, CollectionConfig<BaseSchema>> = {};

  const schemaMapping: Record<
    SCHEMAS_VALUES,
    () => Record<string, CollectionConfig<BaseSchema>> | null
  > = {
    [SCHEMAS.APP]: () => ({
      [SCHEMAS.APP]: defineCollection({
        // schema: appDtoSchema,
        loader: l(SCHEMAS.APP, appDtoSchema),
      }),
    }),
    [SCHEMAS.FEATURES]: () => ({
      [SCHEMAS.FEATURES]: defineCollection({
        // schema: async () => featuresDtoSchema,
        loader: l(SCHEMAS.FEATURES, featuresDtoSchema),
      }),
    }),
    [SCHEMAS.CONTENT]: () => {
      if (squidexContentSchemaMapping) {
        const contentSchemaMapping = squidexContentSchemaMapping;
        // const contentSchemas = Object.keys(config.squidexContentSchemaMapping);

        if (contentSchemaMapping) {
          type SquidexContentSchemasLiteral = keyof typeof contentSchemaMapping;
          // type T = typeof contentSchemaMapping;

          const schemaKeys = Object.keys(
            contentSchemaMapping,
          ) as SquidexContentSchemasLiteral[];
          // const schemaValues = Object.values(
          //   contentSchemaMapping
          // ) as T[SquidexContentSchemasLiteral][];

          console.log("------------------------------");
          for (const key of schemaKeys) {
            const schemaValue = contentSchemaMapping[key];
            console.log(`${key}: ${schemaValue}`);
          }

          console.log("------------------------------");
          // console.log("All schemas:", schemaValues);
          // return null;

          let contentCollections: Record<
            string,
            CollectionConfig<BaseSchema>
          > = {};
          for (const key of schemaKeys) {
            const schemaValue = contentSchemaMapping[key];
            // console.log("value", schemaValue);
            const contentCollection = {
              [key]: defineCollection({
                // schema: contentDtoSchema(config.squidexContentSchemaTypes![0]),
                loader: l(SCHEMAS.CONTENT, schemaValue, key),
              }),
            };
            contentCollections = {
              ...contentCollections,
              ...contentCollection,
            };
          }
          return contentCollections;
        }
      }
      return null;
    },
  };

  for (const value of Object.values(SCHEMAS_CONST)) {
    const collection = schemaMapping[value]?.();
    if (Array.isArray(collection)) {
      for (const col of collection) {
        collections = { ...collections, ...col };
      }
    } else {
      collections = { ...collections, ...collection };
    }
  }

  return collections;
}

function makeLoader({
  type,
  schema,
  contentSchema,
  client,
}: {
  type: SCHEMAS;
  schema: BaseSchema;
  contentSchema?: string | undefined;
  client: ReturnType<typeof SquidexClientFactory>;
}) {
  const name = contentSchema ?? type.toString();

  const loader: Loader = {
    name: `starsquid-${name}`,
    load: async ({ store, parseData, logger, refreshContextData }) => {
      if (refreshContextData?.webhookBody) {
        logger.info("Received incoming webhook");
        // do something with the webhook body
      }

      switch (type) {
        case SCHEMAS.APP: {
          const app = await client.apps.getApp();
          // Ensure app.links is an object with string keys, fix satisfies.
          if (app.links && typeof app.links === "object") {
            for (const key of Object.keys(app.links)) {
              const link = app.links[key] as ResourceLink;
              if (link && typeof link === "object" && !("metadata" in link) || link.metadata === undefined) {
                link.metadata = null;
              }
            }
          }
          if (!app.label) app.label = null;
          if (!app.description) app.description = null;
          if (!app.teamId) app.teamId = null;
          if (!app.roleName) app.roleName = null;

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
        case SCHEMAS.CONTENT: {
          if (!contentSchema) {
            throw new Error(`Content schema is not defined for type: ${type}.`);
          }
          const contents = await client.contents.getContents(contentSchema);

          // Ensure app.links is an object with string keys, fix satisfies.
          if (contents.links && typeof contents.links === "object") {
            for (const key of Object.keys(contents.links)) {
              const link = contents.links[key] as ResourceLink;
              if (link && typeof link === "object" && !link.metadata) {
                link.metadata = null;
              }
            }
          }
          for (const item of contents.items) {
            if (item.links && typeof item.links === "object") {
              for (const key of Object.keys(item.links)) {
                const link = item.links[key] as ResourceLink;
                if (link && typeof link === "object" && !link.metadata) {
                  link.metadata = null;
                }
              }
            }
          }

          const parsedContentsSchema = contentsDtoSchema(schema);
          const parsedContents =
            await parsedContentsSchema.safeParseAsync(contents);

          if (!parsedContents.success) {
            throw new Error(
              `Invalid contents data for schema "${contentSchema}".\nError: ${parsedContents.error}\nData: ${JSON.stringify(contents, null, 2)}`,
            );
          }

          const parsedItems = parsedContents.data.items;
          await Promise.all(
            parsedItems.map(async (item) => {
              const data = item.data as { slug?: { iv: string } };
              // const data = item as ParsedItemType;
              const id = data.slug ? data.slug.iv.toString() : item.id;
              const parsedItem = await parseData({
                id,
                data: item,
              });
              store.set({
                id: id,
                data: parsedItem,
              });
            }),
          );
          break;

          // const referenceIds = contents.items.map((item) => item.id);

          // const query = await client.contents.getAllContentsPost({
          //   ids: [],
          // });

          // Unuse link query. keep atomic
          // await Promise.all(
          //   contents.items.map(async (x) => {
          //     const references = await client.contents.getReferences(
          //       contentSchema!,
          //       x.id
          //     );
          //     if (references.total > 0) {
          //       x.referenceData = references.items.reduce(
          //         (accumulator, item) => {
          //           accumulator[item.id] = item.data;
          //           return accumulator;
          //         },
          //         {} as {
          //           [key: string]: {
          //             [key: string]: any;
          //           };
          //         }
          //       );
          //     }
          //   })
          // );
        }
        default:
          break;
      }
    },
    schema: async () => (contentSchema ? contentDtoSchema(schema) : schema),
  };
  return loader;
}
