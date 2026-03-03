import mongoose from "mongoose";

const { Schema } = mongoose;

const bodyweightEntrySchema = new Schema(
  {
    date: { type: String, required: true }, // ISO string like "2026-02-18"
    weight: { type: Number, min: 0, required: true }
  },
  { _id: false }
);

const profileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ensures 1:1 relationship
      index: true
    },

    displayName: { type: String, required: true, trim: true },
    avatarUrl: { type: String, default: "" },
    bio: { type: String, default: "" },

    settings: {
      units: {
        type: String,
        enum: ["lbs", "kg"],
        default: "lbs"
      },
      defaultRestSeconds: {
        type: Number,
        min: 0,
        default: 120
      },
      privateMode: {
        type: Boolean,
        default: false
      }
    },

    stats: {
      bodyweightHistory: {
        type: [bodyweightEntrySchema],
        default: []
      },

      prs: {
        benchPress: { type: Number, min: 0, default: null },
        squat: { type: Number, min: 0, default: null },
        deadlift: { type: Number, min: 0, default: null }
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);