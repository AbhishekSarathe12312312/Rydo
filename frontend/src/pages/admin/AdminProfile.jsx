import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const getAdminProfile = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/admin/getProfile`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      if (data.success) {
        setFormData({
          name: data.admin.name || "",
          email: data.admin.email || "",
          phone: data.admin.phone || "",
        });

        setProfileImage(data.admin.profileImage || "");

        sessionStorage.setItem("user", JSON.stringify(data.admin));
        window.dispatchEvent(new Event("authChanged"));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load admin profile",
      );
    }
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const dataToSend = new FormData();

      dataToSend.append("name", formData.name);
      dataToSend.append("phone", formData.phone);

      if (selectedImage) {
        dataToSend.append("profileImage", selectedImage);
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/admin/updateProfile`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      if (data.success) {
        setFormData({
          name: data.admin.name || "",
          email: data.admin.email || "",
          phone: data.admin.phone || "",
        });

        setProfileImage(data.admin.profileImage || "");
        setSelectedImage(null);

        sessionStorage.setItem("user", JSON.stringify(data.admin));
        window.dispatchEvent(new Event("authChanged"));

        toast.success(data.message);
        setEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="mx-auto max-w-3xl px-4 py-18">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-xl border border-gray-800 bg-gray-900 px-4 pb-5 pt-4 shadow-xl"
        >
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="absolute left-3 top-3 rounded-md px-2.5 py-1.5 text-xs text-gray-400 transition hover:bg-gray-800 hover:text-white"
          >
            ← Back
          </button>

          <div className="mb-6 pt-8 text-center">
            <h1 className="text-lg font-bold text-blue-500">Rydo</h1>

            <h2 className="mt-1 text-xl font-bold">Admin Profile</h2>

            <p className="mt-1 text-xs text-gray-400">
              Manage your personal information.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-[145px_1fr]">
            {/* Profile Image */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-gray-700 bg-gray-800">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Admin Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-gray-500">
                      {formData.name?.charAt(0)?.toUpperCase() || "A"}
                    </span>
                  )}
                </div>

                {editing && (
                  <label className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-xs text-white shadow-lg transition hover:bg-blue-700">
                    +
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {editing && (
                <p className="mt-2 text-[11px] text-gray-500">Change photo</p>
              )}
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="mb-3 text-base font-semibold">
                Personal Information
              </h3>

              <div className="grid gap-3.5">
                <div>
                  <label className="mb-1.5 block text-[11px] text-gray-400">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] text-gray-400">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] text-gray-400">
                    Email
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            {!editing ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold transition hover:bg-blue-700"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setSelectedImage(null);
                    getAdminProfile();
                  }}
                  className="w-1/2 rounded-lg border border-gray-700 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-gray-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-1/2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminProfile;
