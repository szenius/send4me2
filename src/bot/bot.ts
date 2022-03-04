import { Telegraf, Context } from "telegraf";
import { vote } from "./actions/vote";
import { addPoll } from "./commands/addPoll";
import { chatId } from "./commands/chatId";
import { hi } from "./commands/hi";

const setCommands = (bot: Telegraf<Context>) => {
  bot
    .command("addpoll", addPoll)
    .command("chatid", chatId)
    .command("hi", hi)
    .action(/VOTE_[0-9]+/, vote);
};

export const createBot = () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const bot = new Telegraf(botToken, {
    telegram: { webhookReply: false },
  });

  setCommands(bot);

  return bot;
};
