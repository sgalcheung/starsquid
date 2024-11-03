import { ZodType } from "zod";
import { z } from "astro/zod";
import type {
  ResourceLink,
  AppDto,
  FeatureDto,
  FeaturesDto,
} from "@squidex/squidex";

export enum SCHEMAS {
  APP = "app",
  FEATURES = "features",
}

export const resourceLinkSchema = z.object({
  href: z.string(),
  method: z.string(),
  metadata: z.string().optional().nullable(),
}) satisfies ZodType<ResourceLink>;

export const appDtoSchema = z.object({
  links: z.record(resourceLinkSchema),
  id: z.string(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  version: z.number(),
  created: z.coerce.date(),
  lastModified: z.coerce.date(),
  teamId: z.string().optional().nullable(),
  permissions: z.array(z.string()),
  canAccessApi: z.boolean(),
  canAccessContent: z.boolean(),
  roleName: z.string().optional().nullable(),
  roleProperties: z.record(z.any()),
}) satisfies ZodType<AppDto>;

export const featureDtoSchema = z.object({
  name: z.string(),
  text: z.string(),
}) satisfies ZodType<FeatureDto>;

export const featuresDtoSchema = z.object({
  features: z.array(featureDtoSchema),
  version: z.number(),
}) satisfies ZodType<FeaturesDto>;
