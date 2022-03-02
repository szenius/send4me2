import { createBot } from "../../libs/bot";
import type { ValidatedEventAPIGatewayProxyEvent } from "../../libs/api-gateway";
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

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
