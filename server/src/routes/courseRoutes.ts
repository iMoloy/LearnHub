import { Router } from "express";
import { courseController } from "../controllers/courseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {
  courseIdParamSchema,
  courseListQuerySchema,
  createCourseSchema,
  updateCourseSchema,
} from "../validators/courseSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
  "/",
  validate({ query: courseListQuerySchema }),
  asyncHandler(courseController.list)
);

router.get(
  "/:id",
  validate({ params: courseIdParamSchema }),
  asyncHandler(courseController.getById)
);

router.post(
  "/",
  authMiddleware,
  validate({ body: createCourseSchema }),
  asyncHandler(courseController.create)
);

router.put(
  "/:id",
  authMiddleware,
  validate({ params: courseIdParamSchema, body: updateCourseSchema }),
  asyncHandler(courseController.update)
);

router.delete(
  "/:id",
  authMiddleware,
  validate({ params: courseIdParamSchema }),
  asyncHandler(courseController.remove)
);

export default router;
