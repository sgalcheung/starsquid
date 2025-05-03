import { SQUIDEX_CONTENT_SCHEMAS } from "@/content/schemas/common";
import { introductionDataSchema } from "./Introduction";
import { z } from "astro/zod";
import { authorDataSchema } from "./Author";


const rawSchemas = {
  [SQUIDEX_CONTENT_SCHEMAS.AUTHORS]: authorDataSchema,
  [SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS]: introductionDataSchema,
  [SQUIDEX_CONTENT_SCHEMAS.ARTICLES]: z.object({}),
} satisfies Record<SQUIDEX_CONTENT_SCHEMAS, z.ZodTypeAny>;

const OMITTED_SCHEMAS = [
  SQUIDEX_CONTENT_SCHEMAS.ARTICLES,
] as const;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function omitKeys<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

export const getSquidexContentSchemaMapping = (): Omit<
  typeof rawSchemas,
  (typeof OMITTED_SCHEMAS)[number]
> => {
  return omitKeys(rawSchemas, OMITTED_SCHEMAS);
};
