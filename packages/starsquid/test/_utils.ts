import { ZodTypeAny } from "Astro/zod";

export function isZodType(schema: ZodTypeAny, zodType: string): boolean {
  return !!schema?._def?.typeName && schema._def.typeName === zodType;
}

// Recursively parse Zod type as a string-like object
export function zodToStructure(schema: ZodTypeAny): string {
  if (isZodType(schema, "ZodObject")) {
    const shape = schema._def.shape();
    const properties = Object.entries(shape)
      .map(([key, value]) => `${key}: ${zodToStructure(value as ZodTypeAny)}`)
      .join(", ");
    return `z.object({ ${properties} })`;
  }

  if (isZodType(schema, "ZodArray")) {
    const itemType = zodToStructure(schema._def.type);
    return `z.array(${itemType})`;
  }

  if (isZodType(schema, "ZodUnion")) {
    const options = schema._def.options
      .map((option: ZodTypeAny) => zodToStructure(option))
      .join(" | ");
    return `z.union([${options}])`;
  }

  // Basic type direct output
  if (isZodType(schema, "ZodString")) return "z.string()";
  if (isZodType(schema, "ZodNumber")) return "z.number()";
  if (isZodType(schema, "ZodBoolean")) return "z.boolean()";
  if (isZodType(schema, "ZodDate")) return "z.date()";
  if (isZodType(schema, "ZodUnknown")) return "z.unknown()";
  if (isZodType(schema, "ZodLiteral")) return `z.literal(${JSON.stringify(schema._def.value)})`;
  if (isZodType(schema, "ZodNull")) return "z.null()";

  if (isZodType(schema, "ZodOptional")) {
    const innerType = zodToStructure(schema._def.innerType);
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
