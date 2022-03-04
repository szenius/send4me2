import { Keyboard } from "telegram-keyboard";
import { createBot } from "../../bot/bot";
import { INDEXES } from "../../resources/dynamodb";
import { query } from "../../services/dynamodb";
import { Event } from "../../types";
import { middyfy } from "../../utils/lambda";

const DAY_OF_WEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const createPoll = (event: Event) => {
  const keyboard = Keyboard.make(event.options);
  return { message: event.description, inlineKeyboard: keyboard.inline() };
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

  const sendMessageDeferred = events.map((event: Event) => {
    const { message, inlineKeyboard } = createPoll(event);
    return bot.telegram.sendMessage(event.chatId, message, inlineKeyboard);
  });
  await Promise.allSettled(sendMessageDeferred);
};

export const main = middyfy(sendPoll);
