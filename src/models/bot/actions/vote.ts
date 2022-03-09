import { Context } from "telegraf";
import { createPoll } from "../../poll/poll";
import { query, update } from "../../../services/dynamodb";

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
  const chosenOption = options[optionId];
  const updatedVoters = chosenOption.voters.filter(
    (voter) => voter.id !== from.id
  );

  let isAddVote = false;
  if (chosenOption.voters.length === updatedVoters.length) {
    updatedVoters.push(from);
    isAddVote = true;
  }
  chosenOption.voters = updatedVoters;

  const { message: updatedMessage, inlineKeyboard } = createPoll(
    description,
    options
  );

  await Promise.allSettled([
    update({
      TableName: process.env.TABLE_NAME_MESSAGE,
      Key: { chatId, messageId },
      UpdateExpression: "SET options = :options",
      ExpressionAttributeValues: {
        ":options": options,
      },
      ReturnValues: "UPDATED_NEW",
    }),
    ctx.telegram.editMessageText(chatId, messageId, messageId, updatedMessage, {
      ...inlineKeyboard,
      parse_mode: "Markdown",
    }),
  ]);

  return ctx.answerCbQuery(
    `Your response is ${isAddVote ? "recorded" : "retracted"}!`
  );
};
