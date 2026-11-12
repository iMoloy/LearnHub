import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { AppError } from "./utils/AppError.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(compression());
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: false,
    })
  );
  app.use(express.json({ limit: "1mb" }));

  app.use("/api", routes);

  app.use((_req, _res, next) => {
    next(new AppError("Route not found", 404));
  });

  app.use(errorHandler);

  return app;
}
