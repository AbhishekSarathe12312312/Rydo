import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  // Get Customer Profile
  const getProfile = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/customer/getProfile`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      if (data.success) {
        setUser(data.user);

        setFormData({
          name: data.user.name || "",
          phone: data.user.phone || "",
        });

        setPreview(data.user.profileImage || "");

        sessionStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("authChanged"));
      }
    } catch (error) {
      console.log("GET PROFILE ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Customer Profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Name and phone are required");
      return;
    }

    try {
      setSaving(true);

      const dataToSend = new FormData();

      dataToSend.append("name", formData.name);
      dataToSend.append("phone", formData.phone);

      if (image) {
        dataToSend.append("profileImage", image);
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/customer/updateProfile`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      if (data.success) {
        setUser(data.user);

        setPreview(data.user.profileImage || "");

        setImage(null);

        setFormData({
          name: data.user.name || "",
          phone: data.user.phone || "",
        });
        sessionStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("authChanged"));

        toast.success(data.message);

        setEditing(false);
      }
    } catch (error) {
      console.log("UPDATE PROFILE ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Cancel Editing
  const handleCancel = () => {
    setEditing(false);

    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
    });

    setImage(null);
    setPreview(user?.profileImage || "");
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-20 text-white">
      <main className="mx-auto max-w-2xl">
        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-xl">
          {/* Top */}
          <div className="mb-5 flex items-center justify-between">
            <button
              onClick={() => navigate("/customer/dashboard")}
              className="text-xs text-gray-400 transition hover:text-white"
            >
              ← Back
            </button>

            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold transition hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Header */}
          <div className="flex items-center gap-4 border-b border-gray-800 pb-5">
            {/* Profile Image */}
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-blue-600">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* User Info */}
            <div>
              <h1 className="text-xl font-bold">{user?.name || "Customer"}</h1>

              <p className="mt-1 text-xs text-gray-400">
                {user?.email || "No email"}
              </p>

              <p className="mt-1 text-xs capitalize text-blue-400">
                {user?.role || "customer"}
              </p>
            </div>
          </div>

          {/* Profile Details / Edit Form */}
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="grid grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs text-gray-400">
                  Full Name
                </label>

                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
                  />
                ) : (
                  <div className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm">
                    {user?.name || "Not available"}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-xs text-gray-400">
                  Phone
                </label>

                {editing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
                  />
                ) : (
                  <div className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm">
                    {user?.phone || "Not available"}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="col-span-2">
                <label className="mb-1.5 block text-xs text-gray-400">
                  Email
                </label>

                <div className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-gray-400">
                  {user?.email || "Not available"}
                </div>

                {editing && (
                  <p className="mt-1 text-[11px] text-gray-500">
                    Email cannot be changed.
                  </p>
                )}
              </div>

              {/* Profile Photo */}
              {editing && (
                <div className="col-span-2">
                  <label className="mb-1.5 block text-xs text-gray-400">
                    Profile Photo
                  </label>

                  <label className="inline-block cursor-pointer rounded-lg bg-gray-800 px-3 py-2 text-xs font-semibold transition hover:bg-gray-700">
                    Change Photo
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Save / Cancel */}
              {editing && (
                <div className="col-span-2 flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CustomerProfile;
