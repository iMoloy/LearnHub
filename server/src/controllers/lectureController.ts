import type { Request, Response } from "express";
import { courseModel } from "../models/courseModel.js";
import { lectureModel } from "../models/lectureModel.js";
import { AppError } from "../utils/AppError.js";

export const lectureController = {
  async listByCourse(req: Request, res: Response): Promise<void> {
    const courseId = Number(req.params.courseId);
    const course = await courseModel.findById(courseId);
    if (!course) {
      throw new AppError("Course not found", 404);
    }

    const lectures = await lectureModel.findByCourseId(courseId);
    res.json({
      success: true,
      data: lectures,
    });
  },

  async create(req: Request, res: Response): Promise<void> {
    const courseId = Number(req.params.courseId);
    const course = await courseModel.findById(courseId);
    if (!course) {
      throw new AppError("Course not found", 404);
    }

    const lecture = await lectureModel.create({
      ...req.body,
      courseId,
    });

    res.status(201).json({
      success: true,
      data: lecture,
    });
  },

  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const lecture = await lectureModel.update(id, req.body);
    res.json({
      success: true,
      data: lecture,
    });
  },

  async remove(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await lectureModel.delete(id);
    res.json({
      success: true,
      data: { id },
    });
  },
};
