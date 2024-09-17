import { z } from "astro/zod";

export const PatternSchema = () =>
  z.string().describe("The dynamic router of your SSR pattern.");
