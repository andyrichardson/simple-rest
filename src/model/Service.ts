import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { v4 } from "uuid";

@table("Service")
export class Service {
  /** @example "04e8c524-faf9-4728-94bf-625b8468e0d4" */
  @hashKey({ defaultProvider: () => v4() })
  id: string;

  /** @example "04e8c524-faf9-4728-94bf-625b8468e0d4" */
  @attribute()
  org: string;

  /** @example "my_service" */
  @rangeKey()
  name: string;
}
