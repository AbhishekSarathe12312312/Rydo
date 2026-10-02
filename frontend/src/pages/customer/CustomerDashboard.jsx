import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-18">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Welcome to Rydo 👋</h2>

          <p className="mt-2 text-gray-400">
            Book a ride and reach your destination safely.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            onClick={() => navigate("/customer/book-ride")}
            className="cursor-pointer rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500"
          >
            <h3 className="text-lg font-semibold">🚗 Book Ride</h3>

            <p className="mt-2 text-sm text-gray-400">
              Find a driver and book your ride.
            </p>
          </div>

          <div
            onClick={() => navigate("/customer/my-rides")}
            className="cursor-pointer rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500"
          >
            <h3 className="text-lg font-semibold">📋 My Rides</h3>

            <p className="mt-2 text-sm text-gray-400">
              View your previous and active rides.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
