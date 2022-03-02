import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "../../libs/api-gateway";
import { createBot } from "../../libs/bot";
import { middyfy } from "../../libs/lambda";

const webhook: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const bot = createBot();
  await bot.handleUpdate(event.body);

  return formatJSONResponse({});
};

export const main = middyfy(webhook);
