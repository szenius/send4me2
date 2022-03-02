import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

const webhook: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  // eslint-disable-next-line no-console
  console.log(event.body);
  return formatJSONResponse({});
};

export const main = middyfy(webhook);
