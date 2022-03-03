/* eslint-disable no-template-curly-in-string */
export default {
  ExpensesTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      AttributeDefinitions: [
        {
          AttributeName: "eventId",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "eventId",
          KeyType: "HASH",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      TableName: "${self:provider.environment.TABLE_NAME_EVENT}",
    },
  },
};
