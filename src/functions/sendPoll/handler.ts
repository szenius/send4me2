import { Key, Keyboard } from "telegram-keyboard";
import { createBot } from "../../bot/bot";
import { INDEXES } from "../../resources/dynamodb";
import { put, query } from "../../services/dynamodb";
import { Event, Option, Message } from "../../types";
import { middyfy } from "../../utils/lambda";

const DAY_OF_WEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const createPoll = (description: Event["description"], options: Option[]) => {
  const optionsDisplay = options.map(({ label, voters }) =>
    [
      `*${label} \\- ${voters.length}*`,
      ...voters.map((voter) => voter.firstName),
    ].join("\n")
  );
  const numResponses = options.reduce(
    (sum: number, { voters }: Option) => sum + voters.length,
    0
  );
  const message = [
    description,
    ...optionsDisplay,
    `👥 *${numResponses}* responses`,
  ].join("\n\n");

  const keyboard = Keyboard.make(
    options.map(({ label }, index) => [Key.callback(label, `OPTION_${index}`)])
  );

  return { message, inlineKeyboard: keyboard.inline() };
};

const createNewPoll = (description: Event["description"], options: string[]) =>
  createPoll(
    description,
    options.map((label) => ({ label, voters: [] }))
  );

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

  const sendMessagesDeferred = events.map(
    ({ description, options, chatId }: Event) => {
      const { message, inlineKeyboard } = createNewPoll(description, options);

      return bot.telegram.sendMessage(chatId, message, {
        ...inlineKeyboard,
        parse_mode: "MarkdownV2",
      });
    }
  );
  const results = await Promise.allSettled(sendMessagesDeferred);

  const now = new Date();
  const nowEpochTime = now.getTime();

  const putMessagesDeferred = results.map((result, index) => {
    if (result.status === "rejected") {
      return new Promise(() => {});
    }
    const { eventId, chatId, description, options } = events[index];
    const message: Message = {
      messageId: result.value.message_id,
      created: nowEpochTime,
      eventId,
      chatId,
      description,
      options: options.map((label) => ({ label, voters: [] })),
    };

    return put({
      TableName: process.env.TABLE_NAME_MESSAGE,
      Item: message,
    });
  });

  return Promise.allSettled(putMessagesDeferred);
};

export const main = middyfy(sendPoll);
