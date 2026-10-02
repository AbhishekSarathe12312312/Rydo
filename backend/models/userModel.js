import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["customer", "driver", "admin"],
      default: "customer",
    },
    profileImage: {
      type: String,
      default: "",
    },

    driverStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: null,
    },

    vehicleType: {
      type: String,
      enum: ["Bike", "Auto", "Car"],
      default: null,
    },

    vehicleNumber: {
      type: String,
      default: "",
      trim: true,
    },

    vehicleModel: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
