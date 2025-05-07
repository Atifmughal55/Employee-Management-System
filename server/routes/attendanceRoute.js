import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  attendanceSummaryController,
  checkInController,
  checkOutController,
} from "../controllers/attendanceController.js";

const attendanceRouter = Router();

attendanceRouter.post("/check-in", auth, checkInController);
attendanceRouter.post("/check-out", auth, checkOutController);
attendanceRouter.get("/attendance-summary", auth, attendanceSummaryController);

export default attendanceRouter;
