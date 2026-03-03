import { z } from "zod";

// Basic ObjectId string check for request bodies
const objectIdString = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const trackingSchema = z
  .object({
    weight: z.boolean().optional(),
    reps: z.boolean().optional(),
    rpe: z.boolean().optional(),
    tempo: z.boolean().optional(),
    distance: z.boolean().optional(),
    time: z.boolean().optional(),
  })
  .optional();

const defaultsSchema = z
  .object({
    restSeconds: z.number().int().min(0).optional(),
    warmupSetsSuggested: z.number().int().min(0).optional(),
  })
  .optional();

const incrementsSchema = z
  .object({
    weightStep: z.number().min(0).optional(),
    repStep: z.number().min(0).optional(),
  })
  .optional();

const configSchema = z
  .object({
    tracking: trackingSchema,
    defaults: defaultsSchema,
    increments: incrementsSchema,
    notesTemplate: z.string().optional(),
  })
  .optional();

export const createExerciseSchema = z.object({
  ownerUserId: objectIdString, // for now (until auth sets this automatically)
  isPublic: z.boolean().optional(),

  sourceExerciseId: objectIdString.nullable().optional(),
  sourceOwnerUserId: objectIdString.nullable().optional(),

  name: z.string().min(1).max(100),
  type: z.enum(["strength", "bodyweight", "cardio", "intervals", "mobility"]),

  equipment: z.array(z.string()).optional(),
  primaryMuscles: z.array(z.string()).optional(),
  secondaryMuscles: z.array(z.string()).optional(),
  movementPattern: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),

  config: configSchema,
});

export const updateExerciseSchema = createExerciseSchema.partial();