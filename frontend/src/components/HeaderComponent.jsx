import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Badge, Button, Dropdown, Menu, Modal } from "antd";
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
import axios from "axios";
import "../assets/css/Header.css";

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
      // Optional: Uncomment for polling
      // const interval = setInterval(fetchUnreadCount, 5000);
      // return () => clearInterval(interval);
    }
  }, [token, navigate, logout]);

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
      key: "changepass",
      icon: <LockOutlined />,
      label: <Link to="/changepass">Change Password</Link>,
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
    <nav className="header">
      <div className="header-container">
        {user && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onMenuClick}
            className="menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          />
        )}

        <Link to="/" className="header-brand">
          <h1 className="header-logo">Kiwicare</h1>
        </Link>

        <Menu
          mode="horizontal"
          className="header-menu"
          items={[
            {
              key: "home",
              icon: <HomeOutlined style={{ fontSize: 18 }} />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "about",
              icon: <InfoCircleOutlined style={{ fontSize: 18 }} />,
              label: <Link to="/about">About</Link>,
            },
            {
              key: "posts",
              icon: <BookOutlined style={{ fontSize: 18 }} />,
              label: "Post",
              children: [
                {
                  key: "blogs",
                  label: <Link to="/blogs">Blogs</Link>,
                },
                {
                  key: "news",
                  label: <Link to="/news">News</Link>,
                },
              ],
            },
            {
              key: "services",
              icon: <MedicineBoxOutlined style={{ fontSize: 18 }} />,
              label: <Link to="/services">Services</Link>,
            },
            {
              key: "doctors",
              icon: <TeamOutlined style={{ fontSize: 18 }} />,
              label: <Link to="/doctors">Doctors</Link>,
            },
          ]}
        />

        <div className="header-actions">
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
              <Button
                type="primary"
                icon={<CalendarOutlined style={{ fontSize: 18 }} />}
                onClick={() => navigate("/appointment")}
                className="appointment-button"
              >
                Appointment
              </Button>
            </>
          ) : (
            <>
              <Dropdown menu={{ items: guestMenuItems }} trigger={["click"]}>
                <Button type="text" className="account-button">
                  <UserOutlined style={{ fontSize: 18 }} /> Account
                </Button>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;