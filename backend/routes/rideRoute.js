import express from "express";

import {
  acceptRide,
  completeRide,
  createRide,
  getDriverAcceptedRides,
  getDriverRideRequests,
  getMyRides,
  startRide,
} from "../controllers/rideController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// customer
router.post("/create-ride", authMiddleware, createRide);
router.get("/my-rides", authMiddleware, getMyRides);

//driver
router.get("/driver/requests", authMiddleware, getDriverRideRequests);
router.put("/driver/accept-ride", authMiddleware, acceptRide);
router.get("/driver/my-AcceptedRides", authMiddleware, getDriverAcceptedRides);
router.put("/driver/start-ride", authMiddleware, startRide);
router.put("/driver/complete-ride", authMiddleware, completeRide);

export default router;
