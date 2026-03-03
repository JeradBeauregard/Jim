import { z } from "zod";

const objectIdString = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const prescriptionSetSchema = z.object({
  targetReps: z.number().int().min(0).nullable().optional(),
  targetWeight: z.number().min(0).nullable().optional(),
  restSeconds: z.number().int().min(0).nullable().optional()
});

const progressionSchema = z
  .object({
    mode: z.enum(["suggest", "autoApply", "off"]).optional(),
    rule: z.enum(["double_progression", "linear"]).optional(),
    repRange: z
      .object({
        min: z.number().int().min(0).nullable().optional(),
        max: z.number().int().min(0).nullable().optional()
      })
      .optional(),
    weightStep: z.number().min(0).nullable().optional()
  })
  .optional();

const routineExerciseSchema = z.object({
  exerciseId: objectIdString,
  orderIndex: z.number().int().min(0),

  prescription: z
    .object({
      sets: z.array(prescriptionSetSchema).optional(),
      progression: progressionSchema
    })
    .optional(),

  overrides: z
    .object({
      defaults: z
        .object({
          restSeconds: z.number().int().min(0).nullable().optional()
        })
        .optional()
    })
    .optional(),

  notes: z.string().optional()
});

export const createRoutineSchema = z.object({
  ownerUserId: objectIdString,
  isPublic: z.boolean().optional(),

  sourceRoutineId: objectIdString.nullable().optional(),
  sourceOwnerUserId: objectIdString.nullable().optional(),

  name: z.string().min(1).max(100),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),

  routineExercises: z.array(routineExerciseSchema).optional()
});

export const updateRoutineSchema = createRoutineSchema.partial();