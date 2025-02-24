export async function sendMessage(ctx, message) {
  try {
    if (typeof message === 'string') {
      await ctx.reply(message);
    } else if (message.type === 'video_note') {
      await ctx.replyWithVideoNote(message.file_id);
    } else if (message.type === 'video') {
      await ctx.replyWithVideo(message.file_id);
    } else if (message.type === 'photo') {
      await ctx.replyWithPhoto(message.file_id);
    } else if (message.type === 'voice') {
      await ctx.replyWithVoice(message.file_id);
    } else {
      await ctx.reply(message.text, { parse_mode: message.parse_mode });
    }
  } catch (error) {
    if (error.response && error.response.error_code === 400) {
      // Обработка ошибки, если пользователь не может получать видеосообщения
      await ctx.reply("🚫 Тут должно было быть видеосообщение, но оно не может быть доставлено. Проверьте настройки Telegram")
    } else {
      // Обработка других ошибок
      console.error('Произошла ошибка при отправке сообщения:', error);
    }
  }
}