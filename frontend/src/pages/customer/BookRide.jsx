import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const vehicleRates = {
  Bike: 8,
  Auto: 12,
  Car: 15,
};

const BookRide = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    vehicleType: "Bike",
    distance: "",
  });

  const [fare, setFare] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
       Input Change
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "distance" || name === "vehicleType") {
      setFare(null);
    }
  };

  /* =========================
       Calculate Fare
  ========================= */

  const handleCalculateFare = () => {
    if (!formData.pickup.trim()) {
      toast.error("Please enter pickup location");
      return;
    }

    if (!formData.destination.trim()) {
      toast.error("Please enter destination");
      return;
    }

    const distance = Number(formData.distance);

    if (!distance || distance <= 0) {
      toast.error("Please enter a valid distance");
      return;
    }

    const calculatedFare = distance * vehicleRates[formData.vehicleType];

    setFare(Number(calculatedFare.toFixed(2)));

    toast.success("Fare calculated");
  };

  /* =========================
          Create Ride
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pickup.trim()) {
      toast.error("Please enter pickup location");
      return;
    }

    if (!formData.destination.trim()) {
      toast.error("Please enter destination");
      return;
    }

    const distance = Number(formData.distance);

    if (!distance || distance <= 0) {
      toast.error("Please enter a valid distance");
      return;
    }

    if (fare === null) {
      toast.error("Please calculate fare first");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ride/create-ride`,
        {
          pickup: formData.pickup.trim(),
          destination: formData.destination.trim(),
          vehicleType: formData.vehicleType,
          distance,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        navigate("/customer/my-rides");
      }
    } catch (error) {
      console.error("BOOK RIDE ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to book ride");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="mx-auto max-w-3xl px-6 py-18">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Book a Ride</h1>

            <p className="mt-1 text-sm text-gray-400">
              Enter your pickup, destination and distance.
            </p>
          </div>

          <button
            onClick={() => navigate("/customer/dashboard")}
            className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
          >
            ← Back
          </button>
        </div>

        {/* Card */}

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pickup */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Pickup Location
              </label>

              <input
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                placeholder="Enter pickup location"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            {/* Destination */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Destination
              </label>

              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Enter destination"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            {/* Distance */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Distance (km)
              </label>

              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                placeholder="Enter distance in km"
                min="0.1"
                step="0.1"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
              />

              <p className="mt-1 text-xs text-gray-500">
                Enter the approximate distance between pickup and destination.
              </p>
            </div>

            {/* Vehicle */}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Choose Vehicle
              </label>

              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="Bike">Bike - ₹8/km</option>
                <option value="Auto">Auto - ₹12/km</option>
                <option value="Car">Car - ₹15/km</option>
              </select>
            </div>

            {/* Calculate */}

            <button
              type="button"
              onClick={handleCalculateFare}
              disabled={loading}
              className="w-full rounded-lg border border-blue-600 bg-blue-600/10 py-3 font-semibold text-blue-400 transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Calculate Fare
            </button>

            {/* Summary */}

            <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
              <h3 className="mb-4 font-semibold">Ride Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Pickup</span>

                  <span className="max-w-[60%] text-right">
                    {formData.pickup || "Not entered"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Destination</span>

                  <span className="max-w-[60%] text-right">
                    {formData.destination || "Not entered"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle</span>

                  <span>{formData.vehicleType}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Rate</span>

                  <span>₹{vehicleRates[formData.vehicleType]}/km</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Distance</span>

                  <span className="font-semibold">
                    {formData.distance
                      ? `${formData.distance} km`
                      : "Not entered"}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-700 pt-3">
                  <span className="font-medium text-gray-300">
                    Estimated Fare
                  </span>

                  <span className="text-lg font-semibold text-blue-400">
                    {fare !== null ? `₹${fare}` : "Not calculated"}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm */}

            <button
              type="submit"
              disabled={
                loading ||
                !formData.pickup.trim() ||
                !formData.destination.trim() ||
                !formData.distance ||
                fare === null
              }
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm Ride"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BookRide;
