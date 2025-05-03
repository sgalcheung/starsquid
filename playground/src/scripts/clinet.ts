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

type ParsedSchemaResult = ReturnType<ReturnType<typeof contentDtoSchema>["parse"]> | null;

function processItem(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  item: Record<string, any>,
  schema: BaseSchema,
  aggregatedErrors: Error[],
  result: ParsedSchemaResult[]
) {
  fixLinksMetadata(item);
  const parsedContents = schema.safeParse(item);
  const parsedResult = parsedContents.success ? parsedContents.data : null;
  if (!parsedContents.success) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(parsedContents.error);
    } else {
      aggregatedErrors.push(parsedContents.error);
    }
  }
  result.push(parsedResult);
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


export async function getReferences(
  schemaName: string,
  schema: BaseSchema,
  id: string,
) {
  const fields = extractSchemaFields(schema);
  const referencesData = await squidexClient.contents.getReferences(schemaName, id, { fields: fields });
  const parsedContentsSchema = contentDtoSchema(schema);

  const result: ParsedSchemaResult[] = [];
  const aggregatedErrors: Error[] = []; // Collect errors for batch reporting

  for (const item of referencesData.items) {
    processItem(item, parsedContentsSchema, aggregatedErrors, result);
  }

  return result;
}

export async function getReferencing(
  schemaName: string,
  schema: BaseSchema,
  id: string,
) {
  const fields = extractSchemaFields(schema);
  const referencesData = await squidexClient.contents.getReferencing(schemaName, id, { fields: fields });
  const parsedContentsSchema = contentDtoSchema(schema);

  const result: ParsedSchemaResult[] = [];
  const aggregatedErrors: Error[] = [];

  for (const item of referencesData.items) {
    processItem(item, parsedContentsSchema, aggregatedErrors, result);
  }

  return result;
}
