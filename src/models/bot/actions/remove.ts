import { Context } from "telegraf";
import { remove as removeEvent } from "../../../services/dynamodb";

export const remove = async (ctx: Context & { update: any }) => {
  const { message, data } = ctx.update.callback_query;
  const { message_id: messageId, chat } = message;
  const chatId = chat.id;

  const [, eventId] = data.split("_");

  await Promise.allSettled([
    removeEvent({ TableName: process.env.TABLE_NAME_EVENT, Key: { eventId } }),
    ctx.telegram.editMessageText(chatId, messageId, messageId, "Removed!"),
  ]);

  return ctx.answerCbQuery("Removed!");
};
