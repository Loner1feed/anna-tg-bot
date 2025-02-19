import { User } from "../models/User.js";

export const requireRole = (role) => {
  return async (ctx, next) => {
    const userId = ctx.from.id;
    const user = await User.findOne({ telegramId: userId });

    if (!user) {
      await User.create({ telegramId: userId, role: 'guest' });
      // ctx.reply('Вы зарегистрированы как гость.');
      return;
    }

    if (user.role === role || user.role === 'admin') {
      return next();
    } else {
      ctx.reply('❌ У вас недостаточно прав для выполнения этой команды.');
    }
  };
};