/* eslint-disable no-template-curly-in-string */
import type { AWS } from "@serverless/typescript";

import * as functions from "./src/functions";

const serverlessConfiguration: AWS = {
  service: "send4me2",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
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
      TELEGRAM_BOT_TOKEN: "${ssm:/send4me2/${sls:stage}/TELEGRAM_BOT_TOKEN}",
    },
  },
  // import the function via paths
  functions,
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
