import { Context } from "telegraf";
import { createPoll } from "../../poll";
import { query, update } from "../../services/dynamodb";

export const vote = async (ctx: Context & { update: any }) => {
  const { message, from, data } = ctx.update.callback_query;
  const { message_id: messageId, chat } = message;
  const chatId = chat.id;

  const [, optionId] = data.split("_");

  const { Items: messages } = await query({
    TableName: process.env.TABLE_NAME_MESSAGE,
    KeyConditionExpression: "chatId = :chatId AND messageId = :messageId",
    ExpressionAttributeValues: {
      ":chatId": chatId,
      ":messageId": messageId,
    },
  });

  const { description, options } = messages[0];
  options[optionId].voters.push(from);

  await update({
    TableName: process.env.TABLE_NAME_MESSAGE,
    Key: { chatId, messageId },
    UpdateExpression: "SET options = :options",
    ExpressionAttributeValues: {
      ":options": options,
    },
    ReturnValues: "UPDATED_NEW",
  });

  const { message: updatedMessage, inlineKeyboard } = createPoll(
    description,
    options
  );
  await ctx.telegram.editMessageText(
    chatId,
    messageId,
    messageId,
    updatedMessage,
    {
      ...inlineKeyboard,
      parse_mode: "MarkdownV2",
    }
  );

  return ctx.answerCbQuery("Recorded your response!");
};
