import { SQUIDEX_CONTENT_SCHEMAS } from "@/content/schemas/common";
import { introductionSchema } from "./Introduction";
import { z } from "astro/zod";
import { authorSchema } from "./Author";


const rawSchemas = {
  [SQUIDEX_CONTENT_SCHEMAS.AUTHORS]: authorSchema,
  [SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS]: introductionSchema,
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
