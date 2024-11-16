import { z } from "astro/zod";

export const WebHookSecretSchema = () =>
  z.string().describe("The webhook sercret of your squidex.");
