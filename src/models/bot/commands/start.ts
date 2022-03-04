import { Context } from "telegraf";

export const start = (ctx: Context) =>
  ctx.reply(
    [
      "To add a poll:",
      "/addpoll <description of poll> <option 1> <option 2> ... <option N> <day of week>",
      `e.g. /addpoll "What does everyone want to eat this week?" "Pizza" "Fried chicken" "Sushi" mon`,
    ].join("\n\n")
  );
