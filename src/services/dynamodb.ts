import { DynamoDB } from "aws-sdk";

const dynamoClient = new DynamoDB.DocumentClient({ region: "ap-southeast-1" });

export const put = (params: DynamoDB.DocumentClient.PutItemInput): any =>
  dynamoClient.put(params).promise();
export const query = (params: DynamoDB.DocumentClient.QueryInput): any =>
  dynamoClient.query(params).promise();
export const update = (params: DynamoDB.DocumentClient.UpdateItemInput): any =>
  dynamoClient.update(params).promise();
export const remove = (params: DynamoDB.DocumentClient.DeleteItemInput): any =>
  dynamoClient.delete(params).promise();
