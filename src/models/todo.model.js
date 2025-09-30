import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    title:{
        type: String,
        trim: true,
        default: "untittled"
    },
    owners:[{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    subtodos: [{
        type: Schema.Types.ObjectId,
        ref: "Subtodo"
    }]
})

const Todo = mongoose.model("Todo", userSchema);

export default Todo;