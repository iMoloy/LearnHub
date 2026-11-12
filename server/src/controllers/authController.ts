import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";
import { userModel } from "../models/userModel.js";
import { signToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    const existing = await userModel.findByEmail(email);
    if (existing) {
      throw new AppError("An account with this email already exists", 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      passwordHash,
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  },

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as { email: string; password: string };

    const user = await userModel.findByEmail(email);
    if (!user || !user.passwordHash) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  },

  async googleLogin(req: Request, res: Response): Promise<void> {
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_REDIRECT_URI) {
      throw new AppError("Google OAuth is not configured on the server", 500);
    }

    const { code } = req.body as { code: string };

    const client = new OAuth2Client(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      env.GOOGLE_REDIRECT_URI
    );

    let tokens;
    try {
      const response = await client.getToken(code);
      tokens = response.tokens;
    } catch {
      throw new AppError("Invalid Google authorization code", 401);
    }

    if (!tokens.id_token) {
      throw new AppError("Google ID token missing", 401);
    }

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.email_verified) {
      throw new AppError("Verified Google email is required", 401);
    }

    const email = payload.email.toLowerCase();
    const existingAdmin = await userModel.findByEmail(email);
    const isAllowed = env.adminEmailList.includes(email) || existingAdmin !== null;

    if (!isAllowed) {
      throw new AppError("You are not authorized to access the admin panel", 403);
    }

    const user = await userModel.upsertGoogleAdmin({
      name: payload.name ?? email.split("@")[0],
      email,
      googleId: payload.sub,
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  },

  async me(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }

    const user = await userModel.findById(req.user.userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.json({
      success: true,
      data: user,
    });
  },
};
