import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    checkInLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    checkInAddress: {
      type: String,
      default: "",
    },
    checkOutLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    checkOutAddress: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Leave", "Incomplete", "Late", "Left Early"],
      default: "Absent",
    },
    totalHours: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
export default AttendanceModel;
