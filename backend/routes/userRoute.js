import express from "express";
import {
  approveDriver,
  checkAdminAuth,
  customerGetProfile,
  customerUpdateProfile,
  getAdminProfile,
  getAllDrivers,
  getDriverProfile,
  loginUser,
  registerDriver,
  registerUser,
  rejectDriver,
  updateAdminProfile,
  updateDriverProfile,
  verifyOTP,
} from "../controllers/userController.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// Customer Routes
router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.get("/customer/getProfile", authMiddleware, customerGetProfile);
router.put(
  "/customer/updateProfile",
  authMiddleware,
  singleUpload,
  customerUpdateProfile,
);

// Driver Routes
router.post("/driver/register", registerDriver);
router.get("/driver/get-profile", authMiddleware, getDriverProfile);
router.put(
  "/driver/update-profile",
  authMiddleware,
  singleUpload,
  updateDriverProfile,
);

// Login Routes
router.post("/login", loginUser);

// ADMIN 
router.get("/admin/check", authMiddleware, adminMiddleware, checkAdminAuth);
router.get("/admin/getProfile", authMiddleware, getAdminProfile);
router.put(
  "/admin/updateProfile",
  authMiddleware,
  singleUpload,
  updateAdminProfile,
);
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
