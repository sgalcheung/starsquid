import { z } from "astro/zod";

export const EntrypointSchema = () =>
  z.string().describe("The path of your SSR router handler entry point.");
