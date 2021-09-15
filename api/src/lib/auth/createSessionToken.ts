import jwt from "jsonwebtoken";

export function createSessionToken(userId: string) {
  return jwt.sign(userId, process.env["JWT_SECRET"] as string);
}
