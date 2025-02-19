export const requiredRole = "admin";

export default async (ctx) => {
  if (ctx.message.video_note) {
    console.log(`📌 File ID: ${ctx.message.video_note.file_id}`);
    await ctx.reply(`📌 Ваш file_id: <code>${ctx.message.video_note.file_id}</code>`, { parse_mode: "HTML" });
  }
};