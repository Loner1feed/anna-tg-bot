import { sequences } from "../config/sequences.js";
import { nextStepKeyboard } from "../keyboards/inline.js";
import { User } from "../models/User.js";
import { sendMessage } from "./sendMessage.js";

export const startSequence = async (ctx, sequenceName) => {
  if (!sequences[sequenceName]) {
    return ctx.reply('❌ Такой последовательности не существует.');
  }

  const userId = ctx?.update?.callback_query?.from?.id || ctx.from.id;

  await User.findOneAndUpdate(
    { telegramId: userId },
    {
      $set: {
        seqStep: 0,
        seqName: sequenceName
      }
    },
    { upsert: true } // если пользователя нет в базе, создаем запись
  );

  console.log(`☑️ Последовательность ${sequenceName} начата для telegramId: ${userId}`);

  await ctx.answerCbQuery('Отправляем...');
  await nextStep(ctx);
}

export const nextStep = async (ctx) => {
  const userId = ctx.from.id;

  // Получаем текущую последовательность и шаг из базы данных
  const user = await User.findOne({ telegramId: userId });
  if (!user) {
    return await ctx.reply('Произошла ошибка, пользователь не найден.');
  }

  const { seqName, seqStep } = user;
  const currentSequence = sequences[seqName].body;
  const endMessage = sequences[seqName].endMessage;

  // Проверка на наличие шага в текущей последовательности
  if (seqStep < currentSequence.length) {
    const stepMessages = currentSequence[seqStep].messageArr;
    const { nextStepText, nextStepBtnText } = currentSequence[seqStep];
    // отправляем сообщения...
    for (const message of stepMessages) {
      await sendMessage(ctx, message);
    }

    // Обновляем шаг в базе данных
    await User.findOneAndUpdate(
      { telegramId: userId },
      { $set: { seqStep: seqStep + 1 } }
    );

    // Добавляем кнопку для перехода к следующему шагу
    if (seqStep + 1 < currentSequence.length && nextStepText && nextStepBtnText) {
      await ctx.reply(nextStepText, {
        reply_markup: {
          inline_keyboard: nextStepKeyboard(nextStepBtnText)
        },
      });
    } else {
      if (endMessage) await ctx.reply(...endMessage);
      // Сбросим шаг для следующей последовательности
      await User.findOneAndUpdate(
        { telegramId: userId },
        { $set: { seqStep: 0, seqName: "" } }
      );
    }
  }
}