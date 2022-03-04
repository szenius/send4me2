export const INDEXES = { DAY_OF_WEEK: "dayOfWeekIndex" };

/* eslint-disable no-template-curly-in-string */
export default {
  EventTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      AttributeDefinitions: [
        {
          AttributeName: "eventId",
          AttributeType: "S",
        },
        {
          AttributeName: "dayOfWeek",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "eventId",
          KeyType: "HASH",
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: INDEXES.DAY_OF_WEEK,
          KeySchema: [
            {
              AttributeName: "dayOfWeek",
              KeyType: "HASH",
            },
          ],
          Projection: { ProjectionType: "ALL" },
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      TableName: "${self:provider.environment.TABLE_NAME_EVENT}",
    },
  },
  MessageTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      AttributeDefinitions: [
        {
          AttributeName: "chatId",
          AttributeType: "N",
        },
        {
          AttributeName: "messageId",
          AttributeType: "N",
        },
      ],
      KeySchema: [
        {
          AttributeName: "chatId",
          KeyType: "HASH",
        },
        {
          AttributeName: "messageId",
          KeyType: "RANGE",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      TableName: "${self:provider.environment.TABLE_NAME_MESSAGE}",
    },
  },
};
