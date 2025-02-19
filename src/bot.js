import cron from "node-cron";
import { Telegraf } from 'telegraf';
import config from './config/config.js';
import fs from "fs";
import path from "path";
import { requireRole } from './middlewares/checkRole.js';
import approve from "./actions/approve.js";
import reject from "./actions/reject.js";
import handleTestQuestion from "./actions/handleTestQuestion.js";
import { Lesson } from './models/Lesson.js';
import { lessonNotCompleted } from "./config/messages.js";

const bot = new Telegraf(config.BOT_TOKEN);

// Динамическая загрузка обработчиков комманд
const commandsPath = path.resolve("./src/commands");
fs.readdirSync(commandsPath).forEach(async (file) => {
  const commandName = path.parse(file).name;
  const commandModule = await import(`./commands/${file}`);
  // Проверяем, указана ли роль в обработчике
  if (commandModule.requiredRole) {
    bot.command(commandName, requireRole(commandModule.requiredRole), commandModule[`${commandName}Command`]);
  } else {
    bot.command(commandName, commandModule[`${commandName}Command`]);
  }
});

// Динамическая загрузка обработчиков событий
const eventsPath = path.resolve("./src/events");
fs.readdirSync(eventsPath).forEach(async (file) => {
  const eventName = path.parse(file).name;
  const eventModule = await import(`./events/${file}`);
  if (eventModule.requiredRole) {
    bot.on(eventName, requireRole(eventModule.requiredRole), eventModule.default);
  } else {
    bot.on(eventName, eventModule.default);
  }
  console.log(`✅ Подключен обработчик события: ${eventName}`);
});

// Остальные обработчики

// **Обработчик утверждения фото админом
bot.action(/^approve_(\d+)$/, approve);
// **Обработчик отклонения фото админом
bot.action(/^reject_(\d+)$/, reject);
// **Обработчик ответов на вопросы теста
bot.action(/^answer_[A-C]_\d+_\d+_\d+_\d+$/, handleTestQuestion);

// Задача для проверки уроков пользователя
// cron.schedule("0 12 * * *", async () => {
//   const now = new Date();
//   // ищем незавершенные уроки
//   const lessons = await Lesson.find({ completed: false, failed: false });

//   for (const lesson of lessons) {
//     const timePassed = now - lesson.startedAt;
//     const timeLeft = 3 * 24 * 60 * 60 * 1000 - timePassed;
//     const telegramId = lesson.telegramId;

//     if (timeLeft > 0) {
//       const hoursLeft = Math.ceil(timeLeft / (1000 * 60 * 60));
//       let message;
//       if (hoursLeft <= 24) {
//         message = `⚠️ Остался 1 день для отправки фото! Не забудьте загрузить его.`;
//       } else {
//         message = `⏳ У вас осталось ${Math.ceil(hoursLeft / 24)} дня(ей) для отправки фото.`;
//       }

//       try {
//         await bot.telegram.sendMessage(telegramId, message);
//       } catch (err) {
//         console.error(`Ошибка отправки уведомления пользователю ${telegramId}:`, err);
//       }
//     } else {
//       console.log(`Дедлайн истёк для пользователя ${telegramId}. Запуск финального действия...`);

//       // Здесь добавь код, который выполняется по истечении 3 дней

//       await bot.telegram.sendMessage(lessonNotCompleted);

//       await Lesson.findOneAndUpdate({ telegramId, lesson: "lesson1" }, { photoReceived: false, photoApproved: false, photoId: "", failed: true });
//     }
//   }
// })

export default bot; 
