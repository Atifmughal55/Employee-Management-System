import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  department: "",
  status: "",
  assignedTo: "",
  createdBy: "",
  progressReport: "",
};
const taskSlice = createSlice({
  name: "task",
  initialState: initialValue,
  reducers: {
    setTaskDetails: (state, action) => {
      state._id = action.payload?._id;
      state.title = action.payload?.title;
      state.description = action.payload?.description;
      state.startDate = action.payload?.startDate;
      state.endDate = action.payload?.endDate;
      state.department = action.payload?.department;
      state.status = action.payload?.status;
      state.assignedTo = action.payload?.assignedTo;
      state.createdBy = action.payload?.createdBy;
      state.progressReport = action.payload?.progressReport;
    },
  },
});

export const { setTaskDetails } = taskSlice.actions;
export default taskSlice.reducer;
