import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import TaskModal from "../components/TaskModal";

const Task = () => {
  const [myTask, setMyTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchMyTasks = async () => {
    try {
      setLoading(true);
      const response = await Axios(SummaryApi.getMyTask);
      const responseData = response?.data?.data;
      setMyTask(responseData || []);
    } catch (error) {
      AxiosToastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const calculateRemainingTime = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffMs = end - now;

    if (diffMs <= 0) return "0 days";

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return diffDays > 0
      ? `${diffDays} day${diffDays > 1 ? "s" : ""}`
      : `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-blue-600 font-medium">Loading tasks...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 p-2">
      {myTask.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No Task available</p>
      ) : (
        myTask.map((task) => (
          <div
            key={task._id}
            onClick={() => setSelectedTask(task)}
            className="w-64 h-40 bg-white border-2 border-blue-300 dark:bg-gray-800 shadow-md rounded-md p-2 flex flex-col justify-between hover:shadow-lg transition duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 truncate w-44">
                {task.title}
              </h3>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full min-w-20 ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {task.status}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
              {task.description}
            </p>
            <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-auto">
              Remaining: {calculateRemainingTime(task.endDate)}
            </div>
          </div>
        ))
      )}

      {selectedTask && (
        <TaskModal
          close={() => setSelectedTask(null)}
          task={selectedTask}
          refreshTasks={fetchMyTasks}
        />
      )}
    </div>
  );
};

export default Task;
