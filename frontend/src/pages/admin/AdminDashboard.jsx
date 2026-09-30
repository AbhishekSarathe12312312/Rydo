import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAdminAuth = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/user/admin/check",
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        setAdmin(data.admin);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Admin authentication failed",
      );

      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Checking admin access...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-500">Rydo</h1>
          </div>

          <div className="text-right">
            <p className="font-medium">{admin?.name}</p>

            <p className="text-sm text-gray-400">{admin?.email}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Admin Dashboard 👋</h2>

          <p className="mt-2 text-gray-400">
            Manage drivers, customers and rides.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Manage Drivers */}
          <Link
            to="/admin/drivers"
            className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              🚗
            </div>

            <h3 className="text-lg font-semibold">Manage Drivers</h3>

            <p className="mt-2 text-sm text-gray-400">
              Approve or reject driver registrations.
            </p>
          </Link>

          {/* Manage Customers */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-2xl">
              👥
            </div>

            <h3 className="text-lg font-semibold">Manage Customers</h3>

            <p className="mt-2 text-sm text-gray-400">
              View registered customers.
            </p>
          </div>

          {/* Manage Rides */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
              📋
            </div>

            <h3 className="text-lg font-semibold">Manage Rides</h3>

            <p className="mt-2 text-sm text-gray-400">
              View and manage all rides.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
