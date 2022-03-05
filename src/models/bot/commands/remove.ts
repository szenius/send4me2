import { Context } from "telegraf";
import { Key, Keyboard } from "telegram-keyboard";
import { INDEXES_EVENT } from "../../../resources/dynamodb";
import { query } from "../../../services/dynamodb";
import { Event } from "../../../types";

export const remove = async (ctx: Context) => {
  const chatId = ctx.message.chat.id;

  const { Items } = await query({
    TableName: process.env.TABLE_NAME_EVENT,
    IndexName: INDEXES_EVENT.CHAT_ID,
    KeyConditionExpression: "chatId = :chatId",
    ExpressionAttributeValues: {
      ":chatId": chatId,
    },
  });
  const events = Items as Event[];

  const keyboard = Keyboard.make(
    events.map(({ description, dayOfWeek, eventId }) => [
      Key.callback(
        `"${description}" every ${dayOfWeek} 00:00 UTC`,
        `REMOVE_${eventId}`
      ),
    ])
  );

  return ctx.telegram.sendMessage(
    chatId,
    "Click on the poll that you want to remove.",
    keyboard.inline()
  );
};
