import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LockOutlined,
  CloseOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const DRAWER_WIDTH = 240;

// Menu items for patient role
const patientMenu = [
  { title: "Home", path: "/", icon: <HomeOutlined /> },,
  { title: "Medical Record", path: "/view_medicalrecord", icon: <FileTextOutlined /> },
  { title: "BMI", path: "/health/calculator", icon: <UserOutlined /> }, // New item
  { title: "Profile Manage", path: "/profilemanage", icon: <UserOutlined /> }, // New item
  { title: "Appointment Manage", path: "/appointmentmanage", icon: <CalendarOutlined /> }, // New item
];

const MenuComponent = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Handle logout
  const handleLogout = () => {
    localStorage.clear(); // Or clear token specifically if used
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <Drawer
      title={null}
      placement="left"
      onClose={onClose}
      open={isOpen}
      closeIcon={<CloseOutlined style={{ fontSize: 20 }} />}
      width={DRAWER_WIDTH}
      style={{ top: 70 }}
      mask={false}
    >
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100%",
          height: "calc(100vh - 64px)",
          overflowY: "auto",
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        {patientMenu.map(({ title, path, icon, action }) => {
          const isActive = location.pathname === path;

          const commonStyle = {
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "14px 28px",
            fontSize: "16px",
            color: isActive ? "#1890ff" : "#333",
            textDecoration: "none",
            borderRadius: "0 24px 24px 0",
            background: isActive ? "#e6f7ff" : "transparent",
            fontWeight: isActive ? 600 : 400,
            margin: "2px 0",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          };

          // If it's a logout action
          if (action === "logout") {
            return (
              <div key={title} onClick={handleLogout} style={commonStyle}>
                {React.cloneElement(icon, { style: { fontSize: 20 } })}
                <span>{title}</span>
              </div>
            );
          }

          // Normal menu items
          return (
            <Link key={title} to={path} onClick={onClose} style={commonStyle}>
              {React.cloneElement(icon, { style: { fontSize: 20 } })}
              <span>{title}</span>
            </Link>
          );
        })}
      </nav>
    </Drawer>
  );
};

export default MenuComponent;