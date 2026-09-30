import React from "react";
import VerifyOTP from "./pages/auth/VerifyOTP";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import DriverRegister from "./pages/driver/DriverRegister";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import BookRide from "./pages/customer/BookRide";
import MyRides from "./pages/customer/MyRides";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverProfile from "./pages/driver/DriverProfile";
import DriverRideRequests from "./pages/driver/DriverRideRequests";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageDrivers from "./pages/admin/ManageDrivers";
import DriverRides from "./pages/driver/DriverRides";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />

        {/* Customer */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/book-ride" element={<BookRide />} />
        <Route path="/customer/rides" element={<MyRides />} />

        {/* Driver Auth */}
        <Route path="/driver/register" element={<DriverRegister />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/profile" element={<DriverProfile />} />
        <Route path="/driver/ride-requests" element={<DriverRideRequests />} />
        <Route path="/driver/rides" element={<DriverRides />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/drivers" element={<ManageDrivers />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
