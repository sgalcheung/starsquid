import { ZodType } from "zod";
import { z } from "astro/zod";
import type {
  ResourceLink,
  AppDto,
  FeatureDto,
  FeaturesDto,
  ScheduleJobDto,
  StatusInfoDto,
  ContentDto,
  ContentsDto,
} from "@squidex/squidex";

export enum SCHEMAS {
  APP = "app",
  FEATURES = "features",
  CONTENTS = "contents",
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

export const scheduleJobDtoSchema = z.object({
  id: z.string(),
  status: z.string(),
  dueTime: z.coerce.date(),
  color: z.string(),
  scheduledBy: z.string(),
}) satisfies ZodType<ScheduleJobDto>;

export const statusInfoDtoSchema = z.object({
  status: z.string(),
  color: z.string(),
}) satisfies ZodType<StatusInfoDto>;

const fieldDtoSchema = z.any();

export const contentDtoSchema = z.object({
  links: z.record(resourceLinkSchema),
  id: z.string(),
  createdBy: z.string(),
  lastModifiedBy: z.string(),
  data: z.any().nullable(),
  referenceData: z.record(z.record(z.any())).optional(),
  created: z.coerce.date(),
  lastModified: z.coerce.date(),
  status: z.string(),
  newStatus: z.string().optional().nullable(),
  statusColor: z.string(),
  newStatusColor: z.string().optional().nullable(),
  editToken: z.string().optional().nullable(),
  scheduleJob: scheduleJobDtoSchema.optional(),
  schemaId: z.string(),
  schemaName: z.string().optional().nullable(),
  schemaDisplayName: z.string().optional().nullable(),
  referenceFields: z.array(fieldDtoSchema).optional().nullable(),
  isDeleted: z.boolean(),
  version: z.number(),
}); // This schema is not validate, because some fileds not used, or referenceFields is inconsistency.
//satisfies ZodType<ContentDto>;

export const contentsDtoSchema = z.object({
  links: z.record(resourceLinkSchema),
  total: z.number(),
  items: z.array(contentDtoSchema),
  statuses: z.array(statusInfoDtoSchema),
});
