import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import "antd/dist/reset.css"; // hoặc 'antd/dist/antd.css' nếu bạn dùng antd v4
import { useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 240;


const App = () => {
    
  const navigate = useNavigate();

  // State mở/đóng menu
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const toggleMenu = () => setMenuOpen((open) => !open);
    const role = user.role?user.role:"patient";
  if (role === "admin") {
  navigate("/admin/"); // hiển thị AdminLayout
} else if (role === "staff") {
  navigate("/staff/"); // hiển thị StaffLayout
}else if(role === "patient"){
  navigate("/patient");
} else if(role === "doctor"){
  navigate("/doctor");
} 
else {
  navigate("/login");
}
  // Hàm toggle menu
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
      </div>

      {/* Footer luôn hiện trên mọi trang */}
      <FooterComponent />
    </Router>
  );
};

export default App;