import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: "task Name",
    },
    description: {
      type: String,
      trim: true,
      default: "task Description",
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true,
      enum: [
        "hr",
        "Engineering",
        "Sales",
        "Marketing",
        "Finance",
        "Operations",
      ],
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Pending"],
      default: "In Progress",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    progressReport: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;
