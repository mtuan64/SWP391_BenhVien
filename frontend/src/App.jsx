import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import ServicePage from "./pages/ServicePage";
import DoctorPage from "./pages/DoctorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorDetail from "./pages/DoctorDetail";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/Homepage";
import AppointmentPage from "./pages/AppointmentPage";
import Changepass from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AccountManagement from "./pages/admin/AccountManagement";
import EmployeeManagement from "./pages/admin/EmployessManagement";

import StaffLayout from "./components/Staff/StaffLayout";
import BlogManagement from "./pages/staff/BlogManagement";
import ServiceManagement from "./pages/staff/ServiceManagement";
import SpecialtyManagement from "./pages/staff/SpecialtyManagement";
import InvoiceManagement from "./pages/staff/InvoiceManagement";
import PaymentView from "./pages/staff/PaymentView";
import NewsManagement from "./pages/staff/NewsManagement";
import FeedbackManagement from "./pages/staff/FeedbackManagement";
import QnAView from "./pages/staff/QnAView";
import AppointmentScheduleManagement from "./pages/staff/AppointmentScheduleManagement";
import NotificationManagement from "./pages/staff/NotificationManagement";
import UserManagement from "./pages/staff/UserManagement";
import MedicineManagement from "./pages/staff/MedicineManagement";

import Header from "./components/HeaderComponent";
import MenuComponent from "./components/MenuComponent";
import FooterComponent from "./components/FooterComponent";

import "antd/dist/reset.css";

const DRAWER_WIDTH = 240;

const RoleRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role ?? "patient";

  useEffect(() => {
    if (location.pathname === "/") {
      if (role === "admin") navigate("/admin/");
      else if (role === "staff") navigate("/staff/");
      else if (role === "patient") navigate("/home");
      else if (role === "doctor") navigate("/doctor");
      else navigate("/login");
    }
  }, [navigate, role, location.pathname]);

  return null; // doesn't render UI
};

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "patient";

  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <Router>
      <Header onMenuClick={toggleMenu} menuOpen={menuOpen} />

      {user && (
        <MenuComponent
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          role={role}
        />
      )}

      <div
        style={{
          marginTop: 84,
          marginLeft: menuOpen ? DRAWER_WIDTH : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <RoleRedirect />

        <Routes>
          {/* Admin Layout Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="employees" element={<EmployeeManagement />} />
          </Route>

          {/* Staff Layout Routes */}
          <Route path="/staff/*" element={<StaffLayout />}>
            <Route index element={<BlogManagement />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="specialties" element={<SpecialtyManagement />} />
            <Route path="invoices" element={<InvoiceManagement />} />
            <Route path="payments" element={<PaymentView />} />
            <Route path="news" element={<NewsManagement />} />
            <Route path="feedback" element={<FeedbackManagement />} />
            <Route path="qna" element={<QnAView />} />
            <Route path="appointments" element={<AppointmentScheduleManagement />} />
            <Route path="notifications" element={<NotificationManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="medicines" element={<MedicineManagement />} />
          </Route>

          {/* Public routes */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/myprofile" element={<ProfilePage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/doctor/:doctorId" element={<DoctorDetail />} />
          <Route path="/changepass" element={<Changepass />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>

      <FooterComponent />
    </Router>
  );
};

export default App;
