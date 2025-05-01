import type { BaseSchema } from "astro:content";
import { SquidexClientFactory } from "desquidex/api";
import { contentDtoSchema, contentsDtoSchema } from "desquidex/schemas";

export const squidexClient = SquidexClientFactory(
  import.meta.env.SQUIDEX_APP_NAME,
  import.meta.env.SQUIDEX_CLIENT_ID,
  import.meta.env.SQUIDEX_CLIENT_SECRET,
  import.meta.env.SQUIDEX_URL
);

export async function getContentByIds(schemaName: string, schema: BaseSchema, ids: string[]) {
  const contents = await squidexClient.contents.getContents(schemaName);
  contents.items = contents.items.filter((item) => ids.includes(item.id));
  const parsedContentsSchema = contentsDtoSchema(schema);
  const parsedContents =
    await parsedContentsSchema.safeParseAsync(contents);
  const result = parsedContents.success ? parsedContents.data : null;
  return result;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function fixLinksMetadata(content: any) {
  if (content.links && typeof content.links === "object") {
    for (const key of Object.keys(content.links)) {
      const link = content.links[key];
      if (link && typeof link === "object" && !link.metadata) {
        link.metadata = null;
      }
    }
  }
}

export async function getContentById(schemaName: string, schema: BaseSchema, id: string) {
  const content = await squidexClient.contents.getContent(schemaName, id);
  fixLinksMetadata(content);

  const parsedContentsSchema = contentDtoSchema(schema);
  const parsedContents =
    await parsedContentsSchema.safeParseAsync(content);
  const result = parsedContents.success ? parsedContents.data : null;
  return result;
}

export async function getReferencesById(
  schemaName: string,
  schema: BaseSchema,
  id: string,
) {
  const fields =
    Object.keys(schema.shape)
      .map((key) => `data.${key}`)
      .join(",");
  const referencesData = await squidexClient.contents.getReferences(schemaName, id, { fields: fields });
  const parsedContentsSchema = contentDtoSchema(schema);

  const result: (typeof schema | null)[] = [];
  for (const item of referencesData.items) {
    // console.log(item)
    fixLinksMetadata(item);
    const parsedContents =
      await parsedContentsSchema.safeParseAsync(item);
    const parsedResult = parsedContents.success ? parsedContents.data : null;
    if (!parsedContents.success) {
      console.log(parsedContents.error);
    }
    result.push(parsedResult);
  }

  return result;
}
