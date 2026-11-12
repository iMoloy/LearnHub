import { Router } from "express";
import authRoutes from "./authRoutes.js";
import courseRoutes from "./courseRoutes.js";
import lectureRoutes from "./lectureRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/", lectureRoutes);

export default router;
