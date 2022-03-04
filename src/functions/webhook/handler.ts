import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "../../utils/api-gateway";
import { createBot } from "../../models/bot/bot";
import { middyfy } from "../../utils/lambda";

const webhook: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const bot = createBot();
  await bot.handleUpdate(event.body);

  return formatJSONResponse({});
};

export const main = middyfy(webhook);
