import { SQUIDEX_CONTENT_SCHEMAS } from "@/content/schemas/common";
import { introductionSchema } from "./Introduction";
import { z } from "astro/zod";
import { authorSchema } from "./Author";


const rawSchemas = {
  [SQUIDEX_CONTENT_SCHEMAS.AUTHORS]: authorSchema,
  [SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS]: introductionSchema,
  [SQUIDEX_CONTENT_SCHEMAS.ARTICLES]: z.object({}),
} satisfies Record<SQUIDEX_CONTENT_SCHEMAS, z.ZodTypeAny>;

export const getSquidexContentSchemaMapping = () => {
  return Object.fromEntries(
    Object.entries(rawSchemas).filter(
      ([_, schema]) => !(schema instanceof z.ZodObject && Object.keys(schema.shape).length === 0)
    )
  ) as Partial<Record<SQUIDEX_CONTENT_SCHEMAS, z.ZodTypeAny>>;
};
