import { expect, test } from "vitest";
import { StarlightSSRConfigSchema } from "../utils/user-config";

test("valid pattern", () => {
  const validConfig = {
    entrypoint: "./src/components/Route.astro",
    pattern: "section/[...dynamic]",
  };

  const result = StarlightSSRConfigSchema.safeParse(validConfig);
  expect(result.success).toBe(true);
});

test("pattern should not be '[...slug]'", () => {
  const invalidConfig = {
    entrypoint: "./src/components/Route.astro",
    pattern: "[...slug]",
  };

  const result = StarlightSSRConfigSchema.safeParse(invalidConfig);
  expect(result.success).toBe(false);

  if (!result.success) {
    // Check for the specific error message
    expect(result.error.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message:
            "The pattern '[...slug]' is reserved. Please use a different pattern.",
        }),
      ])
    );
  }
});

test("pattern must contain '[]' and end with ']'", () => {
  const invalidConfig = {
    entrypoint: "./src/components/Route.astro",
    pattern: "page/static",
  };

  const result = StarlightSSRConfigSchema.safeParse(invalidConfig);
  expect(result.success).toBe(false);

  if (!result.success) {
    // Check for the specific error message
    expect(result.error.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "The pattern must contain '[]' and end with ']'.",
        }),
      ])
    );
  }
});

test("valid pattern with square brackets", () => {
  const validConfig = {
    entrypoint: "./src/components/Route.astro",
    pattern: "section/[id]",
  };

  const result = StarlightSSRConfigSchema.safeParse(validConfig);
  expect(result.success).toBe(true);
});
