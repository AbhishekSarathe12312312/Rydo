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
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageDrivers from "./pages/admin/AdminDrivers";
import DriverRides from "./pages/driver/DriverRides";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerProfile from "./pages/customer/CustomerProfile";
import AdminProfile from "./pages/admin/AdminProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />

        {/* Customer */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/book-ride"
          element={
            <ProtectedRoute role="customer">
              <BookRide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/my-rides"
          element={
            <ProtectedRoute role="customer">
              <MyRides />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute role="customer">
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

        {/* Driver Auth */}
        <Route path="/driver/register" element={<DriverRegister />} />
        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoute role="driver">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/profile"
          element={
            <ProtectedRoute role="driver">
              <DriverProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/ride-requests"
          element={
            <ProtectedRoute role="driver">
              <DriverRideRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/my-rides"
          element={
            <ProtectedRoute role="driver">
              <DriverRides />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/drivers"
          element={
            <ProtectedRoute role="admin">
              <ManageDrivers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
