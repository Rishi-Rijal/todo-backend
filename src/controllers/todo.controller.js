import Todo from "../models/todo.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"


const createTodo = asyncHandler(async (req, res) => {
    const user = req.user

    if (!user) {
        throw new ApiError(401, "unauthorized request")
    }

    const todo = await Todo.create({
        title: "untitled",
        owners: [user.email],
    })

    const createdTodo = await Todo.findById(todo._id);

    if (!createdTodo) {
        throw new ApiError(500, "Something went wrong while creating todo")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createTodo, "new todo created successfully"))

})

const getAllTodos = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user?._id) {
        throw ApiError(401, "unauthorized request")
    }

    const todos = await Todo.aggregate([
        {
            $match: {
                owners: mongoose.Types.ObjectId(user?._id)
            }
        }
    ])

    return res
        .status(200)
        .json(new ApiResponse(200, todos, "todos fetched successfully"))
})

export { createTodo, getAllTodos }
