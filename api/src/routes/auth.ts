import { validateSchema } from "@casper124578/utils";
import { compareSync } from "bcryptjs";
import { Response, Router } from "express";
import { createSessionToken } from "lib/auth/createSessionToken";
import { setCookie } from "lib/auth/setCookie";
import { getUser } from "lib/getUser";
import { prisma } from "lib/prisma";
import { withAuth } from "lib/auth/withAuth";
import { authenticateSchema } from "src/schemas";
import { IRequest } from "types/IRequest";

const router = Router();

router.post("/", async (req: IRequest, res: Response) => {
  const { username, password } = req.body;

  const [error] = await validateSchema(authenticateSchema, req.body);

  if (error) {
    return res.status(400).json({ error: error.message, errors: error.errors });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({
      error: "User was not found",
      status: "error",
    });
  }

  const isPwCorrect = compareSync(password, user.password);
  if (!isPwCorrect) {
    return res.status(400).json({
      error: "Password is invalid",
      status: "error",
    });
  }

  const token = createSessionToken(user.id);
  setCookie(token, res);

  return res.json({ userId: user.id });
});

router.post("/user", withAuth, async (req: IRequest, res: Response) => {
  const user = await getUser(req.userId!);

  return res.json({ user });
});

export const authRouter = router;
