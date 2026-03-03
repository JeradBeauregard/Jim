import mongoose from "mongoose";

const { Schema } = mongoose;

// Each set in a prescription (planned set)
const prescriptionSetSchema = new Schema(
  {
    targetReps: { type: Number, min: 0, default: null },
    targetWeight: { type: Number, min: 0, default: null },
    restSeconds: { type: Number, min: 0, default: null }
  },
  { _id: false }
);

// Optional progression rules per routine exercise (can ignore for MVP)
const progressionSchema = new Schema(
  {
    mode: { type: String, enum: ["suggest", "autoApply", "off"], default: "off" },
    rule: { type: String, enum: ["double_progression", "linear"], default: "double_progression" },
    repRange: {
      min: { type: Number, min: 0, default: null },
      max: { type: Number, min: 0, default: null }
    },
    weightStep: { type: Number, min: 0, default: null }
  },
  { _id: false }
);

const prescriptionSchema = new Schema(
  {
    sets: { type: [prescriptionSetSchema], default: [] },
    progression: { type: progressionSchema, default: null }
  },
  { _id: false }
);

// Optional per-routine override of exercise config (advanced; safe to ignore for MVP)
const overridesSchema = new Schema(
  {
    defaults: {
      restSeconds: { type: Number, min: 0, default: null }
    }
  },
  { _id: false }
);

// One “block” in the routine
const routineExerciseSchema = new Schema(
  {
    exerciseId: { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
    orderIndex: { type: Number, required: true, min: 0 },

    prescription: { type: prescriptionSchema, default: () => ({}) },

    overrides: { type: overridesSchema, default: null }, // optional
    notes: { type: String, default: "" }
  },
  {
    _id: true // keep subdocument _id so you can reference this block during workout sessions
  }
);

const routineSchema = new Schema(
  {
    ownerUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    isPublic: { type: Boolean, default: false, index: true },

    sourceRoutineId: { type: Schema.Types.ObjectId, ref: "Routine", default: null },
    sourceOwnerUserId: { type: Schema.Types.ObjectId, ref: "User", default: null },

    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },

    routineExercises: { type: [routineExerciseSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Routine", routineSchema);