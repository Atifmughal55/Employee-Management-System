import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  profilePicture: "",
  phone: "",
  verify_email: "",
  last_login_data: "",
  employeeID: "",
  role: "",
  status: "",
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
      state.verify_email = action.payload?.verify_email;
      state.last_login_data = action.payload?.last_login_date;
      state.employeeID = action.payload?.employeeID;
      state.role = action.payload?.role;
      state.status = action.payload?.status;
      state.leaveBalance = action.payload?.leaveBalance;
    },
    logout: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.profilePicture = "";
      state.phone = "";
      state.verify_email = "";
      state.last_login_data = "";
      state.employeeID = "";
      state.role = "";
      state.status = "";
      state.leaveBalance = "";
    },
  },
});

export const { setUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
