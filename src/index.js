import bot from './bot.js';
import { connectDB } from './db.js';

connectDB().then(() => {
  bot.launch().then(() => console.log("🤖 Бот запущен!"))
})

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));