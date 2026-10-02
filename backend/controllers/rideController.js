import Ride from "../models/rideModel.js";
import User from "../models/userModel.js";

// customer
export const createRide = async (req, res) => {
  try {
    const { pickup, destination, vehicleType, distance } = req.body;

    if (!pickup || !destination || !vehicleType || !distance) {
      return res.status(400).json({
        success: false,
        message: "All ride details are required",
      });
    }

    const vehicleRates = {
      Bike: 8,
      Auto: 12,
      Car: 15,
    };

    const rate = vehicleRates[vehicleType];

    if (!rate) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle type",
      });
    }

    const fare = distance * rate;

    const ride = await Ride.create({
      customer: req.user.userId,
      pickup,
      destination,
      vehicleType,
      distance,
      fare,
    });

    return res.status(201).json({
      success: true,
      message: "Ride requested successfully",
      ride,
    });
  } catch (error) {
    console.error("CREATE RIDE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      customer: req.user.userId,
    })
      .populate("driver", "name phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rides,
    });
  } catch (error) {
    console.error("GET MY RIDES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//driver
export const getDriverRideRequests = async (req, res) => {
  try {
    const rides = await Ride.find({
      status: "requested",
      driver: null,
    })
      .populate("customer", "name phone profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rides,
    });
  } catch (error) {
    console.error("GET DRIVER RIDE REQUESTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const acceptRide = async (req, res) => {
  try {
    const { rideId } = req.body;

    if (!rideId) {
      return res.status(400).json({
        success: false,
        message: "Ride ID is required",
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
        message: "Only drivers can accept rides",
      });
    }

    if (driver.driverStatus !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Your driver account is not approved",
      });
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    if (ride.status !== "requested") {
      return res.status(400).json({
        success: false,
        message: "Ride is no longer available",
      });
    }

    if (ride.driver) {
      return res.status(400).json({
        success: false,
        message: "Ride has already been accepted",
      });
    }

    ride.driver = driver._id;
    ride.status = "accepted";

    await ride.save();

    return res.status(200).json({
      success: true,
      message: "Ride accepted successfully",
      ride,
    });
  } catch (error) {
    console.error("ACCEPT RIDE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
export const getDriverAcceptedRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      driver: req.user.userId,
    })
      .populate("customer", "name phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rides,
    });
  } catch (error) {
    console.error("GET DRIVER ACCEPTED RIDES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const startRide = async (req, res) => {
  try {
    const { rideId } = req.body;

    if (!rideId) {
      return res.status(400).json({
        success: false,
        message: "Ride ID is required",
      });
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // Check that this ride belongs to the logged-in driver
    if (!ride.driver || ride.driver.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this ride",
      });
    }

    // Ride must be accepted before starting
    if (ride.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Ride cannot be started",
      });
    }

    ride.status = "ongoing";

    await ride.save();

    return res.status(200).json({
      success: true,
      message: "Ride started successfully",
      ride,
    });
  } catch (error) {
    console.error("START RIDE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const completeRide = async (req, res) => {
  try {
    const { rideId } = req.body;

    if (!rideId) {
      return res.status(400).json({
        success: false,
        message: "Ride ID is required",
      });
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // Check that this ride belongs to the logged-in driver
    if (!ride.driver || ride.driver.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this ride",
      });
    }

    // Ride must be ongoing before completing
    if (ride.status !== "ongoing") {
      return res.status(400).json({
        success: false,
        message: "Ride cannot be completed",
      });
    }

    ride.status = "completed";

    await ride.save();

    return res.status(200).json({
      success: true,
      message: "Ride completed successfully",
      ride,
    });
  } catch (error) {
    console.error("COMPLETE RIDE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
