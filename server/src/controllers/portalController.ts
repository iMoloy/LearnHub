import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCertificates = asyncHandler(async (_req: Request, res: Response) => {
  const certificates = await prisma.certificate.findMany({
    orderBy: { id: "asc" },
  });
  res.json({ success: true, data: certificates });
});

export const getProgress = asyncHandler(async (_req: Request, res: Response) => {
  const progress = await prisma.learningProgress.findMany({
    orderBy: { id: "asc" },
  });
  res.json({ success: true, data: progress });
});

export const getDiscussions = asyncHandler(async (_req: Request, res: Response) => {
  const discussions = await prisma.discussion.findMany({
    orderBy: { id: "asc" },
  });
  res.json({ success: true, data: discussions });
});

export const getQuizzes = asyncHandler(async (_req: Request, res: Response) => {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { id: "asc" },
  });
  res.json({ success: true, data: quizzes });
});
