import { Telegraf, Context } from "telegraf";
import { addPoll } from "./commands/addPoll";
import { chatId } from "./commands/chatId";
import { hi } from "./commands/hi";

const setCommands = (bot: Telegraf<Context>) => {
  bot.command("hi", hi).command("chatid", chatId).command("addpoll", addPoll);
};

export const createBot = () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const bot = new Telegraf(botToken, {
    telegram: { webhookReply: false },
  });

  setCommands(bot);

  return bot;
};
