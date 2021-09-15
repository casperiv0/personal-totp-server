import { compareSync } from "bcryptjs";
import { Response, Router } from "express";
import { createSessionToken } from "lib/auth/createSessionToken";
import { setCookie } from "lib/auth/setCookie";
import { prisma } from "lib/prisma";
import { IRequest } from "types/IRequest";

const router = Router();

router.post("/", async (req: IRequest, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    // todo: setup yup validation
    return res.status(400).send();
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

export const authRouter = router;
