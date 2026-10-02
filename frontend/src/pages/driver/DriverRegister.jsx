import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const DriverRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleType: "",
    vehicleNumber: "",
    vehicleModel: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
      vehicleType,
      vehicleNumber,
      vehicleModel,
    } = formData;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !vehicleType ||
      !vehicleNumber ||
      !vehicleModel
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/driver/register`,
        {
          name,
          email,
          phone,
          password,
          vehicleType,
          vehicleNumber,
          vehicleModel,
        },
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Driver registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-19">
      <div className="w-full max-w-4xl rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-xl">
        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-white">Driver Registration</h1>

          <p className="mt-1 text-xs text-gray-400">
            Create your driver account and start riding with Rydo
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-blue-500" />

              <div>
                <h2 className="text-base font-semibold text-white">
                  Personal Information
                </h2>

                <p className="text-[11px] text-gray-500">
                  Enter your basic details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-300">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-300">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-300">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-blue-500" />

              <div>
                <h2 className="text-base font-semibold text-white">
                  Vehicle Information
                </h2>

                <p className="text-[11px] text-gray-500">
                  Enter your vehicle details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-300">
                  Vehicle Type
                </label>

                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
                >
                  <option value="">Select vehicle</option>
                  <option value="Bike">Bike</option>
                  <option value="Auto">Auto</option>
                  <option value="Car">Car</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-300">
                  Vehicle Number
                </label>

                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="MP04AB1234"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm uppercase text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-300">
                  Vehicle Model
                </label>

                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="e.g. Honda Activa"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register as Driver"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-blue-500 hover:text-blue-400"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default DriverRegister;
