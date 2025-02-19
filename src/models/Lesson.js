import mongoose from "mongoose";

// Определение схемы для хранения уроков пользователей
const lessonSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true },
  lesson: { type: String, required: true },
  startedAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  photoReceived: { type: Boolean, default: false },
  photoApproved: { type: Boolean, default: false },
  photoId: { type: String, default: null },
  failed: { type: Boolean, default: false }
});

export const Lesson = mongoose.model('Lesson', lessonSchema, 'anna_tg_lessons');