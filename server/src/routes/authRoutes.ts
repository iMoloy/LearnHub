import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { loginRateLimiter } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";
import { googleAuthSchema, loginSchema } from "../validators/authSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post(
  "/login",
  loginRateLimiter,
  validate({ body: loginSchema }),
  asyncHandler(authController.login)
);

router.post(
  "/google",
  loginRateLimiter,
  validate({ body: googleAuthSchema }),
  asyncHandler(authController.googleLogin)
);

router.get("/me", authMiddleware, asyncHandler(authController.me));

export default router;
