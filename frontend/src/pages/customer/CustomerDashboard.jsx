import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-500">Rydo</h1>

          <button
            onClick={() => navigate("/customer/profile")}
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800"
          >
            Profile
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Welcome to Rydo 👋</h2>

          <p className="mt-2 text-gray-400">
            Book a ride and reach your destination safely.
          </p>
        </div>

        {/* Book Ride Card */}
        <div className="max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
          <h3 className="mb-6 text-xl font-semibold">
            Where do you want to go?
          </h3>

          <div className="space-y-4">
            {/* Pickup */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Pickup Location
              </label>

              <input
                type="text"
                placeholder="Enter pickup location"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Destination
              </label>

              <input
                type="text"
                placeholder="Enter destination"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            <button
              onClick={() => navigate("/customer/book-ride")}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700"
            >
              Book a Ride
            </button>
          </div>
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
            onClick={() => navigate("/customer/rides")}
            className="cursor-pointer rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500"
          >
            <h3 className="text-lg font-semibold">📋 My Rides</h3>

            <p className="mt-2 text-sm text-gray-400">
              View your previous and active rides.
            </p>
          </div>

          <div
            onClick={() => navigate("/customer/profile")}
            className="cursor-pointer rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500"
          >
            <h3 className="text-lg font-semibold">👤 My Profile</h3>

            <p className="mt-2 text-sm text-gray-400">
              Manage your account information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
