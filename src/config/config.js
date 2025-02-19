import dotenv from 'dotenv';

dotenv.config();

export default {
  BOT_TOKEN: process.env.BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN',
  PORT: process.env.PORT || 3000,
  MAIN_APPROVE_TG_ID: Number(process.env.MAIN_APPROVE_TG_ID),
  GROUP_ID: Number(process.env.GROUP_ID),
  GROUP_LINK: process.env.GROUP_LINK
};