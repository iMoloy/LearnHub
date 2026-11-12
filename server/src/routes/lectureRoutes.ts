import { Router } from "express";
import { lectureController } from "../controllers/lectureController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {
  courseIdLectureParamSchema,
  createLectureSchema,
  lectureIdParamSchema,
  updateLectureSchema,
} from "../validators/lectureSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
  "/courses/:courseId/lectures",
  validate({ params: courseIdLectureParamSchema }),
  asyncHandler(lectureController.listByCourse)
);

router.post(
  "/courses/:courseId/lectures",
  authMiddleware,
  validate({ params: courseIdLectureParamSchema, body: createLectureSchema }),
  asyncHandler(lectureController.create)
);

router.put(
  "/lectures/:id",
  authMiddleware,
  validate({ params: lectureIdParamSchema, body: updateLectureSchema }),
  asyncHandler(lectureController.update)
);

router.delete(
  "/lectures/:id",
  authMiddleware,
  validate({ params: lectureIdParamSchema }),
  asyncHandler(lectureController.remove)
);

export default router;
