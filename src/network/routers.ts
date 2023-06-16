import { Router } from "express";
import routerTask from "../controllers/task/task.router";

const router = Router();

router.use('/task', routerTask);

export default router
