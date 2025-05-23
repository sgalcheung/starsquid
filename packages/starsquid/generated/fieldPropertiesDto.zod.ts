// Generated by ts-to-zod
import { z } from "zod";

export const fieldPropertiesDtoSchema = z.object({
  label: z.string().optional().nullable(),
  hints: z.string().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  isRequired: z.boolean().optional(),
  isRequiredOnPublish: z.boolean().optional(),
  isHalfWidth: z.boolean().optional(),
  editorUrl: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  fieldType: z.string(),
});
