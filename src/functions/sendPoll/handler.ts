import { Keyboard } from "telegram-keyboard";
import { createBot } from "../../bot/bot";
import { INDEXES } from "../../resources/dynamodb";
import { query } from "../../services/dynamodb";
import { Event } from "../../types";
import { middyfy } from "../../utils/lambda";

const DAY_OF_WEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const createPoll = (description: string, options: string[]) => {
  const message = [
    description,
    ...options.map((option) => `*${option} \\- 0*`),
    "👥 *0* responses",
  ].join("\n\n");
  const keyboard = Keyboard.make(options.map((option) => [option]));
  return { message, inlineKeyboard: keyboard.inline() };
};

const sendPoll = async () => {
  const bot = createBot();

  const today = new Date();
  const dayOfWeekToday = DAY_OF_WEEK_LIST[today.getUTCDay()];

  const { Items: events } = await query({
    IndexName: INDEXES.DAY_OF_WEEK,
    TableName: process.env.TABLE_NAME_EVENT,
    KeyConditionExpression: "dayOfWeek = :dayOfWeek",
    ExpressionAttributeValues: {
      ":dayOfWeek": dayOfWeekToday,
    },
  });

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(events));

  const sendMessageDeferred = events.map(
    ({ description, options, chatId }: Event) => {
      const { message, inlineKeyboard } = createPoll(description, options);

      // eslint-disable-next-line no-console
      console.log(JSON.stringify(message));

      return bot.telegram.sendMessage(chatId, message, {
        ...inlineKeyboard,
        parse_mode: "MarkdownV2",
      });
    }
  );
  const results = await Promise.allSettled(sendMessageDeferred);

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(results));
};

export const main = middyfy(sendPoll);
