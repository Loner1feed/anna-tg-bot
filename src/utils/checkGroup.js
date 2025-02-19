import config from "../config/config.js";
import { startGreeting } from "../keyboards/inline.js";

export const checkGroup = async (ctx) => {
  const telegramId = ctx.from.id;
  const groupId = config.GROUP_ID;

  // Получаем информацию о пользователе в группе
  const chatMember = await ctx.telegram.getChatMember(groupId, telegramId);
  const status = chatMember.status;

  if (["member", "administrator", "creator"].includes(status)) {
    // Пользователь в группе — редактируем сообщение
    await ctx.editMessageText(`Добро пожаловать!`,
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: startGreeting
        }
      },

    );
  } else {
    // Пользователь не в группе — показываем предупреждение
    await ctx.answerCbQuery("🚫 Вы не состоите в группе. Пожалуйста, вступите!", { show_alert: true });
  }
}