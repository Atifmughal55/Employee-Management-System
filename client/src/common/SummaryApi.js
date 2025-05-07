export const baseURL = "http://localhost:8000";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "put",
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "put",
  },
  refresh_Token: {
    url: "/api/user/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },
  logout: {
    url: "/api/user/logout",
    method: "get",
  },
  updateUserDetails: {
    url: "/api/user/update-user",
    method: "put",
  },
  uploadAvatar: {
    url: "/api/user/upload-profile-picture",
    method: "put",
  },
  getMyTask: {
    url: "/api/task/my-tasks",
    method: "get",
  },
  updateStatus: {
    url: "/api/task/update-status",
    method: "put",
  },
};

export default SummaryApi;
