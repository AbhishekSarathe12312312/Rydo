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

  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [driverStatus, setDriverStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // GET DRIVER PROFILE
  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/driver/get-profile`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
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

        setProfileImage(driver.profileImage || "");
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

  // IMAGE SELECT
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Image type validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    // Image size validation - 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setSelectedImage(file);

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);
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

      const dataToSend = new FormData();

      dataToSend.append("name", name);
      dataToSend.append("phone", phone);
      dataToSend.append("vehicleType", vehicleType);
      dataToSend.append("vehicleNumber", vehicleNumber);
      dataToSend.append("vehicleModel", vehicleModel);

      if (selectedImage) {
        dataToSend.append("profileImage", selectedImage);
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/driver/update-profile`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
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

        setProfileImage(updatedDriver.profileImage || "");
        setSelectedImage(null);
        setDriverStatus(updatedDriver.driverStatus || "");

        // Update sessionStorage user
        const currentUser = JSON.parse(
          sessionStorage.getItem("user") || "null",
        );

        if (currentUser) {
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              ...currentUser,
              name: updatedDriver.name,
              phone: updatedDriver.phone,
              profileImage: updatedDriver.profileImage,
            }),
          );

          window.dispatchEvent(new Event("authChanged"));
        }
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
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      {/* Width max-w-6xl hi rakhi hai, vertical padding py-3 se badhakar py-6 ki hai */}
      <main className="mx-auto w-full max-w-6xl px-5 py-20">
        {/* Form padding p-3 se badhakar p-5 ki hai taaki vertical space mile */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-xl"
        >
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/driver/dashboard")}
            className="absolute left-5 top-5 rounded-md px-2 py-1 text-xs text-gray-400 transition hover:bg-gray-800 hover:text-white"
          >
            ← Back
          </button>

          {/* Header - vertical space badhane ke liye pt-6 aur mb-5 kiya */}
          <div className="mb-5 pt-6 text-center">
            <h1 className="text-xl font-bold text-blue-500 inline-block mr-2">
              Rydo
            </h1>
            <h2 className="text-xl font-bold inline-block border-l border-gray-700 pl-2">
              Driver Profile
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Manage your personal and vehicle information.
            </p>
          </div>

          {/* Personal Information Section */}
          <div className="grid gap-5 md:grid-cols-[140px_1fr]">
            {/* Profile Image */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="flex h-18 w-18 items-center justify-center overflow-hidden rounded-full border-2 border-gray-700 bg-gray-800">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-500">
                      {formData.name?.charAt(0)?.toUpperCase() || "D"}
                    </span>
                  )}
                </div>

                <label className="absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-xs text-white shadow-lg transition hover:bg-blue-700">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="mt-1.5 text-center text-[10px] text-gray-500">
                Change photo
              </p>
            </div>

            {/* Personal Information Inputs */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-300">
                Personal Information
              </h3>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-[11px] text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Driver Name"
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-gray-400">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider space my-3 se badhakar my-4.5 kiya */}
          <div className="my-4.5 border-t border-gray-800"></div>

          {/* Vehicle Information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-300">
              Vehicle Information
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-[11px] text-gray-400">
                  Vehicle Type
                </label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option value="">Select Vehicle</option>
                  <option value="Bike">Bike</option>
                  <option value="Auto">Auto</option>
                  <option value="Car">Car</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-gray-400">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="MP04 AB 1234"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white uppercase outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-gray-400">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="Vehicle Model"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="my-4.5 border-t border-gray-800"></div>

          {/* Verification Status & Save Button Grid */}
          <div className="grid gap-4 md:grid-cols-[1fr_220px] items-center">
            <div
              className={`flex items-center justify-between rounded-lg border ${statusDetails.borderClass} bg-gray-900 p-3`}
            >
              <div>
                <h4 className="text-xs font-semibold">Verification Status</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {statusDetails.message}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusDetails.statusClass}`}
              >
                {statusDetails.status}
              </span>
            </div>

            {/* Save Button padding badha di */}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 h-full max-h-[46px]"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DriverProfile;
