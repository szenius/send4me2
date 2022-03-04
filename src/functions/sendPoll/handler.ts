import { Keyboard } from "telegram-keyboard";
import { createBot } from "../../bot/bot";
import { INDEXES } from "../../resources/dynamodb";
import { query } from "../../services/dynamodb";
import { Event, Option } from "../../types";
import { middyfy } from "../../utils/lambda";

const DAY_OF_WEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const createPoll = (
  description: Event["description"],
  options: Event["options"] | string[] // TODO: remove string[] hack
) => {
  /** TODO: remove this hack */
  let updatedOptions = options;
  if (typeof options[0] === "string") {
    updatedOptions = options.map((optionDescription) => ({
      label: optionDescription,
      voters: [],
    }));
  }
  updatedOptions = updatedOptions as Event["options"];
  /** End hack */

  const optionsDisplay = updatedOptions.map(({ label, voters }) =>
    [
      `*${label} \\- ${voters.length}*`,
      ...voters.map((voter) => voter.firstName),
    ].join("\n")
  );
  const numResponses = updatedOptions.reduce(
    (sum: number, { voters }: Option) => sum + voters.length,
    0
  );
  const message = [
    description,
    ...optionsDisplay,
    `👥 *${numResponses}* responses`,
  ].join("\n\n");

  const keyboard = Keyboard.make(updatedOptions.map(({ label }) => [label]));

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

  const sendMessageDeferred = events.map(
    ({ description, options, chatId }: Event) => {
      const { message, inlineKeyboard } = createPoll(description, options);

      return bot.telegram.sendMessage(chatId, message, {
        ...inlineKeyboard,
        parse_mode: "MarkdownV2",
      });
    }
  );
  return Promise.allSettled(sendMessageDeferred);
};

export const main = middyfy(sendPoll);
