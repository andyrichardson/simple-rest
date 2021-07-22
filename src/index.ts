import express from "express";
import serverlessHttp from "serverless-http";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";
import { RegisterRoutes } from "./routes";
import { ValidateError } from "tsoa";

export const app = express();
app.use(express.json());
RegisterRoutes(app);

// Validation handler
app.use(function errorHandler(err: any, req: any, res: any, next: any) {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

app.use(
  "/",
  swaggerUi.serveWithOptions({ redirect: false }),
  swaggerUi.setup(swaggerDoc)
);

export const handler = serverlessHttp(app);
