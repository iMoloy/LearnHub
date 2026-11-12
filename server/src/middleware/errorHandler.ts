import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    const firstIssue = err.issues[0];
    const field = firstIssue?.path.join(".");
    const message = field
      ? `${field}: ${firstIssue.message}`
      : firstIssue?.message ?? "Validation error";

    res.status(400).json({
      success: false,
      message,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Resource not found",
      });
      return;
    }
    if (err.code === "P2002") {
      res.status(409).json({
        success: false,
        message: "Resource already exists",
      });
      return;
    }
  }

  if (env.NODE_ENV !== "production") {
    console.error("Unhandled error:", err);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
