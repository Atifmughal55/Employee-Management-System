import AttendanceModel from "../models/attendanceModel.js";
import UserModel from "../models/userModel.js";
import { getAddress } from "../utils/getAddress.js";
import { getMonthlyAttendanceSummary } from "../utils/getMonthlyAttendanceSummary.js";

export const checkInController = async (req, res) => {
  const userId = req.userId;
  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { lat, lng } = req.body; // location from frontend

  const cutoffTime = new Date();
  cutoffTime.setHours(9, 10, 0, 0); //09:10 am

  try {
    const address = await getAddress(lat, lng);

    let status = "Incomplete";
    if (now > cutoffTime) status = "Late";

    let record = await AttendanceModel.findOne({ user: userId, date: today });

    if (record && record.checkIn) {
      return res.status(400).json({
        message: "Already checked in today",
        success: false,
        error: true,
      });
    }

    if (record) {
      record.checkIn = now;
      record.status = status;
      record.checkInLocation = { lat, lng };
      await record.save();
      return res.status(200).json({
        message: "Check-in updated",
        success: true,
        error: false,
        record,
      });
    }

    const newRecord = await AttendanceModel.create({
      user: userId,
      date: today,
      checkIn: now,
      status,
      checkInLocation: { lat, lng },
      checkInAddress: address,
    });

    res.status(201).json({
      message: "Check-in successful",
      success: true,
      error: false,
      record: newRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const checkOutController = async (req, res) => {
  const userId = req.userId;
  const now = new Date();

  // Ensure the date is consistent (UTC midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { lat, lng } = req.body;

  // Validate location coordinates
  if (
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return res.status(400).json({
      message: "Invalid location coordinates",
      success: false,
      error: true,
    });
  }

  try {
    const record = await AttendanceModel.findOne({ user: userId, date: today });
    if (!record || !record.checkIn) {
      return res.status(400).json({
        message: "Check-in required before check-out",
        success: false,
        error: true,
      });
    }

    if (record.checkOut) {
      return res.status(400).json({
        message: "Already checked out today",
        success: false,
        error: true,
      });
    }

    const duration = (now - new Date(record.checkIn)) / (1000 * 60 * 60); // in hours

    // Update check-out data
    record.checkOut = now;
    record.totalHours = +duration.toFixed(2); // Save as number

    record.checkOutLocation = { lat, lng };

    // Update status based on duration
    if (duration >= 8) {
      record.status = "Present";
    } else if (duration >= 4) {
      record.status = "Left Early";
    } else {
      record.status = "Incomplete";
    }

    await record.save();

    res.status(200).json({
      message: "Check-out successful",
      success: true,
      error: false,
      record,
    });
  } catch (err) {
    console.error("Check-out error:", err);
    res.status(500).json({
      message: "Check-out failed",
      success: false,
      error: true,
    });
  }
};

export const attendanceSummaryController = async (req, res) => {
  try {
    const userId = req.userId;

    const { month, year } = req.body;

    const summary = await getMonthlyAttendanceSummary(userId, month, year);
    return res.status(200).json({
      message: "Fetches all the Attendance Summary",
      success: true,
      error: false,
      data: summary,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
