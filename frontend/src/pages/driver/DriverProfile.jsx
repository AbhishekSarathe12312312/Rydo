import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const DriverProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    vehicleNumber: "",
    vehicleModel: "",
  });

  const [driverStatus, setDriverStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // GET DRIVER PROFILE
  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/driver/get-profile`,
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        const driver = data.driver;

        setFormData({
          name: driver.name || "",
          email: driver.email || "",
          phone: driver.phone || "",
          vehicleType: driver.vehicleType || "",
          vehicleNumber: driver.vehicleNumber || "",
          vehicleModel: driver.vehicleModel || "",
        });

        setDriverStatus(driver.driverStatus || "");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE DRIVER PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, vehicleType, vehicleNumber, vehicleModel } = formData;

    if (!name || !phone || !vehicleType || !vehicleNumber || !vehicleModel) {
      toast.error("Please fill all profile fields");
      return;
    }

    try {
      setSaving(true);

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/driver/update-profile`,
        {
          name,
          phone,
          vehicleType,
          vehicleNumber,
          vehicleModel,
        },
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        toast.success(data.message);

        const updatedDriver = data.driver;

        setFormData({
          name: updatedDriver.name || "",
          email: updatedDriver.email || "",
          phone: updatedDriver.phone || "",
          vehicleType: updatedDriver.vehicleType || "",
          vehicleNumber: updatedDriver.vehicleNumber || "",
          vehicleModel: updatedDriver.vehicleModel || "",
        });

        setDriverStatus(updatedDriver.driverStatus || "");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const getStatusDetails = () => {
    if (driverStatus === "approved") {
      return {
        message: "Your driver account has been approved.",
        status: "Approved",
        statusClass: "bg-green-500/10 text-green-400",
        borderClass: "border-green-900/50",
      };
    }

    if (driverStatus === "rejected") {
      return {
        message: "Your driver account has been rejected.",
        status: "Rejected",
        statusClass: "bg-red-500/10 text-red-400",
        borderClass: "border-red-900/50",
      };
    }

    return {
      message: "Your account is waiting for admin approval.",
      status: "Pending",
      statusClass: "bg-yellow-500/10 text-yellow-400",
      borderClass: "border-yellow-900/50",
    };
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Loading profile...
      </div>
    );
  }

  const statusDetails = getStatusDetails();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/driver/dashboard")}
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold text-blue-500">Rydo</h1>

          <div className="w-10"></div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Driver Profile</h2>

          <p className="mt-2 text-gray-400">
            Manage your personal and vehicle information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl"
        >
          <h3 className="mb-6 text-xl font-semibold">Personal Information</h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Driver Name"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-gray-400">Email</label>

              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-gray-500 outline-none"
              />
            </div>
          </div>

          <div className="my-8 border-t border-gray-800"></div>

          <h3 className="mb-6 text-xl font-semibold">Vehicle Information</h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Vehicle Type
              </label>

              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="">Select Vehicle</option>

                <option value="Bike">Bike</option>
                <option value="Auto">Auto</option>
                <option value="Car">Car</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Vehicle Number
              </label>

              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="MP04 AB 1234"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white uppercase outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-gray-400">
                Vehicle Model
              </label>

              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                placeholder="Enter vehicle model"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="my-8 border-t border-gray-800"></div>

          {/* Verification Status */}
          <div
            className={`flex items-center justify-between rounded-xl border ${statusDetails.borderClass} bg-gray-900 p-4`}
          >
            <div>
              <h4 className="font-semibold">Verification Status</h4>

              <p className="mt-1 text-sm text-gray-400">
                {statusDetails.message}
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${statusDetails.statusClass}`}
            >
              {statusDetails.status}
            </span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default DriverProfile;
