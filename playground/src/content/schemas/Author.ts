import { z } from "astro/zod";
import { nonMultilingualSchema, SQUIDEX_CONTENT_SCHEMAS } from "./common";
import { getEntry } from "astro:content";

export const authorDataSchema = z.object({
  name: nonMultilingualSchema(z.string()),
  anonymous: nonMultilingualSchema(z.string()),
  avatar: nonMultilingualSchema(z.array(z.string())),
})

export async function getAuthorById(id: string) {
  const author = await getEntry(SQUIDEX_CONTENT_SCHEMAS.AUTHORS, id);
  return author;
}
