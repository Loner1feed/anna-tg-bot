import bot from "../bot.js";
import config from "../config/config.js";
import { Lesson } from "../models/Lesson.js";

export default async (ctx) => {


  const approverId = config.MAIN_APPROVE_TG_ID;

  if (ctx.from.id !== approverId) return ctx.answerCbQuery('У вас нет прав для проведения этой операции.');

  const telegramId = Number(ctx.match[1]);

  // Отклоняем фото
  await Lesson.findOneAndUpdate(
    { telegramId, lesson: 'lesson1' },
    { $set: { photoReceived: false, photoId: null } }
  );

  console.log(`Фото отклонено: ${telegramId}`);
  // отправляем пользователю уведомление и ждем от него новое фото
  await bot.telegram.sendMessage(telegramId, '❌ Ваше фото отклонено. Отправьте новое.');
  return await ctx.editMessageCaption(`❌ Фото ползователя ${telegramId} отклонено.`, { reply_markup: {} });
}