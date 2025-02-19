import bot from "../bot.js";
import config from "../config/config.js";
import { getRedwardKeyboard } from "../keyboards/inline.js";
import { Lesson } from "../models/Lesson.js";
import { getUsernameById } from "../utils/getUserNameById.js";

export default async (ctx) => {
  const approverId = config.MAIN_APPROVE_TG_ID;
  if (ctx.from.id !== approverId) return ctx.answerCbQuery('У вас нет прав для проведения этой операции.');

  const telegramId = Number(ctx.match[1]);
  const username = await getUsernameById(ctx, telegramId);

  console.log(`Фото утверждено: ${telegramId}`);

  // Получение айди фото
  const { photoId } = await Lesson.findOne({ telegramId, lesson: "lesson1" });

  // Утверждаем фото
  await Lesson.findOneAndUpdate(
    { telegramId, lesson: 'lesson1' },
    { $set: { photoApproved: true, completed: true } }
  );

  // Пересылаем фото в беседу
  const message = `📸 Новое изделие от пользователя ${username}!\nПоздравляю с выполненным уроком!`;
  await ctx.telegram.sendPhoto(config.GROUP_ID, photoId, {
    caption: decodeURIComponent(encodeURIComponent(message)),
    parse_mode: "HTML"
  })

  // Отсылаем пользователю уведомление о подтверждении
  await bot.telegram.sendMessage(
    telegramId,
    '✅ Ваше фото утверждено! Урок выполнен.',
    { reply_markup: { inline_keyboard: getRedwardKeyboard } });
  return ctx.editMessageCaption('✅ Фото утверждено.', { reply_markup: {} });
}