import { NextFunction, Request, Response } from "express";
import { Auth } from "../../core/domain/entitites/Auth/Auth";

export function validateJwtMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).json({ message: "No token found" });

  const [, token] = authHeader.split(" ");

  if (!token) return response.status(401).json({ message: "No token found" });

  try {
    const isAllowed = Auth.verifyToken(token);
    return isAllowed
      ? next()
      : response.status(401).json({ message: "Invalid token" });
  } catch {
    return response.status(401).json({ message: "Invalid token" });
  }
}
