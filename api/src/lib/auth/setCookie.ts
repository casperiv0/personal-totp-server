import { CookieOptions, Response } from "express";
import { COOKIE_NAME } from "lib/withAuth";

const COOKIE_EXPIRES = 60 * 60 * 1000 * 1;

export function setCookie(token: string, res: Response) {
  const options: CookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + COOKIE_EXPIRES),
  };

  if (process.env["NODE_ENV"] === "production") {
    options.sameSite = "lax";
    options.secure = true;
  }

  res.cookie(COOKIE_NAME, token, options);
}
