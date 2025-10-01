import { Router } from "express";
import { createTask } from "../controllers/subtodo.controller.js";
import { verifyJWT } from "../controllers/auth.controller.js"

const router = Router();

router.route("/:todoId/task").post(verifyJWT, createTask)

export default router