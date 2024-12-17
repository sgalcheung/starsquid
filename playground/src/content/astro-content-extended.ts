// import { z } from "astro/zod";
// import {
//   getCollection,
//   getEntry,
//   type AnyEntryMap,
//   type CollectionEntry,
//   type DataEntryMap,
// } from "astro:content";
// import { contentDtoSchema } from "desquidex/schemas";
// import { SQUIDEX_CONTENT_SCHEMAS } from "./schemas";

// export async function getCollectionWithSchema<T extends z.ZodTypeAny>(
//   collectionName: SQUIDEX_CONTENT_SCHEMAS,
//   schema: T,
//   filterFn?: (item: z.infer<T>) => boolean
// ): Promise<z.infer<T>[]> {
//   // console.log("collectionName", collectionName);
//   const contentCollection = await getCollection(collectionName);
//   // console.log(contentCollection);
//   const contentDtoSchemaT = contentDtoSchema(schema);
//   const validatedData = contentCollection
//     .map((item) => {
//       // console.log("item", item);
//       // console.log("item.data.data.chapters", item.data.data.chapters);
//       // console.log("item.data.data.chapters", item.data.data.chapters);
//       // console.log(
//       //   "item.data.data.chapters.iv[0].articles",
//       //   item.data.data.chapters.iv[0].articles
//       // );
//       const validationResult = contentDtoSchemaT.safeParse(item.data);
//       if (!validationResult.success) {
//         console.error(
//           `Validation failed for ${collectionName}`,
//           validationResult.error.issues
//         );
//       }
//       // console.log("validationResult.data", validationResult.data);
//       return validationResult.success ? validationResult.data.data : null;
//     })
//     .filter((item) => item !== null) as T[];

//   if (filterFn) {
//     return validatedData.filter(filterFn);
//   }

//   return validatedData;
// }

// Mount it to `astro:content`
// module.exports = {
//   ...require("astro:content"),
//   getCollectionWithSchema,
// };

// Re-export the original `astro:content` module
// export * from "astro:content";

// export async function getEntryWithSchema<
//   T extends z.ZodTypeAny,
//   E extends string & {},
// >(
//   collectionName: SQUIDEX_CONTENT_SCHEMAS,
//   schema: T,
//   slug: E
// ): Promise<z.infer<T> | undefined> {
//   const entry = await getEntry(collectionName, slug);
//   const contentDtoSchemaT = contentDtoSchema(schema);
//   const validationResult = contentDtoSchemaT.safeParse(entry.data);
//   if (!validationResult.success) {
//     console.error(
//       `Validation failed for ${collectionName}`,
//       validationResult.error.issues
//     );
//   }
//   // console.log("validationResult.data", validationResult.data);
//   return validationResult.success ? validationResult.data.data : null;
// }

// export async function getCollectionWithSchema<
//   C extends keyof AnyEntryMap,
//   S extends z.ZodTypeAny,
//   E extends CollectionEntry<C>,
// >(
//   collection: C,
//   schema: S,
//   filter?: (entry: CollectionEntry<C>) => entry is E
// ): Promise<E[]> {
//   const contentCollection = await getCollection(collection, filter);

//   const contentDtoSchemaT = contentDtoSchema(schema);
//   const validatedData = contentCollection.map((item) => {
//     // console.log("item", item);
//     // console.log("item.data.data.chapters", item.data.data.chapters);
//     // console.log("item.data.data.chapters", item.data.data.chapters);
//     // console.log(
//     //   "item.data.data.chapters.iv[0].articles",
//     //   item.data.data.chapters.iv[0].articles
//     // );
//     const validationResult = contentDtoSchemaT.safeParse(item.data);
//     if (!validationResult.success) {
//       console.error(
//         `Validation failed for ${collection}`,
//         validationResult.error.issues
//       );
//     }
//     // console.log("validationResult.data", validationResult.data);
//     return validationResult.success ? item : null;
//   });
//   // .filter((item) => item !== null) as T[];

//   return validatedData as E[];
// }

// export async function getEntryWithSchema<
//   C extends keyof DataEntryMap,
//   S extends z.ZodTypeAny,
//   E extends keyof DataEntryMap[C],
// >(collection: C, schema: S, id: E): Promise<DataEntryMap[C][E]> {
//   const entry = await getEntry(collection, id);
//   if (!entry) return {} as unknown as DataEntryMap[C][E];

//   const contentDtoSchemaT = contentDtoSchema(schema);
//   const validationResult = contentDtoSchemaT.safeParse(entry.data);
//   if (!validationResult.success) {
//     console.error(
//       `Validation failed for ${collection}`,
//       validationResult.error.issues
//     );
//   }
//   // console.log("validationResult.data", validationResult.data);
//   const result = validationResult.success ? entry : {};
//   return result as DataEntryMap[C][E];
// }

// export async function getEntryWithSchema<
//   C extends keyof DataEntryMap,
//   S extends z.ZodTypeAny,
//   E extends keyof DataEntryMap[C],
// >(
//   entry: {
//     collection: C;
//     id: E;
//   },
//   schema: S
// ): Promise<DataEntryMap[C][E]> {
//   const entries = await getEntry(entry.collection, entry.id);
//   const contentDtoSchemaT = contentDtoSchema(schema);
//   const validationResult = contentDtoSchemaT.safeParse(entry.data);
//   if (!validationResult.success) {
//     console.error(
//       `Validation failed for ${collectionName}`,
//       validationResult.error.issues
//     );
//   }
//   // console.log("validationResult.data", validationResult.data);
//   return validationResult.success ? validationResult.data.data : null;
// }
