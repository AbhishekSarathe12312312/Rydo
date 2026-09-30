import express from "express";
import {
  approveDriver,
  checkAdminAuth,
  getAllDrivers,
  getDriverProfile,
  loginAdmin,
  loginUser,
  registerDriver,
  registerUser,
  rejectDriver,
  updateDriverProfile,
  verifyOTP,
} from "../controllers/userController.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer
router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);

// Driver
router.post("/driver/register", registerDriver);
router.get("/driver/get-profile", authMiddleware, getDriverProfile);
router.put("/driver/update-profile", authMiddleware, updateDriverProfile);

// Login
router.post("/login", loginUser);

// ADMIN login
router.post("/admin/login", loginAdmin);
router.get("/admin/check", authMiddleware, adminMiddleware, checkAdminAuth);
router.get("/admin/drivers", authMiddleware, adminMiddleware, getAllDrivers);
router.put(
  "/admin/driver/approve",
  authMiddleware,
  adminMiddleware,
  approveDriver,
);
router.put(
  "/admin/driver/reject",
  authMiddleware,
  adminMiddleware,
  rejectDriver,
);

export default router;
