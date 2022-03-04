/* eslint-disable no-template-curly-in-string */
import { handlerPath } from "../../utils/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      schedule: "cron(0 0 * * ? *)",
    },
  ],
  iamRoleStatementsName: "${self:service}-${sls:stage}-sendPoll",
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: "dynamodb:Query",
      Resource: [
        "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.TABLE_NAME_EVENT}",
        "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.TABLE_NAME_EVENT}/*",
      ],
    },
    {
      Effect: "Allow",
      Action: "dynamodb:PutItem",
      Resource:
        "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.TABLE_NAME_MESSAGE}",
    },
  ],
};
