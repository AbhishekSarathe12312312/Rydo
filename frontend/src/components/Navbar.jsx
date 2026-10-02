import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Car, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Get logged-in user from sessionStorage
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  });

  const role = user?.role;

  // Sync user after login/logout
  useEffect(() => {
    const syncUser = () => {
      const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");

      setUser(storedUser);
    };

    window.addEventListener("authChanged", syncUser);

    return () => {
      window.removeEventListener("authChanged", syncUser);
    };
  }, []);

  // Navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    setUser(null);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur-md transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <Car size={20} className="text-white" />
          </div>

          <span className="text-2xl font-bold text-white">Rydo</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {/* Customer */}
          {role === "customer" && (
            <>
              <Link
                to="/"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive("/")
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Home
              </Link>

              <Link
                to="/customer/dashboard"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive("/customer/dashboard")
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/customer/book-ride"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive("/customer/book-ride")
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Book Ride
              </Link>

              <Link
                to="/customer/my-rides"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive("/customer/my-rides")
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                My Rides
              </Link>
            </>
          )}

          {/* Driver */}
          {role === "driver" && (
            <>
              <Link
                to="/driver/dashboard"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive("/driver/dashboard")
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/driver/ride-requests"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive("/driver/ride-requests")
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Ride Requests
              </Link>

              <Link
                to="/driver/my-rides"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive("/driver/my-rides")
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                My Rides
              </Link>
            </>
          )}

          {/* Admin */}
          {role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive("/admin/dashboard")
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/admin/drivers"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive("/admin/drivers")
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Drivers
              </Link>
            </>
          )}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3">
          {user && (
            <div
              className={`flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 ${
                role === "customer" || role === "driver" || role === "admin"
                  ? "cursor-pointer"
                  : ""
              }`}
              onClick={() => {
                if (role === "customer") {
                  navigate("/customer/profile");
                } else if (role === "driver") {
                  navigate("/driver/profile");
                } else if (role === "admin") {
                  navigate("/admin/profile");
                }
              }}
            >
              {/* Profile Image */}
              <div className="h-9 w-9 overflow-hidden rounded-full bg-blue-600">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="leading-tight">
                <p className="text-sm font-medium text-white">
                  {user.name || "User"}
                </p>

                <p className="text-xs capitalize text-gray-400">{role}</p>
              </div>
            </div>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}

          {/* Login */}
          {!user && (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
