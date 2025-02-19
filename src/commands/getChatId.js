export const requiredRole = "admin";

export const getChatIdCommand = async (ctx) => {
  console.log("Chat ID:", ctx.chat.id);
}