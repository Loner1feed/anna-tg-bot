export const filterGroupMessages = async (ctx, next) => {
  if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
    // Разрешаем только команды
    if (!ctx.message?.text?.startsWith('/')) {
      return; // Игнорируем сообщения, не являющиеся командами
    }
  }
  await next();
}