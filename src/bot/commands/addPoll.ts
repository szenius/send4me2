import { Context } from "telegraf";
// eslint-disable-next-line import/no-unresolved
import { Message } from "telegraf/typings/core/types/typegram";

const removeQuotes = (input: string) => input.substring(1, input.length - 1);

export const addPoll = (ctx: Context & { message: Message.TextMessage }) => {
  const { text } = ctx.message;

  const tokens = text.match(/(?:[^\s"]+|"[^"]*")+/g);

  if (tokens.length < 4) {
    return ctx.reply(
      "Invalid format.\n\nUsage: /addpoll <description of poll> <option 1> <option 2> ... <option N> <day of week> <hour>"
    );
  }

  const description = removeQuotes(tokens[1]);

  const options = tokens
    .slice(2, tokens.length - 2)
    .map((option) => removeQuotes(option));

  const dayOfWeek = tokens[tokens.length - 2];
  const hour = tokens[tokens.length - 1];

  return ctx.reply(
    [
      "Poll is scheduled ٩(^ᴗ^)۶",
      `Description:\n${description}`,
      `Options:\n${options
        .map((option, index) => `${index + 1}. ${option}`)
        .join("\n")}`,
      `The poll will be sent to this chat every ${dayOfWeek} at ${hour}.`,
    ].join("\n\n")
  );
};
