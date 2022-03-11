import ksuid from "ksuid";
import { Context } from "telegraf";
// eslint-disable-next-line import/no-unresolved
import { Message } from "telegraf/typings/core/types/typegram";
import { put } from "../../../services/dynamodb";
import { Event } from "../../../types";

const removeQuotes = (input: string) => input.substring(1, input.length - 1);

export const add = async (ctx: Context & { message: Message.TextMessage }) => {
  const { text, chat, from } = ctx.message;

  const tokens = text.match(/(?:[^\s"]+|"[^"]*")+/g);

  if (tokens.length < 4) {
    return ctx.reply(
      [
        "Invalid format.",
        "Usage: `/add <description of poll> <option 1> <option 2> ... <option N> <day of week>`",
        'Example: `/add "What does everyone want to eat this week?" "Pizza" "Fried chicken" "Sushi" mon`',
      ].join("\n\n"),
      { parse_mode: "Markdown" }
    );
  }

  const description = removeQuotes(tokens[1]);

  const options = tokens
    .slice(2, tokens.length - 1)
    .map((option) => removeQuotes(option));

  const dayOfWeek = tokens[
    tokens.length - 1
  ].toUpperCase() as Event["dayOfWeek"];

  if (!["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].includes(dayOfWeek)) {
    return ctx.reply(
      [
        "Invalid day of week. Accepted: `MON`. `TUE`, `WED`, `THU`, `FRI`, `SAT`, `SUN`.",
        "Usage: `/add <description of poll> <option 1> <option 2> ... <option N> <day of week>`",
        'Example: `/add "What does everyone want to eat this week?" "Pizza" "Fried chicken" "Sushi" mon`',
      ].join("\n\n"),
      { parse_mode: "Markdown" }
    );
  }

  const now = new Date();
  const nowEpochTime = now.getTime();

  const event: Event = {
    eventId: ksuid.randomSync(nowEpochTime).string,
    created: nowEpochTime,
    chatId: chat.id,
    creator: from,
    description,
    options,
    dayOfWeek,
  };

  await put({
    TableName: process.env.TABLE_NAME_EVENT,
    Item: event,
  });

  return ctx.reply(
    [
      "Poll is scheduled ٩(^ᴗ^)۶",
      `Description:\n${description}`,
      `Options:\n${options
        .map((option, index) => `${index + 1}. ${option}`)
        .join("\n")}`,
      `The poll will be sent to this chat every ${dayOfWeek} at 00:00 UTC.`,
    ].join("\n\n")
  );
};
