import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookRide = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    vehicleType: "Bike",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pickup || !formData.destination) {
      alert("Please enter pickup and destination");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ride/create-ride`,
        {
          pickup: formData.pickup,
          destination: formData.destination,
          vehicleType: formData.vehicleType,
        },
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        alert(data.message);

        navigate("/customer/rides");
      }
    } catch (error) {
      console.log("BOOK RIDE ERROR:", error);
      console.log("RESPONSE:", error.response?.data);
      alert(error.response?.data?.message || "Failed to book ride");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/customer/dashboard")}
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold text-blue-500">Rydo</h1>

          <div className="w-10"></div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Book a Ride</h2>

          <p className="mt-2 text-gray-400">
            Enter your pickup and destination details.
          </p>
        </div>

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
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
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
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Vehicle Type */}
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
                <option value="Bike">Bike</option>
                <option value="Auto">Auto</option>
                <option value="Car">Car</option>
              </select>
            </div>

            {/* Ride Summary */}
            <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
              <h3 className="mb-3 font-semibold">Ride Summary</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Pickup</span>

                  <span className="max-w-[60%] text-right">
                    {formData.pickup || "Not selected"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Destination</span>

                  <span className="max-w-[60%] text-right">
                    {formData.destination || "Not selected"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle</span>

                  <span>{formData.vehicleType}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700"
            >
              Confirm Ride
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BookRide;
