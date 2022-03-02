import { Context } from "telegraf";
// eslint-disable-next-line import/no-unresolved
import { Message } from "telegraf/typings/core/types/typegram";

const removeQuotes = (input: string) => input.substring(1, input.length - 1);

export const addPoll = (ctx: Context & { message: Message.TextMessage }) => {
  const { text } = ctx.message;

  const tokens = text.match(/(?:[^\s"]+|"[^"]*")+/g);

  const description = removeQuotes(tokens[1]);

  const options = tokens
    .slice(2, tokens.length - 2)
    .map((option) => removeQuotes(option));

  const dayOfWeek = tokens[tokens.length - 2];
  const hour = tokens[tokens.length - 1];

  return ctx.reply(
    [
      "Added poll!",
      `Description: ${description}`,
      `Options:\n${options
        .map((option, index) => `${index + 1}. ${option}`)
        .join("\n")}`,
      `It will run every ${dayOfWeek} at ${hour}.`,
    ].join("\n\n")
  );
};
