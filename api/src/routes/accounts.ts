import { validateSchema } from "@casper124578/utils";
import { Router } from "express";
import { prisma } from "lib/prisma";
import { withAuth } from "lib/withAuth";
import { createAccountSchema } from "src/schemas";
import { IRequest } from "types/IRequest";

const router = Router();

router.get("/", (_, res) => {
  return res.send("hello world");
});

router.post("/", withAuth, async (req: IRequest, res) => {
  const { secret } = req.body;

  const [error] = await validateSchema(createAccountSchema, req.body);

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  const account = await prisma.account.create({
    data: {
      secret,
      userId: req.userId!,
    },
  });

  return res.json({ account });
});

export const accountsRouter = router;
