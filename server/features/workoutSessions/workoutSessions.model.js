import mongoose from "mongoose";

const { Schema } = mongoose;

const performedSetSchema = new Schema(
  {
    reps: { type: Number, min: 0, default: null },
    weight: { type: Number, min: 0, default: null },
    rpe: { type: Number, min: 0, max: 10, default: null },

    timeSeconds: { type: Number, min: 0, default: null },     // optional for timed sets
    distance: { type: Number, min: 0, default: null },        // optional for cardio

    notes: { type: String, default: "" },
    completedAt: { type: Date, default: Date.now }
  },
  { _id: true } // keep _id so sets can be edited/deleted later if you want
);

const performedExerciseSchema = new Schema(
  {
    exerciseId: { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
    exerciseNameSnapshot: { type: String, required: true, trim: true },

    // later you can add routineExerciseId snapshot if you want tighter linking
    // routineExerciseId: { type: Schema.Types.ObjectId, default: null },

    sets: { type: [performedSetSchema], default: [] }
  },
  { _id: true }
);

const workoutSessionSchema = new Schema(
  {
    ownerUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },

    routineId: { type: Schema.Types.ObjectId, ref: "Routine", default: null },
    routineNameSnapshot: { type: String, default: "" },

    startedAt: { type: Date, default: Date.now, index: true },
    endedAt: { type: Date, default: null },

    performedExercises: { type: [performedExerciseSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("WorkoutSession", workoutSessionSchema);