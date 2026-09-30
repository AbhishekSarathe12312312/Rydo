import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import rideRoute from "./routes/rideRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://rydo-ten.vercel.app",
    credentials: true,
  }),
);
app.use("/api/user", userRoute);
app.use("/api/ride", rideRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
