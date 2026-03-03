import { z } from "zod";

const objectIdString = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const bodyweightEntrySchema = z.object({
  date: z.string(),
  weight: z.number().min(0)
});

export const createProfileSchema = z.object({
  userId: objectIdString,
  displayName: z.string().min(1).max(50),
  avatarUrl: z.string().optional(),
  bio: z.string().optional(),

  settings: z
    .object({
      units: z.enum(["lbs", "kg"]).optional(),
      defaultRestSeconds: z.number().int().min(0).optional(),
      privateMode: z.boolean().optional()
    })
    .optional(),

  stats: z
    .object({
      bodyweightHistory: z.array(bodyweightEntrySchema).optional(),
      prs: z
        .object({
          benchPress: z.number().min(0).nullable().optional(),
          squat: z.number().min(0).nullable().optional(),
          deadlift: z.number().min(0).nullable().optional()
        })
        .optional()
    })
    .optional()
});

export const updateProfileSchema = createProfileSchema.partial();