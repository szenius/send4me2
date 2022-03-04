import { Context } from "telegraf";

export const start = (ctx: Context) =>
  ctx.reply(
    [
      "To add a poll:",
      "/add <description of poll> <option 1> <option 2> ... <option N> <day of week>",
      `e.g. /add "What does everyone want to eat this week?" "Pizza" "Fried chicken" "Sushi" mon`,
    ].join("\n\n")
  );
