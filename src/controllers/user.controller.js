import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse";
import User from "../models/user.model.js";

const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password, confirmPassword} = req.body;

    if(!name || !email || !password || !confirmPassword){
        throw new ApiError(400, "All fields are required");
    }

    if(password !== confirmPassword){
        throw new ApiError(400, "passwords do not match")
    }

    const existingUser = await User.findOne({email:email})

    if(existingUser){
        throw new ApiError(400, "user with the email already exists")
    }

    //TODO check if both email and password are valid or not

    const user = User.create({
        name: name,
        username: name,
        password: password,
        email: email
    })

    const createdUser = User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "Soomething went wrong while saving the data")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user registered successfully"))
})


export {
    registerUser
}