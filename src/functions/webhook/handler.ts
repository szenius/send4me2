import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "../../libs/api-gateway";
import { createBot } from "../../libs/bot";
import { middyfy } from "../../libs/lambda";

const webhook: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const bot = createBot();
  await bot.handleUpdate(event.body);

  // eslint-disable-next-line no-console
  console.log(event.body);

  return formatJSONResponse({});
};

export const main = middyfy(webhook);
