import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DriverRideRequests = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const getRideRequests = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/ride/driver/requests`,
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        setRides(data.rides);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load ride requests",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRideRequests();
  }, []);

  const acceptRide = async (rideId) => {
    try {
      setActionLoading(rideId);

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/ride/driver/accept-ride`,
        {
          rideId,
        },
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        toast.success(data.message);

        setRides((prevRides) =>
          prevRides.filter((ride) => ride._id !== rideId),
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept ride");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Loading ride requests...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/driver/dashboard"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back
          </Link>

          <h1 className="text-2xl font-bold text-blue-500">Rydo</h1>

          <div className="w-10"></div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Ride Requests</h2>

          <p className="mt-2 text-gray-400">
            View available ride requests from customers.
          </p>
        </div>

        {rides.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center">
            <div className="mb-4 text-5xl">🚗</div>

            <h3 className="text-xl font-semibold">No Ride Requests</h3>

            <p className="mt-2 text-gray-400">
              There are currently no available ride requests.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {rides.map((ride) => (
              <div
                key={ride._id}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Customer</p>

                    <h3 className="mt-1 text-lg font-semibold">
                      {ride.customer?.name || "Customer"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {ride.customer?.phone || ""}
                    </p>
                  </div>

                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                    Requested
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-800 p-4">
                    <p className="text-sm text-gray-400">Pickup</p>

                    <p className="mt-1 font-medium">{ride.pickup}</p>
                  </div>

                  <div className="rounded-xl bg-gray-800 p-4">
                    <p className="text-sm text-gray-400">Destination</p>

                    <p className="mt-1 font-medium">{ride.destination}</p>
                  </div>

                  <div className="rounded-xl bg-gray-800 p-4">
                    <p className="text-sm text-gray-400">Vehicle Type</p>

                    <p className="mt-1 font-medium">{ride.vehicleType}</p>
                  </div>

                  <div className="rounded-xl bg-gray-800 p-4">
                    <p className="text-sm text-gray-400">Fare</p>

                    <p className="mt-1 font-medium">₹{ride.fare || 0}</p>
                  </div>
                </div>

                <button
                  onClick={() => acceptRide(ride._id)}
                  disabled={actionLoading === ride._id}
                  className="mt-5 w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {actionLoading === ride._id ? "Accepting..." : "Accept Ride"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DriverRideRequests;
