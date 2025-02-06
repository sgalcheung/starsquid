// astro:content.d.ts

// import { SQUIDEX_CONTENT_SCHEMAS } from "./schemas";
// import { z } from "astro/zod";

// declare module "astro:content" {
// export async function getCollectionWithSchema<T extends z.ZodTypeAny>(
//   collectionName: SQUIDEX_CONTENT_SCHEMAS,
//   schema: T,
//   filterFn?: (item: z.infer<T>) => boolean
// ): Promise<z.infer<T>[]>;

// export async function getEntryWithSchema<
//   T extends z.ZodTypeAny,
//   E extends string & {},
// >(
//   collectionName: SQUIDEX_CONTENT_SCHEMAS,
//   schema: T,
//   slug: E
// ): Promise<z.infer<T> | undefined>;

//   export async function getCollectionWithSchema<
//     C extends keyof AnyEntryMap,
//     S extends z.ZodTypeAny,
//     E extends CollectionEntry<C>,
//   >(
//     collection: C,
//     schema: S,
//     filter?: (entry: CollectionEntry<C>) => entry is E
//   ): Promise<E[]>;

//   export function getEntryWithSchema<
//     C extends keyof DataEntryMap,
//     S extends z.ZodTypeAny,
//     E extends keyof DataEntryMap[C],
//   >(collection: C, schema: S, id: E): Promise<DataEntryMap[C][E]>;

//   export function getEntryWithSchema<
//     C extends keyof DataEntryMap,
//     S extends z.ZodTypeAny,
//     E extends keyof DataEntryMap[C],
//   >(
//     entry: {
//       collection: C;
//       id: E;
//     },
//     schema: S
//   ): Promise<DataEntryMap[C][E]>;
// }
