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
import AddMedicalRecord from "./components/AddMedicalRecord";
import ViewMedicalRecords from "./components/ViewMedicalRecord";
import InvoiceList from "./components/InvoiceList";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFail from "./components/PaymentFail";
import LabtestResult from "./components/LabTestResult";
const DRAWER_WIDTH = 240;
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

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
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

          <Route path="/medicalrecord" element={<AddMedicalRecord />} />
          <Route path="/medicalrecords" element={<ViewMedicalRecords />} />
          <Route path="/payment" element={<InvoiceList />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/fail" element={<PaymentFail />} />
          <Route path="/labtests" element={<LabtestResult />} />


          <Route path="/changepass" element={<Changepass />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
