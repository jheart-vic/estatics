import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URl)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(express.json());

app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server on port 3000!!!");
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || err;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
