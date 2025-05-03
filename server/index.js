import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();
//Middlewares
app.use(
  cors({
    credentials: true, //access cookies from client
    origin: process.env.FRONTEND_URL,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json()); //All the responses converted to json formate
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ messsage: "Welcome to my API." });
});
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
const PORT = 8000 || process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is runnning on PORT", PORT);
  });
});
