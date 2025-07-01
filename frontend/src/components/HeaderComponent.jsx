import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Badge } from "antd";
import axios from "axios";
import { Button, Avatar, Dropdown } from "antd";
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
} from "@ant-design/icons";

const Header = ({ onMenuClick }) => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token) return;

    const fetchUnreadCount = async () => {
      try {
        const res = await axios.get("http://localhost:9999/api/user/getNoti", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUnreadCount(res.data.unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchUnreadCount();

    // ✅ If you still want polling later, safely enable this:
    // const interval = setInterval(fetchUnreadCount, 5000);
    // return () => clearInterval(interval);
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");

    const accountMenuItems = [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: <Link to="/myprofile">Profile</Link>,
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
        className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0"
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
            style={{
              marginRight: 16,
              border: "none",
              background: "none",
              boxShadow: "none",
              outline: "none",
            }}
          />
        )}

        <Link to="/" className="navbar-brand p-0 d-flex align-items-center">
          <h1
            className="m-0 text-primary"
            style={{ fontWeight: 700, fontSize: 32 }}
          >
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

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 align-items-center d-flex">
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
                    onClick={() => navigate("/notifications")}
                    style={{
                      fontSize: 22,
                      cursor: "pointer",
                      marginLeft: 24,
                      color: "#333",
                    }}
                  />
                </Badge>

                <div className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link to="/myprofile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/profilemanage" className="dropdown-item">
                        Profile Manage
                      </Link>
                    </li>
                    <li>
                      <Link to="/appointmentmanage" className="dropdown-item">
                        Appointment Manage
                      </Link>
                    </li>
                    <li>
                      <Link to="/changepass" className="dropdown-item">
                        Change password
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Dropdown menu={{ items: guestMenuItems }} trigger={["click"]}>
                <div
                  className="nav-item nav-link d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <UserOutlined style={{ marginRight: 8 }} />
                  Account
                </div>
              </Dropdown>
            )}
          </div>

          <Link to="/appointment" className="btn btn-primary py-2 px-4 ms-3">
            <CalendarOutlined style={{ marginRight: 8 }} />
            Appointment
          </Link>
        </div>
      </nav>
    );
  };
};

export default Header;
