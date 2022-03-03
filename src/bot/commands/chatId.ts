import { Context } from "telegraf";

export const chatId = (ctx: Context) =>
  ctx.reply(`The chat id is: ${ctx.message.chat.id}`);
