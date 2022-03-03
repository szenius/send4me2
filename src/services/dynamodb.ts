import { DynamoDB } from "aws-sdk";

const dynamoClient = new DynamoDB.DocumentClient({ region: "ap-southeast-1" });

export const put = (params: DynamoDB.DocumentClient.PutItemInput): any =>
  dynamoClient.put(params).promise();
