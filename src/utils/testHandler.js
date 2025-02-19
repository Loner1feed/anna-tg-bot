import config from "../config/config.js";
import { meetExperts } from "../config/messages.js";
import { testQuestions, resultText } from "../config/testConfig.js";
import { getCourseInfoKeyboard, startLessonKeyboard } from "../keyboards/inline.js";
import { User } from "../models/User.js";
import { sendAdvert } from "./sendAdvert.js";

export async function completedBefore(ctx) {
  const telegramId = ctx.from.id;
  const { testCompleted, testResult } = await User.findOne({ telegramId });

  if (testCompleted) {
    await ctx.editMessageText(`🎂 Тест <b>"Какой ты кондитер?"</b>\n\nВы уже проходили этот тест.\nРезультат:\n\n🍰 ${resultText[testResult]}`, { parse_mode: "HTML" });

    // ЗНАКОМИМ С ЭКСПЕРТАМИ
    await ctx.reply(meetExperts, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: getCourseInfoKeyboard }
    });

    // TEMPORATY: Отправляем кнопку для начала урока
    // await ctx.reply("Начните урок!", { reply_markup: { inline_keyboard: startLessonKeyboard } })
  } else {
    await sendTestQuestion(ctx, 0, { A: 0, B: 0, C: 0 });
  }
}

async function sendTestResult(ctx, answers) {

  const telegramId = ctx.from.id;
  const user = ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name;

  const result = Object.entries(answers).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

  // Записываем результат в БД
  await User.findOneAndUpdate({ telegramId }, { testCompleted: true, testResult: result });

  // Отправляем результат пользователю
  await ctx.editMessageText(`🎂 Тест <b>"Какой ты кондитер?"</b>\n\nТест завершен! Ваш результат:\n\n🍰 ${resultText[result]}`, { parse_mode: "HTML" });

  // Отправляем результат в беседу
  const message = `✅ Пользователь ${user} прошёл тест "Какой ты кондитер?"\n\n📊 Результат: ${resultText[result].split(".")[0]}!`;
  await ctx.telegram.sendMessage(config.GROUP_ID, decodeURIComponent(encodeURIComponent(message)));

  // ЗНАКОМИМ С ЭКСПЕРТАМИ
  await ctx.reply(meetExperts, {
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: getCourseInfoKeyboard }
  });

}

export async function sendTestQuestion(ctx, index, answers) {
  if (index >= testQuestions.length) {
    return sendTestResult(ctx, answers);
  }

  const questionData = testQuestions[index];

  await ctx.editMessageText(
    `🎂 Тест <b>"Какой ты кондитер?"</b>\n\nВопрос ${index + 1} из ${testQuestions.length}:\n${questionData.question}\n\nВарианты ответа:\n${questionData.options[0]}${questionData.options[1]}${questionData.options[2]}`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          ["A", "B", "C"].map((option, i) => ({
            text: option,
            callback_data: `answer_${["A", "B", "C"][i]}_${index}_${answers.A}_${answers.B}_${answers.C}`,
          })),
        ]
      },
    });
}