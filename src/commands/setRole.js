import { setRole, checkRole } from '../roles.js';

export const requiredRole = "admin";

export const setRoleCommand = async (ctx) => {
  const [_, userId, role] = ctx.message.text.split(' '); // Формат: /setrole <userId> <role>

  if (!userId || !role) {
    return ctx.reply('Неправильный формат команды. Используйте: /setrole <userId> <role>');
  }

  setRole(Number(userId), role);
  ctx.reply(`✅ Роль пользователя обновлена: ${user.role}`);
};