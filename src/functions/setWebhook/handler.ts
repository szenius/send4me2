import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { Telegraf } from "telegraf";
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

const setWebhook: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const bot = new Telegraf(botToken, {
    telegram: { webhookReply: false },
  });

  const webhookUrl = `https://${event.headers.Host}/${event.requestContext.stage}/webhook`;

  await bot.telegram.setWebhook(webhookUrl);

  return formatJSONResponse({
    message: "Success.",
    url: webhookUrl,
  });
};

export const main = middyfy(setWebhook);
