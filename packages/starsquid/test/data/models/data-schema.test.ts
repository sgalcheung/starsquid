import { squidexFieldFixtures } from "../../fixtures/fileds";
import { squidexTypeToZodType } from "../../../src/data/models/data-schema";
import { z } from "astro/zod";
import { test, describe, expect } from "../../vitest.setup"
import { isZodType, zodToStructure } from "../../_utils";

describe("Data Schema", async () => {
  test("Should map String to z.string()", async ({ client }) => {
    const field = squidexFieldFixtures.String;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodString);
  });

  test("Should map Assets to z.array(z.string())", async ({ client }) => {
    const field = squidexFieldFixtures.Assets;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodArray);
    const innerType = (schema as z.ZodArray<z.ZodString>).element;
    expect(innerType).toBeInstanceOf(z.ZodString);
  });

  test("Should map Boolean to z.boolean()", async ({ client }) => {
    const field = squidexFieldFixtures.Boolean;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodBoolean);
  });

  test("Should map Component(Button) to z.object(z.record(z.unknown()))", async ({ client }) => {
    const field = squidexFieldFixtures.Component;
    const schema = await squidexTypeToZodType(field, client);
    // console.log(zodToStructure(schema))
    expect(schema).toBeInstanceOf(z.ZodObject);

    const objSchema = schema as z.ZodObject<{
      name: z.ZodTypeAny;
      description: z.ZodTypeAny;
    }>;
    expect(objSchema.shape).toHaveProperty("name");
    expect(objSchema.shape).toHaveProperty("description");
  });

  test("Should map Component(Select) to z.union([z.object(z.record(z.unknown())) | z.object(z.record(z.unknown()))])", async ({ client }) => {
    const field = squidexFieldFixtures.ComponentSelect;
    const schema = await squidexTypeToZodType(field, client);
    // console.log(zodToStructure(schema))
    expect(schema).toBeInstanceOf(z.ZodUnion);

    // Get all options in a union
    const unionOptions = (schema as z.ZodUnion<[z.AnyZodObject, z.AnyZodObject]>).options;

    // Determines whether the first type is an object and contains the attribute "name"
    expect(unionOptions[0]).toBeInstanceOf(z.ZodObject);
    expect(unionOptions[0].shape).toHaveProperty("name");

    // Determine whether the second type is an object and contains multiple attributes
    expect(unionOptions[1]).toBeInstanceOf(z.ZodObject);
    const shape = unionOptions[1].shape;
    expect(shape).toHaveProperty("name");
    expect(shape).toHaveProperty("description");
    expect(shape).toHaveProperty("rooms");
    expect(shape).toHaveProperty("minPrice");
    expect(shape).toHaveProperty("photos");
    expect(shape).toHaveProperty("slug");
  });

  test("Should map Components(List) to z.array(z.object(z.record(z.unknown())))", async ({ client }) => {
    const field = squidexFieldFixtures.Components;
    const schema = await squidexTypeToZodType(field, client);
    // console.log(zodToStructure(schema));
    // z.array(z.object({ name: z.string() }))
    expect(schema).toBeInstanceOf(z.ZodArray);
    const innerType = (schema as z.ZodArray<z.AnyZodObject>).element;
    expect(innerType).toBeInstanceOf(z.ZodObject);
  });

  test("Should map Components(SelectList) to z.array(z.union([z.object(z.record(z.unknown())) | z.object(z.record(z.unknown()))]))", async ({ client }) => {
    const field = squidexFieldFixtures.ComponentsSelect;
    const schema = await squidexTypeToZodType(field, client);
    console.log(zodToStructure(schema));
    // z.array(z.union([z.object({ name: z.string() }) | z.object({ name: z.string(), description: z.unknown(), rooms: z.number(), minPrice: z.number(), photos: z.array(z.string()), slug: z.string() })]))
    expect(schema).toBeInstanceOf(z.ZodArray);

    const innerType = (schema as z.ZodArray<z.ZodUnion<[z.AnyZodObject, z.AnyZodObject]>>).element;
    expect(innerType).toBeInstanceOf(z.ZodUnion);

    const unionOptions = innerType.options;

    // Determines whether the first type is an object and contains the attribute "name"
    expect(unionOptions[0]).toBeInstanceOf(z.ZodObject);
    expect(unionOptions[0].shape).toHaveProperty("name");

    // Determine whether the second type is an object and contains multiple attributes
    expect(unionOptions[1]).toBeInstanceOf(z.ZodObject);
    const shape = unionOptions[1].shape;
    expect(shape).toHaveProperty("name");
    expect(shape).toHaveProperty("description");
    expect(shape).toHaveProperty("rooms");
    expect(shape).toHaveProperty("minPrice");
    expect(shape).toHaveProperty("photos");
    expect(shape).toHaveProperty("slug");
  });

  test("Should map Empty Component to z.object({})", async ({ client }) => {
    const field = squidexFieldFixtures.EmptyComponent;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodObject);

    const emptyObjectSchema = schema as z.ZodObject<Record<string, never>>;
    expect(Object.keys(emptyObjectSchema.shape).length).toEqual(0);
  });

  test("Should map DateTime to z.date()", async ({ client }) => {
    const field = squidexFieldFixtures.DateTime;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodDate);
  });

  test("Should map Geolocation to geolocationSchema", async ({ client }) => {
    const field = squidexFieldFixtures.Geolocation;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodObject);

    const geoSchema = schema as z.ZodObject<{
      latitude: z.ZodNumber;
      longitude: z.ZodNumber;
    }>;
    expect(geoSchema.shape).toHaveProperty("latitude");
    expect(geoSchema.shape.latitude).toBeInstanceOf(z.ZodNumber);

    expect(geoSchema.shape).toHaveProperty("longitude");
    expect(geoSchema.shape.longitude).toBeInstanceOf(z.ZodNumber);
  });

  test("Should map Json to z.record(z.unknown())", async ({ client }) => {
    const field = squidexFieldFixtures.Json;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodRecord);

    const recordSchema = schema as z.ZodRecord<z.ZodString, z.ZodUnknown>;
    expect(recordSchema.valueSchema).toBeInstanceOf(z.ZodUnknown);

    expect(recordSchema.keySchema).toBeInstanceOf(z.ZodString);
  });

  test("Should map Number to z.number()", async ({ client }) => {
    const field = squidexFieldFixtures.Number;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodNumber);
  });

  test("Should map References to z.array(z.string())", async ({ client }) => {
    const field = squidexFieldFixtures.References;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodArray);
    const innerType = (schema as z.ZodArray<z.ZodString>).element;
    expect(innerType).toBeInstanceOf(z.ZodString);
  });

  test("Should map RichText to docSchema", async ({ client }) => {
    const field = squidexFieldFixtures.RichText;
    const schema = await squidexTypeToZodType(field, client);

    type TextNode = z.ZodObject<{
      type: z.ZodLiteral<"text">;
      text: z.ZodString;
    }>;

    type ParagraphContent = z.ZodArray<TextNode>;

    type ParagraphNode = z.ZodObject<{
      type: z.ZodLiteral<"paragraph">;
      content: ParagraphContent;
    }>;

    type DocSchema = z.ZodObject<{
      type: z.ZodLiteral<"doc">;
      content: z.ZodArray<ParagraphNode>;
    }>;

    // console.log(zodToStructure(schema));
    // z.object({ type: z.literal("doc"), content: z.array(z.object({ type: z.literal("paragraph"), content: z.array(z.object({ type: z.literal("text"), text: z.string() })) })) })
    expect(schema).toBeInstanceOf(z.ZodObject);

    // Test document structure
    const docSchema = schema as DocSchema;
    expect(docSchema.shape.type).toBeInstanceOf(z.ZodLiteral);
    expect(docSchema.shape.type.value).toBe("doc");

    // Test content array
    const contentArray = docSchema.shape.content;
    expect(contentArray).toBeInstanceOf(z.ZodArray);
    // console.log(zodToStructure(contentArray));
    // z.array(z.object({ type: z.literal("paragraph"), content: z.array(z.object({ type: z.literal("text"), text: z.string() })) }))

    // Test paragraph element
    const paragraphElement = contentArray.element;
    // console.log(zodToStructure(paragraphElement));
    // z.object({ type: z.literal("paragraph"), content: z.array(z.object({ type: z.literal("text"), text: z.string() })) })
    expect(paragraphElement).toBeInstanceOf(z.ZodObject);
    expect(paragraphElement.shape.type).toBeInstanceOf(z.ZodLiteral);
    expect(paragraphElement.shape.type.value).toBe("paragraph");
    
    // Test paragraph content
    const paragraphContent = paragraphElement.shape.content;
    // console.log(zodToStructure(paragraphContent));
    expect(paragraphContent).toBeInstanceOf(z.ZodArray);

    // Test text node
    const textNode = paragraphContent.element;
    // console.log(zodToStructure(textNode));
    // z.array(z.object({ type: z.literal("text"), text: z.string() }))
    expect(textNode.shape.type).toBeInstanceOf(z.ZodLiteral);
    expect(textNode.shape.type.value).toBe("text");
    expect(textNode.shape.text).toBeInstanceOf(z.ZodString);
  });

  test("Should map Tags to z.array(z.string())", async ({ client }) => {
    const field = squidexFieldFixtures.Tags;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodArray);
    const innerType = (schema as z.ZodArray<z.ZodString>).element;
    expect(innerType).toBeInstanceOf(z.ZodString);
  });

  test("Should map Array to nestedSchema", async ({ client }) => {
    const field = squidexFieldFixtures.Array;
    const schema = await squidexTypeToZodType(field, client);
    // console.log(zodToStructure(schema))
    // z.array(z.object({ name: z.string(), otherschema: z.array(z.string()) }))
    expect(schema).toBeInstanceOf(z.ZodArray);
    const arraySchema = schema as z.ZodArray<
      z.ZodObject<{
        name: z.ZodString;
        otherschema: z.ZodArray<z.ZodString>;
      }>
    >;

    const elementType = arraySchema.element;
    expect(elementType).toBeInstanceOf(z.ZodObject);

    const shape = elementType.shape;
    expect(shape.name).toBeInstanceOf(z.ZodString);
    expect(shape.otherschema).toBeInstanceOf(z.ZodArray);

    expect(shape.otherschema.element).toBeInstanceOf(z.ZodString);
  });

  test("Should map UI to z.null()", async ({ client }) => {
    const field = squidexFieldFixtures.UI;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodNull);
    expect(isZodType(schema, "ZodNull")).toBe(true);
  });
});
