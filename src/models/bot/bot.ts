import { Telegraf, Context } from "telegraf";
import { remove, vote } from "./actions";
import {
  addPoll,
  chatId,
  hi,
  listPolls,
  start,
  remove as removeCommand,
} from "./commands";

const setCommands = (bot: Telegraf<Context>) => {
  bot
    .command("add", addPoll)
    .command("chatid", chatId)
    .command("hi", hi)
    .command("list", listPolls)
    .command("remove", removeCommand)
    .command("start", start)
    .action(/VOTE_[0-9]+/, vote)
    .action(/REMOVE_[A-Za-z0-9]+/, remove);
};

export const createBot = () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const bot = new Telegraf(botToken, {
    telegram: { webhookReply: false },
  });

  setCommands(bot);

  return bot;
};
