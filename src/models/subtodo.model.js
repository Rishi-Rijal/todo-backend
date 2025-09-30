import mongoose, {Schema} from "mongoose";

const subtodoSchema = new Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },

    todo: {
        type: Schema.Types.ObjectId,
        ref: "Todo",
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

const Subtodo = mongoose.model("Subtodo", subtodoSchema);

export default Subtodo