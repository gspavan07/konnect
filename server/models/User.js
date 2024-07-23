import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    joinDate: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
