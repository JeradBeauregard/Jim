import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  roles: [{ type: String }],
}, {
  timestamps: true  // auto adds createdAt & updatedAt
});

const User = mongoose.model("User", userSchema);

export default User;