import { createBot } from "../../models/bot/bot";
import type { ValidatedEventAPIGatewayProxyEvent } from "../../utils/api-gateway";
import { formatJSONResponse } from "../../utils/api-gateway";
import { middyfy } from "../../utils/lambda";

const setWebhook: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const bot = createBot();

  const webhookUrl = `https://${event.headers.Host}/${event.requestContext.stage}/webhook`;
  await bot.telegram.setWebhook(webhookUrl);

  return formatJSONResponse({
    message: "Success.",
    url: webhookUrl,
  });
};

export const main = middyfy(setWebhook);
