import type { ZodObject, ZodRawShape, ZodType, ZodUnion } from "Astro/zod";

export function isZodType(schema: ZodType, zodType: string): boolean {
  return !!schema?._zod.def?.type && schema._zod.def.type === zodType;
}

// Recursively parse Zod type as a string-like object
export function zodToStructure(schema: ZodType): string {
  if (isZodType(schema, "ZodObject")) {
    const objectSchema = schema as ZodObject<ZodRawShape>;
    const shape = objectSchema.shape;

    const properties = Object.entries(shape)
      .map(([key, value]) => `${key}: ${zodToStructure(value as ZodType)}`)
      .join(", ");

    return `z.object({ ${properties} })`;
  }

  if (isZodType(schema, "ZodArray")) {
    const itemType = zodToStructure(schema);
    return `z.array(${itemType})`;
  }

  if (isZodType(schema, "ZodUnion")) {
    const unionSchema = schema as ZodUnion<[ZodType, ...ZodType[]]>;
    const options = unionSchema.def.options;

    return `z.union([${options.map((option) => zodToStructure(option)).join(" | ")}])`;
  }

  // Basic type direct output
  if (isZodType(schema, "ZodString")) return "z.string()";
  if (isZodType(schema, "ZodNumber")) return "z.number()";
  if (isZodType(schema, "ZodBoolean")) return "z.boolean()";
  if (isZodType(schema, "ZodDate")) return "z.date()";
  if (isZodType(schema, "ZodUnknown")) return "z.unknown()";
  if (isZodType(schema, "ZodLiteral"))
    return `z.literal(${JSON.stringify(schema._zod.output)})`;
  if (isZodType(schema, "ZodNull")) return "z.null()";

  if (isZodType(schema, "ZodOptional")) {
    const innerType = zodToStructure(schema);
    return `${innerType}.optional()`;
  }

  return "z.any()";
}

export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function guid(): string {
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function s4(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
