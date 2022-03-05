import { Context } from "telegraf";
import { INDEXES_EVENT } from "../../../resources/dynamodb";
import { query } from "../../../services/dynamodb";
import { Event } from "../../../types";

export const list = async (ctx: Context) => {
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

  const eventsListMessage = events
    .map(
      ({ description, dayOfWeek }, index) =>
        `${index + 1}. "${description.slice(0, 100)}${
          description.length > 100 ? "..." : ""
        }" every ${dayOfWeek} 00:00 UTC`
    )
    .join("\n");

  return ctx.reply(`These polls are scheduled:\n\n${eventsListMessage}`);
};
