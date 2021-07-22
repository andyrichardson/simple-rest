import { DynamoDB } from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";

export * from "./Org";
export * from "./Service";

export const assign: <T>(model: T, properties: Partial<T>) => T = Object.assign;

const client =
  process.env.NODE_ENV === "production"
    ? new DynamoDB()
    : new DynamoDB({
        region: "localhost",
        endpoint: "http://localhost:8000",
        accessKeyId: "1234",
        secretAccessKey: "1234",
      });

export const mapper = new DataMapper({ client });
