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
        `${import.meta.env.VITE_API_URL}/api/ride/my-rides`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <button
            onClick={() => navigate("/customer/dashboard")}
            className="text-xs text-gray-400 transition hover:text-white"
          >
            ← Dashboard
          </button>

          <h1 className="text-xl font-bold text-blue-500">My Rides</h1>

          <div className="w-14"></div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {rides.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
            <div className="mb-3 text-4xl">🚗</div>

            <h2 className="text-lg font-semibold">No rides found</h2>

            <p className="mt-2 text-sm text-gray-400">
              You haven't booked any rides yet.
            </p>

            <button
              onClick={() => navigate("/customer/book-ride")}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-700"
            >
              Book a Ride
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {rides.map((ride) => {
              const statusDetails = getStatusDetails(ride.status);

              return (
                <div
                  key={ride._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-md transition hover:border-gray-700"
                >
                  {/* Left: Icon & Details */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-800 text-xl">
                      🚗
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-white truncate">
                          {ride.vehicleType} Ride
                        </h2>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusDetails.className}`}
                        >
                          {statusDetails.label}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-gray-300 truncate">
                        <span className="text-gray-500 font-medium">From:</span>{" "}
                        {ride.pickup}
                      </p>
                      <p className="text-xs text-gray-300 truncate">
                        <span className="text-gray-500 font-medium">To:</span>{" "}
                        {ride.destination}
                      </p>

                      <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-400">
                        <span>{new Date(ride.createdAt).toLocaleString()}</span>
                        <span>•</span>
                        <span>{ride.distance || 0} km</span>
                        {ride.driver && (
                          <>
                            <span>•</span>
                            <span className="text-blue-400">
                              Driver: {ride.driver.name} ({ride.driver.phone})
                            </span>
                          </>
                        )}
                      </div>

                      {!ride.driver && (
                        <p className="mt-1 text-[11px] text-yellow-400">
                          Waiting for a driver to accept your ride...
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Fare & ID */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-800 gap-1">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] text-gray-500 uppercase">
                        Fare
                      </p>
                      <p className="text-lg font-bold text-white">
                        ₹{ride.fare || 0}
                      </p>
                    </div>

                    <p className="text-[10px] text-gray-600 truncate max-w-[140px]">
                      ID: {ride._id}
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
