import { Telegraf, Context } from "telegraf";
import { hi } from "./commands/hi";

const setCommands = (bot: Telegraf<Context>) => {
  bot.command("hi", hi);
};

export const createBot = () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const bot = new Telegraf(botToken, {
    telegram: { webhookReply: false },
  });

  setCommands(bot);

  return bot;
};
