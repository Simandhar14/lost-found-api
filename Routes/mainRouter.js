import express, { Router } from "express";
import userRouter from "./userRouter.js";
import itemsRouter from "./itemsRouter.js";
const app = express();

const router = Router();

router.use("/users", userRouter);
router.use("/items", itemsRouter);

export default router;
