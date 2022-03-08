import { createBot } from "../../models/bot/bot";
import { createNewPoll } from "../../models/poll/poll";
import { INDEXES_EVENT } from "../../resources/dynamodb";
import { put, query } from "../../services/dynamodb";
import { Event, Message } from "../../types";
import { middyfy } from "../../utils/lambda";

const DAY_OF_WEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const sendPoll = async () => {
  const bot = createBot();

  const today = new Date();
  const dayOfWeekToday = DAY_OF_WEEK_LIST[today.getUTCDay()];

  const { Items: events } = await query({
    IndexName: INDEXES_EVENT.DAY_OF_WEEK,
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
        parse_mode: "Markdown",
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
