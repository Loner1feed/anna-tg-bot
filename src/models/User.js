import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  role: { type: String, enum: ['guest', 'student', 'admin'], default: 'guest' },
  seqName: { type: String, default: "" },
  seqStep: { type: Number, default: 0 },
  testCompleted: { type: Boolean, default: false },
  testResult: { type: String, default: "" }
});

export const User = mongoose.model('User', userSchema, 'anna_tg_users');