import { SQUIDEX_CONTENT_SCHEMAS } from "@/content/schemas/common";
// import { articleSchema } from "./Articles";
import { introductionSchema } from "./Introduction";
import type { z } from "astro/zod";
import { authorSchema } from "./Author";


export const getSquidexContentSchemaMapping: () => Record<
  SQUIDEX_CONTENT_SCHEMAS,
  z.ZodTypeAny
> = () => {
  return {
    [SQUIDEX_CONTENT_SCHEMAS.AUTHORS]: authorSchema,
    [SQUIDEX_CONTENT_SCHEMAS.INTRODUCTIONS]: introductionSchema,
    // [SQUIDEX_CONTENT_SCHEMAS.ARTICLES]: articleSchema,
  };
};
