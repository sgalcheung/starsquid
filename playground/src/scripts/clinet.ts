import type { BaseSchema } from "astro:content";
import { SquidexClientFactory } from "starsquid/api";
import { contentDtoSchema, contentsDtoSchema, type ContentDtoType, type ContentsDtoType } from "starsquid/schemas";

export const squidexClient = SquidexClientFactory(
  import.meta.env.SQUIDEX_APP_NAME,
  import.meta.env.SQUIDEX_CLIENT_ID,
  import.meta.env.SQUIDEX_CLIENT_SECRET,
  import.meta.env.SQUIDEX_URL
);


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function fixLinksMetadata(content: Record<string, any>) {
  if (content.links && typeof content.links === "object") {
    for (const key of Object.keys(content.links)) {
      const link = content.links[key];
      if (link && typeof link === "object" && !link.metadata) {
        link.metadata = null;
      }
    }
  }
}

async function parseWithSchema<T extends BaseSchema>(
  schema: T,
  data: unknown,
  schemaName: string
): Promise<T> {
  const parsedResult = await schema.safeParseAsync(data);
  if (!parsedResult.success) {
    throw new Error(
      `Invalid data for schema "${schemaName}".\nError: ${parsedResult.error}\nData: ${JSON.stringify(data, null, 2)}`
    );
  }
  return parsedResult.data;
}

/**
 * Extract all fields from Zod Schema (format: data.fieldName)
 * @param schema Zod Schema object
 * @returns comma-delimited field path string, such as "data.field1,data.field2"
 */
export function extractSchemaFields(schema: BaseSchema): string {
  return Object.keys(schema.shape)
    .map(key => `data.${key}`)
    .join(',');
}

export async function getContentByIds<T extends BaseSchema>(schemaName: string, schema: T, ids: string[]): Promise<ContentsDtoType<T>> {
  const contents = await squidexClient.contents.getContents(schemaName);
  contents.items = contents.items.filter((item) => ids.includes(item.id));

  fixLinksMetadata(contents);
  contents.items.flatMap(fixLinksMetadata);

  const parsedContentsSchema = contentsDtoSchema(schema);

  const parsedContents = parseWithSchema(parsedContentsSchema, contents, schemaName);

  return parsedContents as unknown as ContentsDtoType<T>;
}

export async function getContentById<T extends BaseSchema>(schemaName: string, schema: T, id: string): Promise<ContentDtoType<T>> {
  const content = await squidexClient.contents.getContent(schemaName, id);
  fixLinksMetadata(content);

  const parsedContentSchema = contentDtoSchema(schema);
  const parsedContent = parseWithSchema(parsedContentSchema, content, schemaName);

  return parsedContent as unknown as ContentDtoType<T>;
}

export async function getReferences<T extends BaseSchema>(
  schemaName: string,
  schema: T,
  id: string,
): Promise<ContentsDtoType<T>> {
  const fields = extractSchemaFields(schema);
  const referencesData = await squidexClient.contents.getReferences(schemaName, id, { fields: fields });
  const parsedContentsSchema = contentsDtoSchema(schema);

  referencesData.items.flatMap(fixLinksMetadata);

  const parsedContents = parseWithSchema(parsedContentsSchema, referencesData, schemaName);

  return parsedContents as unknown as ContentsDtoType<T>;
}

export async function getReferencing<T extends BaseSchema>(
  schemaName: string,
  schema: T,
  id: string,
): Promise<ContentsDtoType<T>> {
  const fields = extractSchemaFields(schema);
  const referencesData = await squidexClient.contents.getReferencing(schemaName, id, { fields: fields });
  const parsedContentsSchema = contentsDtoSchema(schema);

  referencesData.items.flatMap(fixLinksMetadata);

  const parsedContents = parseWithSchema(parsedContentsSchema, referencesData, schemaName);

  return parsedContents as unknown as ContentsDtoType<T>;
}
