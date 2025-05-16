import { FetchError, SquidexNotFoundError, type FieldDto, type FieldPropertiesDto, type NestedFieldDto, type SchemaDto } from "@squidex/squidex";
import { z, type ZodTypeAny } from "astro/zod";
import { match, P } from "ts-pattern";
import type { SquidexClientFactory } from "./data/core/api.js";
import { AstroError } from "astro/errors";
import { contentDtoSchema } from "./data/models/schemas.js";

export interface SquidexField extends Omit<Partial<FieldDto>, "nested"> {
  name: string;
  properties: {
    isRequired: boolean,
    fieldType: string,
    schemaIds?: Array<string>,
    editor?: string,
  } & Partial<FieldPropertiesDto>;
  nested?: Array<{
    name: string;
    properties: {
      isRequired: boolean,
      fieldType: string,
    } & Partial<FieldPropertiesDto>;
  } & Partial<NestedFieldDto>>;
}

// Define sets for different Squidex field types
const STRING_TYPES = new Set([
  "String",
  "RichText"
]);

const STRING_LIST_TYPES = new Set([
  "Assets",
  "References",
  "Tags",
]);

const COMPONENT_TYPES = new Set([
  "Component",
  "Components"
]);

enum STRING_EditorType {
  Input = "Input",
  TextArea = "TextArea",
  RichText = "RichText",
  Slug = "Slug",
  Markdown = "Markdown",
  Dropdown = "Dropdown",
  Radio = "Radio",
  Html = "Html",
  StockPhoto = "StockPhoto",
  Color = "Color",
}

// Define schemas for complex field types

const nestedSchema = async (fields: FieldDto[] | SquidexField[], client: ReturnType<typeof SquidexClientFactory>) => {
  if (Array.isArray(fields) && fields.length > 0) {
    const schemaObject: Record<string, ZodTypeAny> = {};

    for (const item of fields) {
      if (item.name && item.properties) {
        const isRequired = item.properties.isRequired ?? false;
        const value = await squidexTypeToZodType({
          name: item.name,
          properties: {
            ...item.properties,
            isRequired,
          },
        }, client);

        // Add each field type to the Zod object
        schemaObject[item.name] = value;
      }
    }
    return z.object(schemaObject);
  }
  return z.unknown();
}

const geolocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const textContentSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

const paragraphContentSchema = z.object({
  type: z.literal("paragraph"),
  content: z.array(textContentSchema),
});

const docSchema = z.object({
  type: z.literal("doc"),
  content: z.array(paragraphContentSchema),
});

// TODO: Implement other editor type
const editorMap = new Map<string, ZodTypeAny>([
  [STRING_EditorType.Input, z.string()],
  [STRING_EditorType.RichText, docSchema],
  [STRING_EditorType.Markdown, z.string()],
]);

// Define function for zod
function isEmptyZodObject(schema: ZodTypeAny): boolean {
  if (!schema || typeof schema !== 'object') return false;
  if ('_def' in schema && schema._def?.typeName === 'ZodObject') {
    const shape = (schema as z.ZodObject<any>).shape;
    return Object.keys(shape).length === 0;
  }
  return false;
}

function squidexWrapper<T extends ZodTypeAny>(schema: T, isRequired: boolean | undefined) {
  if ('_def' in schema && schema._def?.typeName === 'ZodNull') {
    return schema.optional();
  }
  if (isEmptyZodObject(schema)) return schema.optional();

  if (!isRequired) {
    return z.object({
      iv: schema.nullable()
    });
  }

  return z.object({
    iv: schema
  });
}

// iv as user config, default have

export const squidexTypeToZodType = async (field: SquidexField, client: ReturnType<typeof SquidexClientFactory>): Promise<z.ZodTypeAny> => {
  return await match(field)
    // The writing order is consistent with the official docs (https://docs.squidex.io/id-02-documentation/concepts/schemas#field-types).
    .with({
      properties: P.select("properties", {
        fieldType: P.when((t) => STRING_TYPES.has(t)),
      }),
    },
      ({ properties }: {
        properties: {
          fieldType: string;
          editor?: string | undefined;
        };
      }) => {
        const fieldType = properties.fieldType;
        if (fieldType === STRING_EditorType.RichText) return docSchema;

        const editor = properties.editor;
        return editorMap.get(editor ?? STRING_EditorType.Input) ?? z.unknown()
      })
    .with({ properties: { fieldType: "Number" } }, () => z.number())
    .with({ properties: { fieldType: "Boolean" } }, () => z.boolean())
    .with({ properties: { fieldType: "DateTime" } }, () => z.coerce.date())
    .with({ properties: { fieldType: P.when((t) => STRING_LIST_TYPES.has(t)) } }, () => z.array(z.string()))
    .with(
      { properties: { fieldType: "Array" }, nested: P.optional(P.select("nested")) },
      async ({ nested }) => {
        if (Array.isArray(nested) && nested.length > 0) {
          const nestedSchemas = await nestedSchema(nested, client);
          return z.array(nestedSchemas);
        }
        // If there are no nested fields, it defaults to an array of unknown type
        return z.array(z.unknown());
      }
    )
    .with(
      {
        properties: P.select("properties", {
          fieldType: P.when((t) => COMPONENT_TYPES.has(t)),
        }),
      },
      async ({ properties }: {
        properties: {
          fieldType: string;
          isRequired: boolean;
          schemaIds?: string[];
        };
      }) => {
        const schemaIds = properties.schemaIds;
        const isSingle = properties.fieldType === "Component";

        if (Array.isArray(schemaIds)) {
          const results = await Promise.all(
            schemaIds.map(async (schemaId) => {
              const schema = await client.schemas.getSchema(schemaId);
              const schemaFields = schema.fields;
              return await nestedSchema(schemaFields, client);
            })
          );

          // Filter out undefined or null results
          const validResults = results.filter((result) => result !== undefined && result !== null);

          // If there is only one valid result, return it directly; if there are multiple, use z.union
          if (validResults.length === 1) {
            return isSingle ? validResults[0] : z.array(validResults[0]);
          }
          if (validResults.length > 1) {
            return isSingle
              ? z.union(validResults as unknown as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]])
              : z.array(z.union(validResults as unknown as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]));
          }
        }
        return z.object({})
      }
    )
    .with({ properties: { fieldType: "Geolocation" } }, () => geolocationSchema)
    .with({ properties: { fieldType: "Json" } }, () => z.record(z.unknown()))
    .with({ properties: { fieldType: "UI" } }, () => z.null())
    .otherwise(() => z.unknown());
}

// Generate Zod schema from Squidex Schema
export const zodSchemaFromSquidexSchema = async ({
  schemaName,
  client
}: {
  schemaName: string,
  client: ReturnType<typeof SquidexClientFactory>
}) => {
  let schema: SchemaDto = {} as SchemaDto;
  try {
    schema = await client.schemas.getSchema(schemaName);
  } catch (error) {
    if (error instanceof SquidexNotFoundError) {
      throw new AstroError(`The specified schema does not exist in this Squidex app: ${schemaName}`);
    } else if (error instanceof FetchError) {
      throw new AstroError('Network layer error:', error.cause.message);
    } else {
      throw new AstroError("unknow error");
    }
  }

  const schemaObject: Record<string, ZodTypeAny> = {};

  for (const field of schema.fields) {
    const zodType = await squidexTypeToZodType(field as SquidexField, client);
    schemaObject[field.name] = squidexWrapper(zodType, field.properties.isRequired);;
  }

  const dataZodType = z.object(schemaObject);
  return contentDtoSchema(dataZodType)
};
