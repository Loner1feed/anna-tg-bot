import express from 'express';
import bot from './bot.js';
import { connectDB } from './db.js';

// Заглушка для HTTP-сервера (чтобы Heroku не выдавал ошибку R10)
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB().then(() => {
  bot.launch().then(() => console.log("🤖 Бот запущен!"))
})

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));