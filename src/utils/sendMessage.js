export async function sendMessage(ctx, message) {
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
}