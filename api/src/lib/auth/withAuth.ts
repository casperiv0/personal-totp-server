import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { IRequest } from "types/IRequest";
import { getUser } from "../getUser";

export const COOKIE_NAME = "personal-totp-session";

/**
 * check if someone is authenticated
 */
export async function withAuth(
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const token = req.cookies[COOKIE_NAME] || req.headers.session;
  const secret = process.env["JWT_SECRET"] as string;

  if (!token) {
    return res.status(401).json({ error: "invalid token", status: "error" });
  }

  try {
    const vToken = jwt.verify(token, secret);
    const user = await getUser(vToken as string);

    if (!user) {
      return res.status(401).json({
        error: "User was not found",
        status: "error",
      });
    }

    req.userId = user.id;

    return next();
  } catch (e) {
    console.error(e);

    return res.status(401).json({ error: "invalid token", status: "error" });
  }
}
