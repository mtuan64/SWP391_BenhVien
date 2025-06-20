import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import ServicePage from "./pages/ServicePage";
import DoctorPage from "./pages/DoctorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorDetail from "./pages/DoctorDetail";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/Homepage";
import AppointmentPage from "./pages/AppointmentPage";
import Header from "./components/HeaderComponent";
import MenuComponent from "./components/MenuComponent";
import FooterComponent from "./components/FooterComponent";
import Changepass from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import "antd/dist/reset.css";

const DRAWER_WIDTH = 240;

// 👉 A proper AppRoutes component, inside <Router> so we can use useNavigate()
const AppRoutes = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role ?? "patient";

  useEffect(() => {
    if (role === "admin") navigate("/admin/");
    else if (role === "staff") navigate("/staff/");
    else if (role === "patient") navigate("/patient");
    else if (role === "doctor") navigate("/doctor");
    else navigate("/login");
  }, [navigate, role]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
    </>
  );
};

// 👉 Clean main App component with Router and header/menu/footer
const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const toggleMenu = () => setMenuOpen((open) => !open);
  const role = user?.role ?? "patient";

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
          transition: "margin-left 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <AppRoutes menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>

      <FooterComponent />
    </Router>
  );
};

export default App;
