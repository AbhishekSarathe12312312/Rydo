import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const getAllDrivers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/admin/drivers`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      if (data.success) {
        setDrivers(data.drivers);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load drivers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  const approveDriver = async (driverId) => {
    try {
      setActionLoading(driverId);

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/admin/driver/approve`,
        {
          driverId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        setDrivers((prevDrivers) =>
          prevDrivers.map((driver) =>
            driver._id === driverId
              ? {
                  ...driver,
                  driverStatus: "approved",
                }
              : driver,
          ),
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve driver");
    } finally {
      setActionLoading(null);
    }
  };

  const rejectDriver = async (driverId) => {
    try {
      setActionLoading(driverId);

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/admin/driver/reject`,
        {
          driverId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        setDrivers((prevDrivers) =>
          prevDrivers.map((driver) =>
            driver._id === driverId
              ? {
                  ...driver,
                  driverStatus: "rejected",
                }
              : driver,
          ),
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject driver");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusDetails = (status) => {
    if (status === "approved") {
      return {
        text: "Approved",
        className: "bg-green-500/10 text-green-400",
      };
    }

    if (status === "rejected") {
      return {
        text: "Rejected",
        className: "bg-red-500/10 text-red-400",
      };
    }

    return {
      text: "Pending",
      className: "bg-yellow-500/10 text-yellow-400",
    };
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Loading drivers...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/admin/dashboard"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back
          </Link>

          <h1 className="text-2xl font-bold text-blue-500">Rydo</h1>

          <div className="w-10"></div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Manage Drivers</h2>

          <p className="mt-2 text-gray-400">
            Review and manage registered drivers.
          </p>
        </div>

        {drivers.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center">
            <div className="mb-4 text-5xl">🚗</div>

            <h3 className="text-xl font-semibold">No Drivers Found</h3>

            <p className="mt-2 text-gray-400">No driver has registered yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="border-b border-gray-800 bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Driver
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Vehicle
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {drivers.map((driver) => {
                    const status = getStatusDetails(driver.driverStatus);

                    return (
                      <tr
                        key={driver._id}
                        className="border-b border-gray-800 last:border-b-0"
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-semibold">{driver.name}</p>

                            <p className="mt-1 text-sm text-gray-500">
                              {driver.email}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm">{driver.phone}</p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm">{driver.vehicleType || "-"}</p>

                          <p className="mt-1 text-sm text-gray-500">
                            {driver.vehicleNumber || "-"}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
                          >
                            {status.text}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          {driver.driverStatus === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => approveDriver(driver._id)}
                                disabled={actionLoading === driver._id}
                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {actionLoading === driver._id
                                  ? "Processing..."
                                  : "Approve"}
                              </button>

                              <button
                                onClick={() => rejectDriver(driver._id)}
                                disabled={actionLoading === driver._id}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {actionLoading === driver._id
                                  ? "Processing..."
                                  : "Reject"}
                              </button>
                            </div>
                          )}

                          {driver.driverStatus === "approved" && (
                            <span className="text-sm text-green-400">
                              Driver Approved
                            </span>
                          )}

                          {driver.driverStatus === "rejected" && (
                            <span className="text-sm text-red-400">
                              Driver Rejected
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageDrivers;
