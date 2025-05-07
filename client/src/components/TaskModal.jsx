import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDateRange, MdAccessTime, MdPerson, MdTitle } from "react-icons/md";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import fetchTasks from "../utils/fetchTasks";
import toast from "react-hot-toast";

const TaskModal = ({ close, task, refreshTasks }) => {
  const startDate = new Date(task.startDate);
  const endDate = new Date(task.endDate);
  const now = new Date();

  const [status, setStatus] = useState(task.status || "In Progress");
  const [progress, setProgress] = useState(task.progressReport || "");
  const [isEdited, setIsEdited] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await Axios({
        method: SummaryApi.updateStatus.method,
        url: `${SummaryApi.updateStatus.url}/${task._id}`,
        data: {
          status,
          progressReport: progress,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEdited(false);
        close(); // close modal if you want
        refreshTasks();
      } else {
        toast.error("⚠️ Failed to update task.");
      }
    } catch (error) {
      AxiosToastError(error.message || error);
      console.log("error", error);
    }
  };

  const remainingDays = Math.max(
    0,
    Math.ceil((endDate - now) / (1000 * 60 * 60 * 24))
  );

  const statusColor = {
    "In Progress": "bg-yellow-200 text-yellow-800",
    Incomplete: "bg-red-200 text-red-800",
    Complete: "bg-green-200 text-green-800",
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setIsEdited(true);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
    setIsEdited(true);
  };
  useEffect(() => {
    fetchTasks();
  }, [status, progress]);
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-5 rounded-2xl shadow-xl space-y-4 animate-fade-in"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            📋 Task Summary
          </h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <p className="text-sm text-gray-600 flex items-center gap-1 font-medium">
            <MdTitle className="text-gray-500" />
            {task.title}
          </p>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>

        {/* Assigned By */}
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <MdPerson className="text-gray-500" />
          Assigned by{" "}
          <span className="font-semibold">
            {task.createdBy?.firstName} {task.createdBy?.lastName}
          </span>
        </div>

        {/* Dates */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md space-y-1">
          <p className="flex items-center gap-1">
            <MdDateRange className="text-blue-500" />
            <span className="font-medium text-gray-700">Start:</span>{" "}
            {startDate.toDateString()}
          </p>
          <p className="flex items-center gap-1">
            <MdAccessTime className="text-red-400" />
            <span className="font-medium text-gray-700">Deadline:</span>{" "}
            {endDate.toDateString()}
          </p>
          <p
            className={`text-sm font-semibold ${
              remainingDays === 0 ? "text-red-500" : "text-green-600"
            }`}
          >
            {remainingDays === 0
              ? "Deadline Reached!"
              : `⏳ ${remainingDays} day(s) remaining`}
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">Status</label>
          <span
            className={`px-2 py-1 text-xs rounded-md ${
              statusColor[status] || "bg-gray-200 text-gray-800"
            }`}
          >
            {status}
          </span>
        </div>

        <select
          className="w-full p-2 text-sm mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={status}
          onChange={handleStatusChange}
          disabled={status === "Completed"}
        >
          <option value={"In Progress"}>In Progress</option>
          <option value={"Pending"}>Pending</option>
          <option value={"Completed"}>Complete</option>
        </select>

        {/* Progress Report */}
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">
            Progress Report
          </label>
          <textarea
            rows={3}
            placeholder="Enter your current progress..."
            className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none"
            value={progress}
            onChange={handleProgressChange}
          />
        </div>

        {/* Update Button */}
        <button
          className={`w-full text-white text-sm py-2 rounded-md transition ${
            isEdited
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isEdited}
        >
          Update Task
        </button>
      </form>
    </section>
  );
};

export default TaskModal;
