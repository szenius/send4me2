/* eslint-disable no-template-curly-in-string */
import { handlerPath } from "../../libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    TELEGRAM_BOT_TOKEN: "${ssm:/send4me2/${sls:stage}/TELEGRAM_BOT_TOKEN}",
  },
  events: [
    {
      http: {
        method: "post",
        path: "set-webhook",
      },
    },
  ],
};
