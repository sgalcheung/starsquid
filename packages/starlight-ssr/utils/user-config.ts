import { z } from "astro/zod";
import { EntrypointSchema } from "../schemas/entry-point";
import { PatternSchema } from "../schemas/pattern";
import { stripLeadingAndTrailingSlashes } from "../libs/path";

const UserConfigSchema = z.object({
  entrypoint: EntrypointSchema(),
  pattern: PatternSchema(),
});

const containsDynamicPattern = /\[\.\.\..+\]$/; //  Pattern must contain '[...]' and end with ']'

export const StarlightSSRConfigSchema = UserConfigSchema.strict()
  .transform((config) => ({
    ...config,
    entrypoint: stripLeadingAndTrailingSlashes(config.entrypoint),
  }))
  .refine((config) => config.pattern !== "[...slug]", {
    message:
      "The pattern '[...slug]' is reserved. Please use a different pattern.",
  })
  .refine((config) => containsDynamicPattern.test(config.pattern), {
    message: "The pattern must contain '[...]' and end with ']'.",
  });

export type StarlightSSRUserConfig = z.input<typeof StarlightSSRConfigSchema>;
