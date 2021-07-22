declare namespace NodeJS {
  export interface ProcessEnv {
    ORG_TABLE: string;
    SERVICE_TABLE: string;
    NODE_ENV: "production" | "development";
  }
}
