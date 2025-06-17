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

import "antd/dist/reset.css";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import EmployeeManagement from "./pages/admin/EmployessManagement";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "patient";

  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <Router>
      <Routes>
        {/* Admin Layout Routes */}
        <Route>
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="employees" element={<EmployeeManagement />} />
          </Route>
        </Route>

        {/* Public Site Layout */}
        <Route
          path="/*"
          element={
            <div>
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
                  marginLeft: menuOpen ? 240 : 0,
                  transition: "margin-left 0.3s ease",
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
                </Routes>
              </div>
              <FooterComponent />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
