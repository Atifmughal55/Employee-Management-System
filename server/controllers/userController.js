import sendEmail from "../config/sendEmails.js";
import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOTP from "../utils/generateOTP.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";
export const registerUserController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      firstName,
      lastName,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from EMS_Team",
      html: verifyEmailTemplate({
        firstName,
        url: verifyEmailUrl,
      }),
    });
    return res.status(201).json({
      message: "User register successfull",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );
    return res.status(201).json({
      message: "Verification email done!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const updateLastLogin = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//Logout controller

export const logoutController = async (req, res) => {
  try {
    const userId = req.userId; // from middleware
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.status(200).json({
      message: "Logged out successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

//Upload profile Picture
export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const image = req.file; // from multer middleware
    // console.log("image", image);
    const upload = await uploadImageCloudinary(image);

    //Update on the database
    const updateProfileImage = await UserModel.findByIdAndUpdate(userId, {
      profilePicture: upload.url,
    });

    res.status(201).json({
      message: "Image Uplaoded Successfully",
      success: true,
      error: false,
      data: {
        _id: userId,
        profilePicture: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

//Update user details
export const updateUserDetailsController = async (req, res) => {
  try {
    const userId = req.userId; //middleware
    const { firstName, lastName, email, phone, address, password } = req.body;

    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      ...(firstName && { firstName: firstName }),
      ...(lastName && { lastName: lastName }),
      ...(email && { email: email }),
      ...(phone && { phone: phone }),
      ...(address && { address: address }),
      ...(password && { password: hashPassword }),
    });

    return res.status(201).json({
      message: "Updated user successfully",
      success: false,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

//Forget Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const OTP = generateOTP();
    const expiresTime = new Date(Date.now() + 15 * 60 * 1000);

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: OTP,
      forgot_password_expiry_date: expiresTime,
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot password from Team EMS",
      html: forgotPasswordTemplate({ name: user.firstName, otp: OTP }),
    });

    return res.status(201).json({
      message: "Please Check Your Email",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

//Verify Forgot Password OTP
export const verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Please provide email and OTP",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email }).select(
      "+forgot_password_otp"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const validOTPTime = new Date().toISOString();
    if (user.forgot_password_expiry_date < validOTPTime) {
      return res.status(400).json({
        message: "Your OTP is Expired. Please try again",
        error: true,
        success: false,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Invalid OTP  please try again",
        success: false,
        error: true,
      });
    }

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });
    return res.status(200).json({
      message: "OTP verified Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || message,
      success: false,
      error: true,
    });
  }
};

//Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "email, newPassword and confirm password fields are required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and Confirm password should be same",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
      forgot_password_otp: "",
      forgot_password_expiry_date: "",
    });

    return res.status(201).json({
      message: "Password reset successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

//Refresh Token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(403).json({
        message: "Invalid refresh token",
        error: true,
        success: false,
      });
    }

    const verifiedToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifiedToken) {
      return res.status(403).json({
        message: "Invalid or expired refresh token",
        error: true,
        success: false,
      });
    }

    // console.log("Verified Token: ", verifiedToken?.id);
    const userId = verifiedToken?.id;
    const newAccessToken = await generateAccessToken(userId);

    console.log("New Access Token", newAccessToken);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookieOptions);

    return res.json({
      message: "Access token refresh successfully",
      success: true,
      error: false,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Fetched user details",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
