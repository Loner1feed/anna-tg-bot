import config from "../config/config.js";
import { checkIsInGroup, startCommandKeyboard } from "../keyboards/inline.js";
import { startSequence } from "../utils/sequenceHandler.js";

export const startCommand = async (ctx) => {

  const botInfo = await ctx.telegram.getMe();
  const botName = botInfo.first_name;

  ctx.reply(
    // `Привет! Чтобы продолжить взаимодействие с ботом, надо вступить в нашу беседу, нажав на кнопку "Вступить". Если вступили, нажмите на кнопку "Проверить"\n\n<b>Статус:</b> 🚫`,
    // `Привет! Для того, чтобы начать предобучение, вам нужно вступить в нашу группу "Болтанка".\n\n (Нажмите на кнопку "Вступить", вступите в беседу, вернитесь в переписку с ботом и нажмите на кнопку "Проверить")`,
    `<b>Привет! Чтобы начать предобучение, нужно сделать 2 простых шага:</b>\n\n<b>🔗 1. Вступите в нашу группу "Болтанка".</b>\n<i>Нажмите на кнопку "Вступить" и вступите в группу.</i>\n\n<b>🤖 2. Вернитесь сюда (${botName}) и нажмите "Проверить".</b>\n<i>Бот проверит ваше участие и запустит обучение!</i>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: checkIsInGroup
      }
    }
  );
};