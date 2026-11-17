/// <reference path="../types/globals.d.ts" />
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { unauthorized } from "../utils/response.js";

interface Jwt_Payload {
  id: number;
  email: string;
}

export const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer") ? authHeader.slice(7) : null;

  if (!token) {
    return next(unauthorized("Not authenticated."));
  }

  try {
    req.user = jwt.verify(token, ENV.JWT_ACCESS_SECRET, {
      algorithms: ["HS256"],
    }) as Jwt_Payload;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return next(unauthorized("Token expired or invalid"));
  }
};

// For checking the refresh-token
export const refreshTokenMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.refreshToken;

  if (typeof token !== "string" || !token) {
    return next(unauthorized("Not authenticated."));
  }

  try {
    const payload = jwt.verify(token, ENV.JWT_REFRESH_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      typeof payload === "string" ||
      typeof payload.id !== "number" ||
      typeof payload.email !== "string"
    ) {
      return next(unauthorized("Invalid token."));
    }

    req.refreshPayload = { id: payload.id, email: payload.email };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return next(unauthorized("Token expired or invalid"));
  }
};
