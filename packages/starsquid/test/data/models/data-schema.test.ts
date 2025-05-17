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
    const innerType = (schema as z.ZodArray<any>).element;
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
    expect((schema as any).shape).toHaveProperty("name");
    expect((schema as any).shape).toHaveProperty("description");
  });

  test("Should map Component(Select) to z.union([z.object(z.record(z.unknown())) | z.object(z.record(z.unknown()))])", async ({ client }) => {
    const field = squidexFieldFixtures.ComponentSelect;
    const schema = await squidexTypeToZodType(field, client);
    // console.log(zodToStructure(schema))
    expect(schema).toBeInstanceOf(z.ZodUnion);

    // Get all options in a union
    const unionOptions = (schema as z.ZodUnion<any>).options;

    // Determines whether the first type is an object and contains the attribute "name"
    expect(unionOptions[0]).toBeInstanceOf(z.ZodObject);
    expect((unionOptions[0] as z.ZodObject<any>).shape).toHaveProperty("name");

    // Determine whether the second type is an object and contains multiple attributes
    expect(unionOptions[1]).toBeInstanceOf(z.ZodObject);
    const shape = (unionOptions[1] as z.ZodObject<any>).shape;
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
    const innerType = (schema as z.ZodArray<any>).element;
    expect(innerType).toBeInstanceOf(z.ZodObject);
  });

  test("Should map Components(SelectList) to z.array(z.union([z.object(z.record(z.unknown())) | z.object(z.record(z.unknown()))]))", async ({ client }) => {
    const field = squidexFieldFixtures.ComponentsSelect;
    const schema = await squidexTypeToZodType(field, client);
    console.log(zodToStructure(schema));
    // z.array(z.union([z.object({ name: z.string() }) | z.object({ name: z.string(), description: z.unknown(), rooms: z.number(), minPrice: z.number(), photos: z.array(z.string()), slug: z.string() })]))
    expect(schema).toBeInstanceOf(z.ZodArray);

    const innerType = (schema as z.ZodArray<any>).element;
    expect(innerType).toBeInstanceOf(z.ZodUnion);

    const unionOptions = (innerType as z.ZodUnion<any>).options;

    // Determines whether the first type is an object and contains the attribute "name"
    expect(unionOptions[0]).toBeInstanceOf(z.ZodObject);
    expect((unionOptions[0] as z.ZodObject<any>).shape).toHaveProperty("name");

    // Determine whether the second type is an object and contains multiple attributes
    expect(unionOptions[1]).toBeInstanceOf(z.ZodObject);
    const shape = (unionOptions[1] as z.ZodObject<any>).shape;
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
    expect(Object.keys((schema as any).shape).length).toEqual(0);
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
    expect((schema as any).shape).toHaveProperty("latitude");
    expect((schema as any).shape).toHaveProperty("longitude");
  });

  test("Should map Json to z.record(z.unknown())", async ({ client }) => {
    const field = squidexFieldFixtures.Json;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodRecord);
    const innerType = (schema as z.ZodArray<any>).element;
    expect(innerType).toBeInstanceOf(z.ZodUnknown);
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
    const innerType = (schema as z.ZodArray<any>).element;
    expect(innerType).toBeInstanceOf(z.ZodString);
  });

  test("Should map RichText to docSchema", async ({ client }) => {
    const field = squidexFieldFixtures.RichText;
    const schema = await squidexTypeToZodType(field, client);
    // console.log(zodToStructure(schema));
    // z.object({ type: z.literal("doc"), content: z.array(z.object({ type: z.literal("paragraph"), content: z.array(z.object({ type: z.literal("text"), text: z.string() })) })) })
    expect(schema).toBeInstanceOf(z.ZodObject);

    const innerParagraphArray = (schema as z.ZodObject<any>).shape.content;
    expect(innerParagraphArray).toBeInstanceOf(z.ZodArray);
    // console.log(zodToStructure(innerParagraph));
    // z.array(z.object({ type: z.literal("paragraph"), content: z.array(z.object({ type: z.literal("text"), text: z.string() })) }))

    const innerParagraphElement = (innerParagraphArray as z.ZodArray<any>).element;
    // console.log(zodToStructure(innerParagraphElement));
    // z.object({ type: z.literal("paragraph"), content: z.array(z.object({ type: z.literal("text"), text: z.string() })) })
    const innerParagraphObj = (innerParagraphElement as z.ZodObject<any>).shape;
    // console.log(zodToStructure(innerParagraphObj));
    expect(innerParagraphObj).toHaveProperty("type");
    expect(innerParagraphObj).toHaveProperty("content");

    const innerContentArray = (innerParagraphElement as z.ZodObject<any>).shape.content;
    // console.log(zodToStructure(innerContentArray));
    // z.array(z.object({ type: z.literal("text"), text: z.string() }))
    const innerContentElement = (innerContentArray as z.ZodArray<any>).element;
    // console.log(zodToStructure(innerContentElement))
    expect((innerContentElement as any).shape).toHaveProperty("type");
    expect((innerContentElement as any).shape).toHaveProperty("text");
  });

  test("Should map Tags to z.array(z.string())", async ({ client }) => {
    const field = squidexFieldFixtures.Tags;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodArray);
    const innerType = (schema as z.ZodArray<any>).element;
    expect(innerType).toBeInstanceOf(z.ZodString);
  });

  test("Should map Array to nestedSchema", async ({ client }) => {
    const field = squidexFieldFixtures.Array;
    const schema = await squidexTypeToZodType(field, client);
    // console.log(zodToStructure(schema))
    // z.array(z.object({ name: z.string(), otherschema: z.array(z.string()) }))
    expect(schema).toBeInstanceOf(z.ZodArray);
    const innerType = (schema as z.ZodArray<any>).element;
    expect((innerType as any).shape).toHaveProperty("name");
    expect((innerType as any).shape).toHaveProperty("otherschema");
  });

  test("Should map UI to z.null()", async ({ client }) => {
    const field = squidexFieldFixtures.UI;
    const schema = await squidexTypeToZodType(field, client);
    expect(schema).toBeInstanceOf(z.ZodNull);
    expect(isZodType(schema, "ZodNull")).toBe(true);
  });
});
