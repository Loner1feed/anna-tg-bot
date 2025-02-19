import { lessonNotCompleted, lessons } from "../config/messages.js";
import { photos } from "../config/photos.js";
import { videos } from "../config/videos.js";
import { getRedwardKeyboard, showPsychoLessonsKeyboard } from "../keyboards/inline.js";
import { Lesson } from "../models/Lesson.js";

export const startLesson = async (ctx) => {
  const telegramId = ctx.from.id;

  // Проверяем, не начал ли пользователь уже урок
  const existingLesson = await Lesson.findOne({ telegramId, lesson: 'lesson1' });

  if (existingLesson) {
    // Урок уже начат и фото отправлено - ✅
    if (existingLesson.photoReceived && !existingLesson.completed) {
      await ctx.reply("Вы уже начали урок и отправили фото для проверки. Пожалуйста, дождитесь моего ответа.");
      return ctx.answerCbQuery('Вы уже начали этот урок!');
    }
    // Урок успешно завершен пользователем - ✅
    else if (existingLesson.completed) {
      await ctx.answerCbQuery();
      return await ctx.reply("Вы уже успешно завершили урок. Нажмите кнопку ниже, чтобы получить свой подарок.", {
        reply_markup: {
          inline_keyboard: getRedwardKeyboard
        }
      })
    }
    // Урок провален пользователем - ✅
    else if (existingLesson.failed) {
      await ctx.answerCbQuery();
      return ctx.reply(
        "🚫 Вы уже пытались пройти урок. Фото изделия не было отправлено в срок или не было одобрено.\n\nНо не стоит расстраиваться!\nПройдите уроки от психолога, которые вам пригодятся в достижении ваших целей и мечт 🌺",
        { reply_markup: { inline_keyboard: showPsychoLessonsKeyboard } })
    }
    // Урок уже начат. Прислать пользователю материалы курса и уведомить сколько дней осталось до выполнения. - ✅
    else {
      // Считаем сколько времени осталось у пользователя, если урок уже начат
      const now = new Date();
      const timePassed = now - existingLesson.startedAt;
      const timeLeft = 3 * 24 * 60 * 60 * 1000 - timePassed;

      if (timeLeft > 0) {
        const hoursLeft = Math.ceil(timeLeft / (1000 * 60 * 60));

        let timeLeftMessage;
        if (hoursLeft <= 24) {
          timeLeftMessage = `⚠️ Остался 1 день для отправки фото! Не забудьте загрузить его.`;
        } else {
          timeLeftMessage = `⏳ У вас осталось ${Math.ceil(hoursLeft / 24)} дня(ей) для отправки фото.`;
        }

        // временно отправляем видео и материалы курса отсюда
        await ctx.reply("Ниже вы можете увидеть видео, объясняющее приготовление изделия по шагам.\nТак же, на фото ниже, вы можете найти все нужные ингредиенты и грамовки.\nВремя приготовления - 30 минут.")
        await ctx.replyWithVideo(videos.testLessonVideo);
        await ctx.replyWithPhoto(photos.testLessonTechSheet);
        await ctx.reply("Пришлите фото сюда 🔗")
        await ctx.answerCbQuery();
        return ctx.reply(`Вы уже начали этот урок ранее!\n\n${timeLeftMessage}`);
      } else {
        // ДЕЙСТВИЯ ПРИ НЕУСПЕШНОМ ЗАВЕРШЕНИИ УРОКА
        await Lesson.findOneAndUpdate({ telegramId, lesson: "lesson1" }, { photoReceived: false, photoApproved: false, photoId: "", failed: true });

        await ctx.answerCbQuery();
        return ctx.reply(lessonNotCompleted);

      }
    }
  } else {
    console.log(`Урок начат пользователем ${telegramId}`);
    // Сохраняем информацию о начале урока
    await Lesson.create({ telegramId, lesson: 'lesson1' });

    // временно отправляем видео и материалы курса отсюда
    await ctx.reply("Ниже вы можете увидеть видео, объясняющее приготовление изделия по шагам.\nТак же, на фото ниже, вы можете найти все нужные ингредиенты и грамовки.\nВремя приготовления - 30 минут.")
    await ctx.replyWithVideo(videos.testLessonVideo);
    await ctx.replyWithPhoto(photos.testLessonTechSheet);
    await ctx.reply("Пришлите фото сюда 🔗")
    await ctx.answerCbQuery();
  }
}