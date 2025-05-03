import TaskModel from "../models/taskModel.js";
import UserModel from "../models/userModel.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      department,
      assignedTo,
      progressReport,
    } = req.body;
    const userId = req.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    if (user.role !== "admin" && user.role !== "hr") {
      return res.status(401).json({
        message: "You are not Allow to create task",
        success: false,
        error: true,
      });
    }

    const assignedUser = await UserModel.findById(assignedTo);
    if (!assignedUser) {
      return res.status(404).json({
        message: "Assigned user not found",
        success: false,
        error: true,
      });
    }
    const payload = {
      title,
      description,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : defaultEndDate,
      department,
      assignedTo,
      progressReport,
      createdBy: user._id,
    };

    const newTask = new TaskModel(payload);
    const save = await newTask.save();
    const populatedTask = await TaskModel.findById(newTask._id)
      .populate("assignedTo", "firstName lastName email")
      .populate("createdBy", "firstName lastName email");

    return res.status(201).json({
      message: "Task created successfully",
      data: populatedTask,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
        error: true,
      });
    }

    if (user.role !== "admin" && user.role !== "hr") {
      return res.status(401).json({
        message: "You are not Allow.",
        success: false,
        error: true,
      });
    }

    const tasks = await TaskModel.find().populate("assignedTo createdBy");
    return res.status(200).json({
      message: "Fetched all the tasks",
      totalTasks: tasks.length,
      error: false,
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const getMyTask = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(201).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const task = await TaskModel.find({ assignedTo: userId })
      .populate("createdBy")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Fetched your tasks.",
      totalTasks: task.length,
      success: false,
      error: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const user = await UserModel.findById(userId);

    const { title, description, startDate, endDate, department, assignedTo } =
      req.body;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    if (user.role !== "admin" && user.role !== "hr") {
      return res.status(404).json({
        message: "You are not Allow to Edit",
        success: false,
        error: true,
      });
    }

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
        success: false,
        error: true,
      });
    }

    const updateTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        ...(title && { title: title }),
        ...(description && { description: description }),
        ...(startDate && { startDate: startDate }),
        ...(endDate && { endDate: endDate }),
        ...(department && { department: department }),
        ...(assignedTo && { assignedTo: assignedTo }),
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      message: "Task updated successfully",
      success: true,
      error: false,
      data: updateTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const statusUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { status } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
        error: true,
      });
    }

    if (task.assignedTo.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You are not allow to update this task",
        success: false,
        error: true,
      });
    }

    const validStatus = ["Completed", "In Progress", "Pending"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        success: false,
        error: true,
      });
    }

    task.status = status;
    await task.save();

    return res.status(200).json({
      message: "Task status updated successfully",
      success: false,
      error: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    if (user.role !== "admin" && user.role !== "hr") {
      return res.status(401).json({
        message: "You are not allow to delete task",
        success: false,
        error: true,
      });
    }

    const taskDelete = await TaskModel.findByIdAndDelete(id);
    if (!taskDelete) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      message: "Task deleted Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
