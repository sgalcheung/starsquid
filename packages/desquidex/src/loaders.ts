import type { DataStore, Loader } from "astro/loaders";
import {
	defineCollection,
	type BaseSchema,
	type CollectionConfig,
} from "astro:content";
import { configService, type Config } from "./configService.js";
import { getClient } from "./data/core/client.js";
import {
	SCHEMAS,
	SCHEMAS_CONST,
	appDtoSchema,
	contentDtoSchema,
	contentsDtoSchema,
	dataSchema,
	featuresDtoSchema,
	type SCHEMAS_VALUES,
} from "./data/models/schemas.js";

type DataEntry = Parameters<DataStore["set"]>[0];

// type DynamicCollectionConfigs<T> = Record<
//   keyof T,
//   CollectionConfig<any>
// >;
// type Values<T extends Record<string, any>> = T[keyof T];
// type SquidexSchemaKeys = Values<SquidexSchemaTypes>;
// export type SquidexCommonSchemaTypes = typeof SCHEMAS_CONST;

// const squidexSchemas = {
//   ...squidexContentSchemas,
//   ...SCHEMAS_CONST,
// } as const;

// export type SquidexSchemaTypes = typeof squidexSchemas;
// type DynamicCollectionConfigs<T extends Record<string, any>> = Record<
//   Values<T>,
//   CollectionConfig<any>
// >;
// type DynamicCollectionConfigs = Partial<
//   Record<SquidexSchemaKeys, CollectionConfig<BaseSchema>>
// >;

export function squidexCollections<T extends string>(config: Config<T>) {
	configService.setConfig(config);

	const l = (type: SCHEMAS, schema: BaseSchema, contentSchema?: string) =>
		makeLoader({
			type,
			schema,
			contentSchema,
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
			if (config.squidexContentSchemaMapping) {
				const contentSchemaMapping = config.squidexContentSchemaMapping;
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

					console.log("---------------");
					for (const key of schemaKeys) {
						const schemaValue = contentSchemaMapping[key];
						console.log(`${key}: ${schemaValue}`);
					}

					console.log("---------------");
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
								loader: l(SCHEMAS.CONTENT, contentDtoSchema(schemaValue), key),
							}),
						};
						contentCollections = { ...contentCollections, ...contentCollection };
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

	// console.log(collections);
	return collections;
}

function makeLoader({
	type,
	schema,
	contentSchema,
}: {
	type: SCHEMAS;
	schema: BaseSchema;
	contentSchema?: string | undefined;
}) {
	const { client } = getClient();

	const name = contentSchema ?? type.toString();

	const loader: Loader = {
		name: `desquidex-${name}`,
		load: async ({ store, parseData, logger, refreshContextData }) => {
			if (refreshContextData?.webhookBody) {
				logger.info("Received incoming webhook");
				// do something with the webhook body
			}

			switch (type) {
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
				case SCHEMAS.CONTENT: {
					if (!contentSchema) {
						throw new Error("Content schema is not defined.");
					}
					const contents = await client.contents.getContents(contentSchema);
					// console.log("contents", contents);
					const contentsDtoSchemaT = contentsDtoSchema(dataSchema);
					const parsedContents = contentsDtoSchemaT.safeParse(contents);

					if (!parsedContents.success) {
						throw new Error("Invalid contents data.");
					}

					const items = parsedContents.data.items;
					for (const item of items) {
						const id = item.data.slug ? item.data.slug.iv.toString() : item.id;
						const parsedItem = await parseData({
							id,
							data: item,
						});
						store.set({ id: id, data: parsedItem });
					}
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
		schema: async () => schema,
	};
	return loader;
}
