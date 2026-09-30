import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyRides = () => {
  const navigate = useNavigate();

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRides = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/ride/my-rides",
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        setRides(data.rides);
      }
    } catch (error) {
      console.error(
        "FETCH MY RIDES ERROR:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRides();
  }, []);

  const getStatusDetails = (status) => {
    switch (status) {
      case "requested":
        return {
          label: "Waiting for Driver",
          className: "bg-yellow-500/10 text-yellow-400",
        };

      case "accepted":
        return {
          label: "Driver Accepted",
          className: "bg-blue-500/10 text-blue-400",
        };

      case "ongoing":
        return {
          label: "Ride Ongoing",
          className: "bg-green-500/10 text-green-400",
        };

      case "completed":
        return {
          label: "Ride Completed",
          className: "bg-purple-500/10 text-purple-400",
        };

      case "cancelled":
        return {
          label: "Ride Cancelled",
          className: "bg-red-500/10 text-red-400",
        };

      default:
        return {
          label: status,
          className: "bg-gray-500/10 text-gray-400",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <p className="text-gray-400">Loading your rides...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/customer/dashboard")}
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Dashboard
          </button>

          <h1 className="text-2xl font-bold text-blue-500">My Rides</h1>

          <div className="w-16"></div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {rides.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center">
            <div className="mb-4 text-5xl">🚗</div>

            <h2 className="text-xl font-semibold">No rides found</h2>

            <p className="mt-2 text-gray-400">
              You haven't booked any rides yet.
            </p>

            <button
              onClick={() => navigate("/customer/book-ride")}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Book a Ride
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {rides.map((ride) => {
              const statusDetails = getStatusDetails(ride.status);

              return (
                <div
                  key={ride._id}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg"
                >
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {ride.vehicleType} Ride
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(ride.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${statusDetails.className}`}
                    >
                      {statusDetails.label}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="rounded-xl bg-gray-800 p-4">
                      <p className="text-xs font-medium text-gray-500">
                        PICKUP
                      </p>

                      <p className="mt-1 text-gray-200">{ride.pickup}</p>
                    </div>

                    <div className="rounded-xl bg-gray-800 p-4">
                      <p className="text-xs font-medium text-gray-500">
                        DESTINATION
                      </p>

                      <p className="mt-1 text-gray-200">{ride.destination}</p>
                    </div>
                  </div>

                  {/* Ride Information */}
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-gray-800 p-4">
                      <p className="text-xs text-gray-500">FARE</p>

                      <p className="mt-1 font-semibold">₹{ride.fare || 0}</p>
                    </div>

                    <div className="rounded-xl bg-gray-800 p-4">
                      <p className="text-xs text-gray-500">VEHICLE</p>

                      <p className="mt-1 text-gray-300">{ride.vehicleType}</p>
                    </div>

                    <div className="rounded-xl bg-gray-800 p-4">
                      <p className="text-xs text-gray-500">STATUS</p>

                      <p className="mt-1 capitalize text-gray-300">
                        {ride.status}
                      </p>
                    </div>
                  </div>

                  {/* Driver Details */}
                  {ride.driver ? (
                    <div className="mt-5 rounded-xl border border-gray-800 bg-gray-800/50 p-5">
                      <p className="text-sm font-medium text-gray-400">
                        Driver Details
                      </p>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs text-gray-500">DRIVER NAME</p>

                          <p className="mt-1 font-medium text-white">
                            {ride.driver.name}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">PHONE</p>

                          <p className="mt-1 font-medium text-white">
                            {ride.driver.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                      <p className="text-sm text-yellow-400">
                        Waiting for a driver to accept your ride...
                      </p>
                    </div>
                  )}

                  {/* Ride ID */}
                  <div className="mt-5 border-t border-gray-800 pt-4">
                    <p className="text-xs text-gray-500">Ride ID</p>

                    <p className="mt-1 break-all text-sm text-gray-500">
                      {ride._id}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyRides;
