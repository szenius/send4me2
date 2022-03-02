import { Telegraf, Context } from "telegraf";

export const createBot = () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const bot = new Telegraf(botToken, {
    telegram: { webhookReply: false },
  });

  bot.command("hi", (ctx: Context) =>
    ctx.reply(`Hi ${ctx.message.from.first_name}!`)
  );

  return bot;
};
