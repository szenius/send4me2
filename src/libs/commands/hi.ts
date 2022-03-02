import { Context } from "telegraf";

export const hi = (ctx: Context) =>
  ctx.reply(`Hi ${ctx.message.from.first_name}!`);
