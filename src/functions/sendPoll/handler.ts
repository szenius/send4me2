import { createBot } from "../../bot/bot";
import { INDEXES } from "../../resources/dynamodb";
import { query } from "../../services/dynamodb";
import { middyfy } from "../../utils/lambda";

const DAY_OF_WEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
  const sendMessageDeferred = events.map(({ chatId, description }) =>
    bot.telegram.sendMessage(chatId, description)
  );
  await Promise.allSettled(sendMessageDeferred);
};

export const main = middyfy(sendPoll);
