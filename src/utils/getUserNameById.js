export async function getUsernameById(ctx, userId) {
  try {
    const user = await ctx.telegram.getChat(userId);
    return user.username ? `@${user.username}` : user.first_name;
  } catch (error) {
    console.error("Ошибка получения username:", error);
    return "Не удалось получить username";
  }
}