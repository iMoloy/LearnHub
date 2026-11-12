import { Router } from "express";
import {
  getCertificates,
  getProgress,
  getDiscussions,
  getQuizzes,
} from "../controllers/portalController.js";

const router = Router();

router.get("/certificates", getCertificates);
router.get("/progress", getProgress);
router.get("/community", getDiscussions);
router.get("/quizzes", getQuizzes);

export default router;
