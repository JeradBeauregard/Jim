import { z } from "zod";

const objectIdString = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const performedSetSchema = z.object({
  reps: z.number().int().min(0).nullable().optional(),
  weight: z.number().min(0).nullable().optional(),
  rpe: z.number().min(0).max(10).nullable().optional(),

  timeSeconds: z.number().min(0).nullable().optional(),
  distance: z.number().min(0).nullable().optional(),

  notes: z.string().optional(),
  completedAt: z.coerce.date().optional()
});

const performedExerciseSchema = z.object({
  exerciseId: objectIdString,
  exerciseNameSnapshot: z.string().min(1).max(120),
  sets: z.array(performedSetSchema).optional()
});

export const createWorkoutSessionSchema = z.object({
  ownerUserId: objectIdString,

  routineId: objectIdString.nullable().optional(),
  routineNameSnapshot: z.string().optional(),

  startedAt: z.coerce.date().optional(),
  endedAt: z.coerce.date().nullable().optional(),

  performedExercises: z.array(performedExerciseSchema).optional()
});

export const updateWorkoutSessionSchema = createWorkoutSessionSchema.partial();