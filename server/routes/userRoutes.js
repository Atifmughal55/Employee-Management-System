import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  forgotPassword,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetPassword,
  updateUserDetailsController,
  uploadProfilePicture,
  verifyEmailController,
  VeryfyForgotPasswordOTP,
} from "../controllers/userController.js";
import upload from "../middleware/multer.js";
const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.get("/logout", auth, logoutController);
userRouter.put(
  "/upload-profile-picture",
  auth,
  upload.single("profilePicture"),
  uploadProfilePicture
);
userRouter.put("/update-user", auth, updateUserDetailsController);
userRouter.put("/forgot-password", forgotPassword);
userRouter.put("/verify-forgot-password-otp", VeryfyForgotPasswordOTP);
userRouter.put("/reset-password", resetPassword);
userRouter.post("/refresh-token", refreshToken);
export default userRouter;
