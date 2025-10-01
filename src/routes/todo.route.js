import { Router } from "express";
import { createTodo, getAllTodos, getAllTasks } from "../controllers/todo.controller.js"
import { verifyJWT } from "../controllers/auth.controller.js"

const router = Router();

router.route("/todo").post(verifyJWT, createTodo)

router.route("/todo").get(verifyJWT, getAllTodos)

router.route("/todo/:tasks").get(verifyJWT, getAllTasks)

export default router