import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Provide your first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Provide your last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Provide your email address"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Provide your password"],
      minLength: 8,
      select: false, // For not showing password in response
    },
    role: {
      type: String,
      enum: ["admin", "hr", "employee"],
      default: "employee",
    },
    department: {
      type: String,
      enum: [
        "hr",
        "Engineering",
        "Sales",
        "Marketing",
        "Finance",
        "Operations",
      ],
    },
    position: {
      type: String,
    },
    employeeID: {
      type: String,
      unique: true,
    },
    dateOfJoining: {
      type: Date,
      default: Date.now,
      required: true,
    },
    salary: {
      type: Number,
    },
    phone: {
      type: String,
    },
    profilePicture: {
      type: String, // URL or file path
      default: "",
    },
    leaveBalance: {
      annual: { type: Number, default: 20 },
      sick: { type: Number, default: 10 },
    },
    attendance: [
      {
        date: Date,
        status: {
          type: String,
          enum: ["Present", "Absent", "Leave"],
          default: "Present",
        },
      },
    ],
    refresh_token: {
      type: String,
      default: "",
      select: false, // Don't show refresh token in the response
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_login_date: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry_date: {
      type: Date,
      default: null,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.employeeID) {
    // Generate a unique ID (Example: EMP-2025001, EMP-2025002)
    const lastUser = await mongoose
      .model("User")
      .findOne()
      .sort({ createdAt: -1 });
    let lastEmployeeNumber = lastUser
      ? parseInt(lastUser.employeeID.split("-")[1])
      : 0;

    this.employeeID = `EMP-${new Date().getFullYear()}${(lastEmployeeNumber + 1)
      .toString()
      .padStart(3, "0")}`;
  }
  next();
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
