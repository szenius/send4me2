/* eslint-disable no-template-curly-in-string */
import type { AWS } from "@serverless/typescript";

import * as functions from "./src/functions";
import dynamodb from "./src/resources/dynamodb";

const serverlessConfiguration: AWS = {
  service: "send4me2",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-iam-roles-per-function"],
  provider: {
    name: "aws",
    region: "ap-southeast-1",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      TABLE_NAME_EVENT: "${self:service}-${sls:stage}-event",
      TABLE_NAME_MESSAGE: "${self:service}-${sls:stage}-message",
      TELEGRAM_BOT_TOKEN: "${ssm:/send4me2/${sls:stage}/TELEGRAM_BOT_TOKEN}",
    },
  },
  functions,
  resources: { Resources: { ...dynamodb } },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
