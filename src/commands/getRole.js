import { getRole } from '../roles.js';

export const getRoleCommand = async (ctx) => {
  const userId = ctx.from.id;
  const role = await getRole(userId);
  ctx.reply(`Ваша текущая роль: ${role}`);
};