import type { Request, Response } from "express";
import { courseModel } from "../models/courseModel.js";
import { AppError } from "../utils/AppError.js";

export const courseController = {
  async list(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);

    const { items, pagination } = await courseModel.findAll({ page, limit });

    res.json({
      success: true,
      data: items,
      pagination,
    });
  },

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const course = await courseModel.findById(id);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    res.json({
      success: true,
      data: course,
    });
  },

  async create(req: Request, res: Response): Promise<void> {
    const course = await courseModel.create(req.body);
    res.status(201).json({
      success: true,
      data: course,
    });
  },

  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const course = await courseModel.update(id, req.body);
    res.json({
      success: true,
      data: course,
    });
  },

  async remove(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await courseModel.delete(id);
    res.json({
      success: true,
      data: { id },
    });
  },
};
