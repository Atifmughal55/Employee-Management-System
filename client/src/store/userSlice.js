import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  profilePicture: "",
  phone: "",
  address: "",
  verify_email: "",
  last_login_date: "",
  employeeID: "",
  role: "",
  department: "",
  dob: "",
  maritalStatus: "",
  dateOfJoining: "",
  salary: "",
  position: "",
  status: "",
  attendance: [],
  leaveBalance: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action.payload?._id;
      state.firstName = action.payload?.firstName;
      state.lastName = action.payload?.lastName;
      state.email = action.payload?.email;
      state.profilePicture = action.payload?.profilePicture;
      state.phone = action.payload?.phone;
      state.address = action.payload?.address;
      state.verify_email = action.payload?.verify_email;
      state.last_login_date = action.payload?.last_login_date;
      state.employeeID = action.payload?.employeeID;
      state.role = action.payload?.role;
      state.department = action.payload?.department;
      state.dob = action.payload?.dob;
      state.maritalStatus = action.payload?.maritalStatus;
      state.dateOfJoining = action.payload?.dateOfJoining;
      state.salary = action.payload?.salary;
      state.position = action.payload?.position;
      state.status = action.payload?.status;
      state.attendance = action.payload?.attendance;

      state.leaveBalance = action.payload?.leaveBalance;
    },

    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    logout: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.profilePicture = "";
      state.phone = "";
      state.verify_email = "";
      state.last_login_date = "";
      state.employeeID = "";
      state.role = "";
      state.status = "";
      state.leaveBalance = "";
    },
  },
});

export const { setUserDetails, logout, updateAvatar } = userSlice.actions;

export default userSlice.reducer;
