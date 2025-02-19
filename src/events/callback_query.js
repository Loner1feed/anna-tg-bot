import { callbacks } from "../config/callbacks.js";
import { photos } from "../config/photos.js";
import { videos } from "../config/videos.js";
import { showPsychoLessonsKeyboard } from "../keyboards/inline.js";
import { checkGroup } from "../utils/checkGroup.js";
import { sendAdvert } from "../utils/sendAdvert.js";
import { nextStep, startSequence } from "../utils/sequenceHandler.js";
import { startLesson } from "../utils/startLesson.js";
import { completedBefore, sendTestQuestion } from "../utils/testHandler.js";

export default async (ctx) => {
  const data = ctx.callbackQuery.data;

  switch (data) {
    // prod
    case callbacks.check_group:
      checkGroup(ctx);
      break;

    case callbacks.get_greeting:
      await ctx.answerCbQuery("");
      await startSequence(ctx, "greeting")
      break;

    case callbacks.get_course_info:
      await startSequence(ctx, "course_info");
      break;

    case callbacks.next_step:
      await ctx.answerCbQuery('Отправляем...');
      await nextStep(ctx);
      break;

    case callbacks.start_test:
      await completedBefore(ctx);
      break;

    case callbacks.start_lesson:
      await startLesson(ctx);
      break;

    case callbacks.receive_gift:
      await ctx.answerCbQuery('Отправляем...');
      await ctx.reply("Поздравляю, вы успешно выполнили пробный урок! Как и обещала, высылаю вам свой авторский рецепт:");
      await ctx.replyWithVideo(videos.giftLessonVideo);
      await ctx.replyWithMediaGroup([
        { type: "photo", media: photos.redwardLessonTechSheet1, caption: "Примечание: для начинки можно использовать любые ягоды." },
        { type: "photo", media: photos.redwardLessonTechSheet2 },
      ]);

      await ctx.reply(`Предлагаю вам посмотреть короткое видео про наш основной курс "Универсальный кондитер."`);
      await ctx.replyWithVideo(videos.overallCourseInfo);

      await ctx.reply("Пройдите уроки от психолога, которые вам пригодятся в достижении ваших целей и мечт 🌺", {
        reply_markup: { inline_keyboard: showPsychoLessonsKeyboard }
      })
      break;

    case callbacks.get_psycho_lessons:
      await startSequence(ctx, "psycho_lessons");
      break;

    // test and etc.
    case callbacks.start_sequence:
      await startSequence(ctx, "test");
      break;

    default:
      break;
  }
}