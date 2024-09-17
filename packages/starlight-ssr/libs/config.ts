import type { AstroIntegrationLogger } from "astro";
import { AstroError } from "astro/errors";
import { z } from "astro/zod";

import { StarlightSSRConfigSchema } from "../utils/user-config";

const configSchema = StarlightSSRConfigSchema;

export function validateConfig(
  logger: AstroIntegrationLogger,
  userConfig: unknown
): StarlightSSRConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    const errors = config.error.flatten();

    logger.error("Invalid starlight-squidex configuration.");

    throw new AstroError(
      `
${errors.formErrors.map((formError) => ` - ${formError}`).join("\n")}
${Object.entries(errors.fieldErrors)
  .map(
    ([fieldName, fieldErrors]) =>
      ` - ${fieldName}: ${(fieldErrors ?? []).join(" - ")}`
  )
  .join("\n")}
  `,
      `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/sgalcheung/starlight-squidex/issues/new/choose`
    );
  }

  return config.data;
}

export type StarlightSSRUserConfig = z.input<typeof configSchema>;
export type StarlightSSRConfig = z.output<typeof configSchema>;
