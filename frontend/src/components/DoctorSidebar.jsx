import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const DoctorSidebar = () => {
  const navigate = useNavigate();

  const links = [
    { to: "/doctor/medical-profile", label: "User Medical Profile", icon: <UserOutlined /> },
    { to: "/doctor/labtest", label: "Lab Test", icon: <ScheduleOutlined /> },
    { to: "/doctor/medicine", label: "View Medicine", icon: <MedicineBoxOutlined /> },
    { to: "/doctor/appointments", label: "View Appointment", icon: <CalendarOutlined /> },
    { to: "/doctor/work-schedule", label: "View Work Schedule", icon: <ScheduleOutlined /> },
    { to: "/doctor/profile", label: "View profile", icon: <ScheduleOutlined /> },
    { to: "/doctor/attendance", label: "Attendance", icon: <ScheduleOutlined /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Doctor</h2>

      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            ...styles.link,
            backgroundColor: isActive ? "#1677ff" : "transparent",
            color: isActive ? "#fff" : "#ddd",
          })}
        >
          <span style={styles.icon}>{icon}</span>
          {label}
        </NavLink>
      ))}

      {/* Nút Logout được đưa vào ngay sau Attendance */}
      <div
        onClick={handleLogout}
        style={{
          ...styles.link,
          cursor: "pointer",
          color: "#ddd",
        }}
      >
        <span style={styles.icon}><LogoutOutlined /></span>
        Logout
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: 240,
    minHeight: "100vh",
    backgroundColor: "#001529",
    padding: "20px 10px",
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  link: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    marginBottom: "10px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: 14,
    transition: "0.3s",
  },
  icon: {
    marginRight: 12,
    fontSize: 16,
  },
};

export default DoctorSidebar;
