import mongoose from "mongoose";
import { User } from "./models/User.js";

// Установка роли
export const setRole = async (userId, role) => {
  const user = await User.findOneAndUpdate(
    { userId },
    { role },
    { new: true, upsert: true }
  );
  return user;
};

// Получение роли
export const getRole = async (userId) => {
  const user = await User.findOne({ userId });
  return user ? user.role : 'guest';
};

// Проверка роли
export const checkRole = async (userId, requiredRole) => {
  const roleHierarchy = ['guest', 'student', 'admin'];
  const userRole = await getRole(userId);
  return roleHierarchy.indexOf(userRole) >= roleHierarchy.indexOf(requiredRole);
};

// Хранилище ролей (временное, для тестов)
const roles = {
  442783847: "admin"
};

// Установка роли для пользователя
// export const setRole = (userId, role) => {
//   roles[userId] = role;
// };

// // Получение роли пользователя
// export const getRole = (userId) => {
//   return roles[userId] || 'guest'; // По умолчанию — "гость"
// };

// // Проверка роли пользователя
// export const checkRole = (userId, requiredRole) => {
//   const roleHierarchy = ['guest', 'student', 'admin']; // Иерархия ролей
//   const userRole = getRole(userId);
//   return roleHierarchy.indexOf(userRole) >= roleHierarchy.indexOf(requiredRole);
// };