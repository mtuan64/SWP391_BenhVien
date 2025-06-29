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
import SendQAForm from "./pages/sendQA";

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
import MedicalRecord from "./pages/MedicalRecord";
import Header from "./components/HeaderComponent";
import MenuComponent from "./components/MenuComponent";
import FooterComponent from "./components/FooterComponent";
import {
  PrivateRoute,
  PrivateRouteNotAllowUser,
  PrivateRouteByRole,
} from "./components/PrivateRoute";
import "antd/dist/reset.css";
import NotFoundPage from "./pages/NotFoundPage";
import QAHistories from "./pages/QAHistories";
import ProfileStaff from "./pages/staff/ProfileStaff";
import ProfileDoctor from "./pages/ProfileDoctor";
import DoctorLayout from "./layout/DoctorLayout";
const DRAWER_WIDTH = 240;

// Redirect logic based on role and current path
const RoleRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role || "patient";
    const path = location.pathname;

    if (!user) return;

    if (path === "/") {
      if (role === "Admin") navigate("/admin", { replace: true });
      else if (role === "Staff") navigate("/staff", { replace: true });
      else if (role === "Doctor") navigate("/doctor", { replace: true });
      else navigate("/home", { replace: true });
      return;
    }

    if (role === "Admin" && !path.startsWith("/admin")) {
      navigate("/admin", { replace: true });
    } else if (role === "Staff" && !path.startsWith("/staff")) {
      navigate("/staff", { replace: true });
    } else if (role === "Doctor" && !path.startsWith("/doctor")) {
      navigate("/doctor", { replace: true });
    } else if (
      role === "patient" &&
      (path.startsWith("/admin") || path.startsWith("/staff"))
    ) {
      navigate("/home", { replace: true });
    }
  }, [navigate, location]);

  return null;
};

// Main routes + layout
const AppRoutes = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState("patient");
  const [user, setUser] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((open) => !open);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userRole = storedUser?.role?.toLowerCase() || "patient";

    setUser(storedUser);
    setRole(userRole);
  }, [location.pathname]);

  const isPatient = role === "patient";

  return (
    <>
      {isPatient && <Header onMenuClick={toggleMenu} menuOpen={menuOpen} />}
      {isPatient && user && (
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
          {/* Admin */}
          <Route
            path="/admin/*"
            element={
              <PrivateRouteByRole allowedRoles={["Admin"]}>
                <AdminLayout />
              </PrivateRouteByRole>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="employees" element={<EmployeeManagement />} />
          </Route>

          {/* Staff */}
          <Route
            path="/staff/*"
            element={
              <PrivateRouteByRole allowedRoles={["Staff"]}>
                <StaffLayout />
              </PrivateRouteByRole>
            }
          >
            <Route index element={<BlogManagement />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="specialties" element={<SpecialtyManagement />} />
            <Route path="invoices" element={<InvoiceManagement />} />
            <Route path="payments" element={<PaymentView />} />
            <Route path="news" element={<NewsManagement />} />
            <Route path="feedback" element={<FeedbackManagement />} />
            <Route path="qna" element={<QnAView />} />
            <Route path="profile" element={<ProfileStaff />} />
            <Route
              path="appointments"
              element={<AppointmentScheduleManagement />}
            />
            <Route path="notifications" element={<NotificationManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="medicines" element={<MedicineManagement />} />
          </Route>


            <Route path="/doctor" element={<PrivateRouteByRole allowedRoles={["Doctor"]}><DoctorLayout /></PrivateRouteByRole>}>
                    {/* <Route path="medical-profile" element={<UserMedicalProfile />} /> */}
                    <Route path="medicine" element={<div>View Medicine Page</div>} />
                    <Route path="appointments" element={<div>Appointment List Page</div>} />
                    <Route path="notifications" element={<div>Notifications Page</div>} />
                    {/* <Route path="work-schedule" element={<WorkSchedulePage />} /> */}
                       <Route path="profile" element={<ProfileDoctor />} />
          </Route>
          {/* Public routes */}
          <Route path="/home" element={ <HomePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/myprofile" element={<ProfilePage />} />
          <Route path="/qahistory" element={<QAHistories />} />
          <Route path="/qa" element={<SendQAForm />} />
          <Route path="/changepass" element={<Changepass />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/doctor/:doctorId" element={<DoctorDetail />} />

          {/* Protected routes */}
          <Route
            path="/appointment"
            element={
              <PrivateRoute>
                <AppointmentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/medicalrecords"
            element={
              <PrivateRoute>
                <MedicalRecord />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      {isPatient && <FooterComponent />}
    </>
  );
};

// Root App component that wraps with <Router>
const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
