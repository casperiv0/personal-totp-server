import { Router } from "express";
import { accountsRouter } from "./accounts";
import { authRouter } from "./auth";

const router = Router();

router.use("/auth", authRouter);
router.use("/accounts", accountsRouter);

export const apiRouter = router;
