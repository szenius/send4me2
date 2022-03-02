import { Telegraf, Context } from "telegraf";
import { chatId } from "./commands/chatId";
import { hi } from "./commands/hi";

const setCommands = (bot: Telegraf<Context>) => {
  bot.command("hi", hi).command("chat-id", chatId);
};

export const createBot = () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const bot = new Telegraf(botToken, {
    telegram: { webhookReply: false },
  });

  setCommands(bot);

  return bot;
};
