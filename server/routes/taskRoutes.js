import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getMyTask,
  statusUpdate,
  updateTask,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.post("/create", auth, createTask);
taskRouter.get("/all-tasks", auth, getAllTask);
taskRouter.get("/my-tasks", auth, getMyTask);
taskRouter.put("/update/:id", auth, updateTask);
taskRouter.put("/update-status/:id", auth, statusUpdate);
taskRouter.delete("/delete/:id", auth, deleteTask);
export default taskRouter;
