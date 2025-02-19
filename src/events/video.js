export const requiredRole = "admin";

export default async (ctx) => {
  if (ctx.message.video) {
    console.log(`📌 File ID: ${ctx.message.video.file_id}`);
    await ctx.reply(`📌 Ваш file_id: <code>${ctx.message.video.file_id}</code>`, { parse_mode: "HTML" });
  }
};