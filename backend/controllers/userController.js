import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import { sendOTPEmail } from "../utils/sendOTPEmail.js";
import jwt from "jsonwebtoken";

// ===============================
// CUSTOMER REGISTER
// ===============================

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number already registered",
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    const otpHash = await bcrypt.hash(otp, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otpHash,
      name,
      phone,
      password: hashedPassword,
      role: "customer",
      expiresAt,
    });

    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      await OTP.deleteMany({ email });

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("REGISTER USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ===============================
// CUSTOMER VERIFY OTP
// ===============================

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpData = await OTP.findOne({ email });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    if (otpData.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpData._id });

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (otpData.attempts >= 5) {
      await OTP.deleteOne({ _id: otpData._id });

      return res.status(429).json({
        success: false,
        message: "Too many invalid attempts. Please register again",
      });
    }

    const isValidOTP = await bcrypt.compare(otp, otpData.otpHash);

    if (!isValidOTP) {
      otpData.attempts += 1;
      await otpData.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const user = await User.create({
      name: otpData.name,
      email: otpData.email,
      phone: otpData.phone,
      password: otpData.password,
      role: "customer",
    });

    await OTP.deleteOne({ _id: otpData._id });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ===============================
// CUSTOMER LOGIN
// ===============================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        driverStatus: user.driverStatus,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ===============================
// DRIVER REGISTER
// ===============================

export const registerDriver = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "driver",
      driverStatus: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Driver registration successful",
      driver: {
        id: driver._id,
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        role: driver.role,
        driverStatus: driver.driverStatus,
      },
    });
  } catch (error) {
    console.error("REGISTER DRIVER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ===============================
// DRIVER GET PROFILE
// ===============================

export const getDriverProfile = async (req, res) => {
  try {
    const driver = await User.findById(req.user.userId).select("-password");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (driver.role !== "driver") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    console.error("GET DRIVER PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ===============================
// DRIVER UPDATE PROFILE
// ===============================

export const updateDriverProfile = async (req, res) => {
  try {
    const { name, phone, vehicleType, vehicleNumber, vehicleModel } = req.body;

    if (!name || !phone || !vehicleType || !vehicleNumber || !vehicleModel) {
      return res.status(400).json({
        success: false,
        message: "All profile fields are required",
      });
    }

    const driver = await User.findById(req.user.userId);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (driver.role !== "driver") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Check if phone belongs to another user
    const existingPhone = await User.findOne({
      phone,
      _id: { $ne: driver._id },
    });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number already registered",
      });
    }

    driver.name = name;
    driver.phone = phone;
    driver.vehicleType = vehicleType;
    driver.vehicleNumber = vehicleNumber;
    driver.vehicleModel = vehicleModel;

    await driver.save();

    return res.status(200).json({
      success: true,
      message: "Driver profile updated successfully",
      driver: {
        id: driver._id,
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        role: driver.role,
        driverStatus: driver.driverStatus,
        vehicleType: driver.vehicleType,
        vehicleNumber: driver.vehicleNumber,
        vehicleModel: driver.vehicleModel,
      },
    });
  } catch (error) {
    console.error("UPDATE DRIVER PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// ===============================
// ADMIN LOGIN 
// ===============================
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access denied",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: admin._id,
        role: admin.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ===============================
// ADMIN CHECK AUTH
// ===============================
export const checkAdminAuth = async (req, res) => {
  try {
    const admin = await User.findById(req.user.userId).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin authenticated",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("CHECK ADMIN AUTH ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ===============================
// ADMIN GET ALL DRIVERS 
// ===============================
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.find({
      role: "driver",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      drivers,
    });
  } catch (error) {
    console.error("GET ALL DRIVERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ===============================
// ADMIN APPROVE DRIVER
// ===============================
export const approveDriver = async (req, res) => {
  try {
    const { driverId } = req.body;

    if (!driverId) {
      return res.status(400).json({
        success: false,
        message: "Driver ID is required",
      });
    }

    const driver = await User.findById(driverId);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (driver.role !== "driver") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a driver",
      });
    }

    if (driver.driverStatus === "approved") {
      return res.status(400).json({
        success: false,
        message: "Driver is already approved",
      });
    }

    driver.driverStatus = "approved";

    await driver.save();

    return res.status(200).json({
      success: true,
      message: "Driver approved successfully",
      driver: {
        id: driver._id,
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        role: driver.role,
        driverStatus: driver.driverStatus,
        vehicleType: driver.vehicleType,
        vehicleNumber: driver.vehicleNumber,
        vehicleModel: driver.vehicleModel,
      },
    });
  } catch (error) {
    console.error("APPROVE DRIVER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ===============================
// ADMIN REJECT DRIVER
// ===============================
export const rejectDriver = async (req, res) => {
  try {
    const { driverId } = req.body;

    if (!driverId) {
      return res.status(400).json({
        success: false,
        message: "Driver ID is required",
      });
    }

    const driver = await User.findById(driverId);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (driver.role !== "driver") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a driver",
      });
    }

    if (driver.driverStatus === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Driver is already rejected",
      });
    }

    driver.driverStatus = "rejected";

    await driver.save();

    return res.status(200).json({
      success: true,
      message: "Driver rejected successfully",
      driver: {
        id: driver._id,
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        role: driver.role,
        driverStatus: driver.driverStatus,
        vehicleType: driver.vehicleType,
        vehicleNumber: driver.vehicleNumber,
        vehicleModel: driver.vehicleModel,
      },
    });
  } catch (error) {
    console.error("REJECT DRIVER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};