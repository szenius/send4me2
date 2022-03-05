import { Context } from "telegraf";

export const start = (ctx: Context) => {
  const commands = [
    "/add - Add a recurring poll.",
    "/list - List active recurring polls in this chat.",
    "/remove - Choose an active recurring poll to remove.",
  ];
  return ctx.reply(commands.join("\n"));
};
