import Subtodo from "../models/subtodo.model.js"
import Todo from "../models/todo.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"


const createTask = asyncHandler(async (req, res) => {
    const {todoId, task } = req.body

    if (!todoId || !task) {
        throw new ApiError(400, "todo id and task is required")
    }
    const subtodo = await Subtodo.create({
        task: task,
        isCompleted: false,
        todo: todoId
    })

    const createdSubtodo = await Subtodo.findById(subtodo._id);

    if (!createdSubtodo) {
        throw new ApiError(500, "something went wrong while saving the data")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdSubtodo, "task created successfully"))
})

const getAllTasks = asyncHandler(async(req, res)=>{
    const {todoId} = req.params

    if(!todoId){
        throw new ApiError(400, "todo does not exist")
    }

    const todo = await Todo.findById(todoId);

    if(!todo){
        throw new ApiError(400, "todo does not exist")
    }

    const tasks = await Subtodo.aggregate([
        {
            $match:{
                todo: mongoose.Types.ObjectId(todoId)
            }
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200, tasks, "todo fetched successfully"))

})


export {createTask, getAllTasks}