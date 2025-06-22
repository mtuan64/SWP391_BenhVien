import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DoctorLayout from "./layouts/DoctorLayout";
import UserMedicalProfile from "./pages/UserMedicalProfile";
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
import WorkSchedulePage from "./pages/WorkSchedule";
import "antd/dist/reset.css"; // hoặc 'antd/dist/antd.css' nếu bạn dùng antd v4

const DRAWER_WIDTH = 240;

const App = () => {
  // State mở/đóng menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Lấy user và role (có thể lấy từ context hoặc localStorage)
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "patient";

  // Hàm toggle menu
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <Router>
      {/* Header luôn hiện trên mọi trang */}
      <Header onMenuClick={toggleMenu} menuOpen={menuOpen} />

      {/* Menu Drawer luôn hiện trên mọi trang khi đã đăng nhập */}
      {user && (
        <MenuComponent
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          role={role}
        />
      )}

      {/* Main content, dịch sang phải khi menu mở */}
      <div
        style={{
          marginTop: 84,
          marginLeft: menuOpen ? DRAWER_WIDTH : 0,
          transition: "margin-left 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <Routes>
          <Route path="/doctor" element={<DoctorLayout />}>
                    <Route path="medical-profile" element={<UserMedicalProfile />} />
                    <Route path="medicine" element={<div>View Medicine Page</div>} />
                    <Route path="appointments" element={<div>Appointment List Page</div>} />
                    <Route path="notifications" element={<div>Notifications Page</div>} />
                    <Route path="work-schedule" element={<WorkSchedulePage />} />
          </Route>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/doctor-home" element={<DoctorPage />} />
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

      {/* Footer luôn hiện trên mọi trang */}
      <FooterComponent />
    </Router>
  );
};

export default App;