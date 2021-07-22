import {
  attribute,
  hashKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { v4 } from "uuid";

@table(process.env.ORG_TABLE)
export class Org {
  /** @example "04e8c524-faf9-4728-94bf-625b8468e0d4" */
  @hashKey({ defaultProvider: () => v4() })
  id: string;

  /** @example "my_org" */
  @attribute()
  name: string;
}
