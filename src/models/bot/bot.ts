import { Telegraf, Context } from "telegraf";
import { vote } from "./actions/vote";
import { addPoll, chatId, hi, listPolls, start } from "./commands";

const setCommands = (bot: Telegraf<Context>) => {
  bot
    .command("add", addPoll)
    .command("addpoll", addPoll)
    .command("chatid", chatId)
    .command("hi", hi)
    .command("list", listPolls)
    .command("listpolls", listPolls)
    .command("start", start)
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
