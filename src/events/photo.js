import bot from "../bot.js";
import { approveDeclineKeyboard } from "../keyboards/inline.js";
import { Lesson } from "../models/Lesson.js";

export default async (ctx) => {
  const telegramId = ctx.from.id;
  const lesson = await Lesson.findOne({ telegramId, lesson: 'lesson1' });

  if (lesson && !lesson.photoReceived) {
    const photoId = ctx.message.photo.pop().file_id;

    await Lesson.findOneAndUpdate(
      { telegramId, lesson: 'lesson1' },
      { $set: { photoReceived: true, photoId, photoApproved: false } }
    );


    // Отправляем фото администратору для проверки
    await bot.telegram.sendPhoto(process.env.MAIN_APPROVE_TG_ID, photoId, {
      caption: `📸 Новое фото от пользователя ${telegramId}\n\nУтвердить или отклонить?`,
      reply_markup: {
        inline_keyboard: approveDeclineKeyboard(telegramId)
      }
    });

    await ctx.reply("Фото получено!");
  } else {
    await ctx.reply("Вы уже отправили фото для проверки. Пожалуйста, дождитесь моего ответа.");
  }
}