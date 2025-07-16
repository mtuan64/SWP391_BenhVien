import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Badge, Button, Avatar, Dropdown, Modal } from "antd"; // Added Modal import
import {
  MenuOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  BookOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  CalendarOutlined,
  LogoutOutlined,
  LockOutlined,
  BellOutlined,
} from "@ant-design/icons";

const Header = ({ onMenuClick, menuOpen }) => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    console.log("Header - user:", user, "token:", token);
    if (token) {
      const fetchUnreadCount = async () => {
        try {
          const res = await axios.get("http://localhost:9999/api/user/getNoti", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUnreadCount(res.data.unreadCount || 0);
        } catch (error) {
          console.error("Error fetching notifications:", error);
          if (error.response?.status === 401) {
            Modal.error({
              title: "Session Expired",
              content: "Your session has expired. Please log in again.",
              onOk: () => {
                logout();
                navigate("/login");
              },
            });
          }
        }
      };

      fetchUnreadCount();
    }
  }, [token, logout, navigate]);

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Logout",
      cancelText: "Cancel",
      onOk: () => {
        logout();
        navigate("/login");
      },
    });
  };

  const accountMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/myprofile">Profile</Link>,
    },
    {
      key: "profilemanage",
      icon: <UserOutlined />,
      label: <Link to="/profilemanage">Profile Manage</Link>,
    },
    {
      key: "appointmentmanage",
      icon: <CalendarOutlined />,
      label: <Link to="/appointmentmanage">Appointment Manage</Link>,
    },
    {
      key: "changepass",
      icon: <LockOutlined />,
      label: <Link to="/changepass">Change password</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Log out",
      onClick: handleLogout,
    },
  ];

  const guestMenuItems = [
    {
      key: "login",
      icon: <LoginOutlined />,
      label: <Link to="/login">Login</Link>,
    },
    {
      key: "register",
      icon: <UserAddOutlined />,
      label: <Link to="/register">Register</Link>,
    },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0 header"
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 3000,
      }}
    >
      {user && (
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 24 }} />}
          onClick={onMenuClick}
          className="menu-button"
          style={{
            marginRight: 16,
            border: "none",
            background: "none",
            boxShadow: "none",
            outline: "none",
          }}
        />
      )}

      <Link to="/" className="navbar-brand p-0 d-flex align-items-center header-brand">
        <h1 className="m-0 text-primary header-logo">
          <i className="fa fa-heartbeat me-2"></i>Kiwicare
        </h1>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse header-menu" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0 align-items-center d-flex header-actions">
          <Link to="/" className="nav-item nav-link">
            <HomeOutlined style={{ marginRight: 8 }} />
            Home
          </Link>
          <Link to="/about" className="nav-item nav-link">
            <InfoCircleOutlined style={{ marginRight: 8 }} />
            About
          </Link>
          <Dropdown
            menu={{
              items: [
                {
                  key: "blogs",
                  label: <Link to="/blogs">Blogs</Link>,
                },
                {
                  key: "news",
                  label: <Link to="/news">News</Link>,
                },
              ],
            }}
            trigger={["click"]}
          >
            <div
              className="nav-item nav-link d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <BookOutlined style={{ marginRight: 8 }} />
              Post
            </div>
          </Dropdown>
          <Link to="/services" className="nav-item nav-link">
            <MedicineBoxOutlined style={{ marginRight: 8 }} />
            Services
          </Link>
          <Link to="/doctors" className="nav-item nav-link">
            <TeamOutlined style={{ marginRight: 8 }} />
            Doctors
          </Link>
          <Link to="/health/calculator" className="nav-item nav-link">
            BMI
          </Link>
          {user ? (
            <>
              <Badge count={unreadCount} size="small">
                <BellOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => navigate("/notifications")}
                  className="notification-icon"
                  aria-label="Notifications"
                />
              </Badge>
              <Dropdown menu={{ items: accountMenuItems }} trigger={["click"]}>
                <Button type="text" className="account-button">
                  <UserOutlined style={{ fontSize: 18 }} /> Account
                </Button>
              </Dropdown>
            </>
          ) : (
            <Dropdown menu={{ items: guestMenuItems }} trigger={["click"]}>
              <Button type="text" className="account-button">
                <UserOutlined style={{ fontSize: 18 }} /> Account
              </Button>
            </Dropdown>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;