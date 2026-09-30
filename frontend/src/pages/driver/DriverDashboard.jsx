import { Link } from "react-router-dom";

const DriverDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-500">Rydo</h1>

          <span className="text-sm text-gray-400">Driver Dashboard</span>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Driver Dashboard 👋</h2>

          <p className="mt-2 text-gray-400">
            Manage your rides and driver account.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Ride Requests */}
          <Link
            to="/driver/ride-requests"
            className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              🚗
            </div>

            <h3 className="text-lg font-semibold">Ride Requests</h3>

            <p className="mt-2 text-sm text-gray-400">
              View available customer ride requests.
            </p>
          </Link>

          {/* My Rides */}
          <Link
            to="/driver/rides"
            className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-2xl">
              📋
            </div>

            <h3 className="text-lg font-semibold">My Rides</h3>

            <p className="mt-2 text-sm text-gray-400">
              View your accepted and completed rides.
            </p>
          </Link>

          {/* Profile */}
          <Link
            to="/driver/profile"
            className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
              👤
            </div>

            <h3 className="text-lg font-semibold">My Profile</h3>

            <p className="mt-2 text-sm text-gray-400">
              View and update your driver profile.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
