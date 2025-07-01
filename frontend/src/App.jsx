import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

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
import WorkSchedulePage from "./pages/WorkSchedulePage";
import StaffScheduleManager from './pages/staff/StaffScheduleManager';


import "antd/dist/reset.css";
import Changepass from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AccountManagement from "./pages/admin/AccountManagement";
import EmployeeManagement from "./pages/admin/EmployessManagement";
import StaffLayout from "./components/staff/StaffLayout";
import InvoiceUser from "./pages/InvoiceManagement";
import BlogManagement from "./pages/staff/BlogManagement";
import ServiceManagement from "./pages/staff/ServiceManagement";
import DepartmentManagement from "./pages/staff/DepartmentManagement";
import SpecialtyManagement from "./pages/staff/SpecialtyManagement";
import InvoiceManagement from "./pages/staff/InvoiceManagement";
import PaymentView from "./pages/staff/PaymentView";
import NewsManagement from "./pages/staff/NewsManagement";
import FeedbackManagement from "./pages/staff/FeedbackManagement";
import QnAView from "./pages/staff/QnAView";
import AppointmentScheduleManagement from "./pages/staff/AppointmentScheduleManagement";
import NotificationManagement from "./pages/staff/NotificationManagement";
import UserManagement from "./pages/staff/UserManagement";
import MedicalRecord from "./pages/staff/MedicalRecord";
import MedicineManagement from "./pages/staff/MedicineManagement";
import InvoiceList from "./components/InvoiceList";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFail from "./components/PaymentFail";
import CreateInvoice from "./components/staff/CreateInvoice";
import MenuComponent from "./components/MenuComponent";
import FooterComponent from "./components/FooterComponent";
import NotificationCenter from "./pages/NotificationCenter";
import NotificationDetail from "./pages/NotificationDetail";
import {
  PrivateRoute,
  PrivateRouteNotAllowUser,
  PrivateRouteByRole,
} from "./components/PrivateRoute";
import "antd/dist/reset.css";
import AddMedicalRecord from "./components/AddMedicalRecord";
import ViewMedicalRecords from "./components/ViewMedicalRecord";
import CreateServicePage from "./components/staff/CreateServicePage";
import EditServicePage from "./components/staff/EditService";
import HealthCalculatorPage from "./pages/HealthCalculatorPage";
import BlogListPage from "./pages/BlogListPage";
import NewsListPage from "./pages/NewsListPage";
import NewsDetail from "./pages/NewsDetail";
import BlogDetail from "./pages/BlogDetail";
import ViewMedicalRecord from "./pages/ViewMedicalRecord";
import Header from "./components/HeaderComponent";
import NotFoundPage from "./pages/NotFoundPage";

const DRAWER_WIDTH = 240;

const RoleRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "patient";

  useEffect(() => {
    if (!user) return;

    const path = location.pathname;

    if (path === "/") {
      // Điều hướng ban đầu
      if (role === "Admin") navigate("/admin/");
      else if (role === "Staff") navigate("/staff/");
      else if (role === "Doctor") navigate("/doctor");
      else navigate("/");
    } else {
      // Nếu đã vào nhầm layout (sai path so với role) thì redirect lại
      if (role === "Admin" && !path.startsWith("/admin")) navigate("/admin/");
      if (role === "Staff" && !path.startsWith("/staff")) navigate("/staff/");
      if (role === "Doctor" && !path.startsWith("/doctor")) navigate("/doctor");
      if (
        role === "patient" &&
        (path.startsWith("/admin") ||
          path.startsWith("/staff") ||
          path.startsWith("/doctor"))
      )
        navigate("/home");
    }
  }, [navigate, location.pathname]);

  return null;
};
const getRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;
    return role || "patient";
  } catch {
    return "patient";
  }
};

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const role = getRole();
  const isPatient = role === "patient";
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => setMenuOpen((open) => !open);
  console.log(isPatient);
  return (
    <Router>
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
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route path="medical-profile" element={<UserMedicalProfile />} />
            <Route path="medicine" element={<div>View Medicine Page</div>} />
            <Route
              path="appointments"
              element={<div>Appointment List Page</div>}
            />
            <Route
              path="notifications"
              element={<div>Notifications Page</div>}
            />
            <Route path="work-schedule" element={<WorkSchedulePage />} />
          </Route>

          <Route path="/" element={<HomePage />} />
          {/* Admin Layout Routes */}
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

          {/* Staff Layout Routes */}
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
            <Route path="invoices/create" element={<CreateInvoice />}></Route>
            <Route path="services" element={<ServiceManagement />} />
            <Route path="services/create" element={<CreateServicePage />} />
            <Route path="services/edit/:id" element={<EditServicePage />} />
            <Route path="departments" element={<DepartmentManagement />} />
            <Route path="specialties" element={<SpecialtyManagement />} />
            <Route path="invoices" element={<InvoiceList />} />
            <Route path="payments" element={<PaymentView />} />
            <Route path="news" element={<NewsManagement />} />
            <Route path="add/medicalrecords" element={<AddMedicalRecord />} />
            <Route
              path="view/medicalrecords"
              element={<ViewMedicalRecords />}
            />

            <Route path="feedback" element={<FeedbackManagement />} />
            <Route path="qna" element={<QnAView />} />
            <Route
              path="appointments"
              element={<AppointmentScheduleManagement />}
            />
            <Route path="notifications" element={<NotificationManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="medicalrecord" element={<MedicalRecord />} />
            <Route path="medicines" element={<MedicineManagement />} />
            <Route path="schedule" element={<StaffScheduleManager  />} />
          </Route>

          {/* Public routes */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/doctor-home" element={<DoctorPage />} />

          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route
            path="/view_medicalrecord"
            element={
              <PrivateRouteByRole allowedRoles={["patient"]}>
                <ViewMedicalRecord />
              </PrivateRouteByRole>
            }
          />
          <Route path="/doctors" element={<DoctorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/myprofile" element={<ProfilePage />} />
          <Route path="/invoice" element={<InvoiceUser />} />
          <Route
            path="/appointment"
            element={
              <PrivateRoute>
                <AppointmentPage />
              </PrivateRoute>
            }
          />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/doctor/:doctorId" element={<DoctorDetail />} />

          {/* <Route path="/medicalrecord" element={<AddMedicalRecord />} />
          <Route path="/medicalrecords" element={<ViewMedicalRecords />} /> */}
          <Route path="/payment" element={<InvoiceList />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/fail" element={<PaymentFail />} />
          {/* <Route path="/labtests" element={<LabtestResult />} /> */}
          <Route path="/health/calculator" element={<HealthCalculatorPage />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/changepass" element={<Changepass />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/notifications/:id" element={<NotificationDetail />} />
        </Routes>
      </div>
      {isPatient && <FooterComponent />}
    </Router>
  );
};

export default App;
