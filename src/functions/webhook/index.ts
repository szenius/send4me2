/* eslint-disable no-template-curly-in-string */
import { handlerPath } from "../../utils/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "webhook",
      },
    },
  ],
  iamRoleStatementsName: "${self:service}-${sls:stage}-webhook",
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:Query", "dynamodb:PutItem", "dynamodb:DeleteItem"],
      Resource: [
        "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.TABLE_NAME_EVENT}",
        "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.TABLE_NAME_EVENT}/*",
      ],
    },
    {
      Effect: "Allow",
      Action: ["dynamodb:Query", "dynamodb:UpdateItem"],
      Resource:
        "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.TABLE_NAME_MESSAGE}",
    },
  ],
};
