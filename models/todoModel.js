import { mongoose } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
      default:false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Task", taskSchema);

export default Todo;
