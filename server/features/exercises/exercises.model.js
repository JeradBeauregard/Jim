// features/exercises/exercise.model.js

import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * TRACKING CONFIG
 * Controls what inputs the workout UI should show
 * Example:
 * - Strength → weight + reps
 * - Cardio → time + distance
 * - Bodyweight → reps only
 */
const trackingSchema = new Schema(
  {
    weight: { type: Boolean, default: true },   // Show weight input?
    reps: { type: Boolean, default: true },     // Show reps input?
    rpe: { type: Boolean, default: false },     // Show RPE input?
    tempo: { type: Boolean, default: false },   // Show tempo tracking?
    distance: { type: Boolean, default: false },// Show distance tracking?
    time: { type: Boolean, default: false }     // Show time tracking?
  },
  { _id: false } // Prevents mongoose from creating an _id for this nested object
);

/**
 * DEFAULTS CONFIG
 * Suggested values used during routine building or workout mode
 */
const defaultsSchema = new Schema(
  {
    restSeconds: { type: Number, default: 120 },     // Default rest time between sets
    warmupSetsSuggested: { type: Number, default: 0 } // Suggested warmup sets
  },
  { _id: false }
);

/**
 * INCREMENT CONFIG
 * Used later for progressive overload suggestions and +/- UI buttons
 */
const incrementsSchema = new Schema(
  {
    weightStep: { type: Number, default: 2.5 },  // How much weight changes per increment
    repStep: { type: Number, default: 1 }        // How many reps change per increment
  },
  { _id: false }
);

/**
 * FLEXIBLE CONFIG OBJECT
 * Holds all adjustable behavior settings for the exercise
 * This is where customization power lives
 */
const configSchema = new Schema(
  {
    tracking: { type: trackingSchema, default: () => ({}) },
    defaults: { type: defaultsSchema, default: () => ({}) },
    increments: { type: incrementsSchema, default: () => ({}) },
    notesTemplate: { type: String, default: "" } // Pre-filled coaching notes
  },
  { _id: false }
);

/**
 * MAIN EXERCISE SCHEMA
 */
const exerciseSchema = new Schema(
  {
    /**
     * Who owns THIS copy of the exercise
     * Important for "clone and customize" system
     */
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    /**
     * If true → appears in global search
     * If false → private to owner
     */
    isPublic: {
      type: Boolean,
      default: false,
      index: true
    },

    /**
     * If exercise was cloned from another exercise,
     * this stores the original exercise ID
     */
    sourceExerciseId: {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
      default: null
    },

    /**
     * Convenience field for attribution display
     */
    sourceOwnerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    /**
     * Name shown in UI and search
     */
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    /**
     * Broad category used to determine behavior and filtering
     */
    type: {
      type: String,
      enum: ["strength", "bodyweight", "cardio", "intervals", "mobility"],
      required: true
    },

    /**
     * Searchable metadata
     * Used in filters and routine builder
     */
    equipment: {
      type: [String],
      default: []
    },

    primaryMuscles: {
      type: [String],
      default: []
    },

    secondaryMuscles: {
      type: [String],
      default: []
    },

    movementPattern: {
      type: String,
      default: null
    },

    tags: {
      type: [String],
      default: []
    },

    /**
     * Flexible configuration for workout behavior
     */
    config: {
      type: configSchema,
      default: () => ({})
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.model("Exercise", exerciseSchema);