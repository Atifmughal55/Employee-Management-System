import mongoose from "mongoose";
import AttendanceModel from "../models/attendanceModel.js";

export const getMonthlyAttendanceSummary = async (userId, year, month) => {
  try {
    if (!month || !year) {
      throw new Error("Month and year are required");
    }

    const startDate = new Date(year, month - 1, 1); //get first day of month
    const endDate = new Date(year, month, 0, 23, 59, 59); //get last day of month

    // Aggregate query to calculate status counts for a specific user

    const result = await AttendanceModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: { $gte: startDate, $lte: endDate },
        },
      },
      //get user from the range of given dates
      //{user:123, startDate:1 may, endDate:5 may}
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      //Group with status
      //example
      //       [
      //   { _id: "Present", count: 10 },
      //   { _id: "Absent", count: 2 },
      //   { _id: "Leave", count: 1 }
      // ]
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },

      //change the output formate
      //       [
      //   { status: "Present", count: 10 },
      //   { status: "Absent", count: 2 },
      //   { status: "Leave", count: 1 }
      // ]
      {
        $group: {
          _id: null,
          attendanceSummary: {
            $push: { status: "$status", count: "$count" },
          },
        },
      },
      // Combine result to one document
    ]);

    // Initialize a summary object
    const summary = {
      Present: 0,
      Absent: 0,
      Leave: 0,
      Incomplete: 0,
      Late: 0,
      "Left Early": 0,
    };

    if (result.length > 0) {
      result[0].attendanceSummary.forEach((record) => {
        summary[record.status] = record.count;
      });
    }
    return summary;
  } catch (error) {
    throw new Error(`Failed to calculate attendance summary: ${error.message}`);
  }
};
