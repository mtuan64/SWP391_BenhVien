
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Badge, Button, Dropdown } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  BookOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  CalendarOutlined,
  BellOutlined,
  ApartmentOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import "../assets/css/Header.css";
import MenuComponent from "./MenuComponent";
import axios from "axios"; // Ensure axios is imported

const Header = ({ onMenuClick, menuOpen }) => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token || !user) return;

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
  }, [token, user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
    <nav className="header-nav">
      <div className="header-container">
        <div className="header-left">
          {user && (
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 24 }} />}
              onClick={(e) => {
                e.stopPropagation();
                onMenuClick();
              }}
              style={{ border: "none", background: "none" }}
            />
          )}
          <Link to="/" className="header-logo">
            <h1>
              <i className="fa fa-heartbeat"></i> Kiwicare
            </h1>
          </Link>
        </div>
        <div className="header-right">
          <Link to="/" className="header-link">
            <HomeOutlined /> <span>Home</span>
          </Link>
          <Link to="/about" className="header-link">
            <InfoCircleOutlined /> <span>About</span>
          </Link>
          <Dropdown
            menu={{
              items: [
                { key: "blogs", label: <Link to="/blogs">Blogs</Link> },
                { key: "news", label: <Link to="/news">News</Link> },
              ],
            }}
            trigger={["click"]}
          >
            <div className="header-link dropdown-trigger">
              <BookOutlined /> <span>Post</span>
            </div>
          </Dropdown>
          <Link to="/department-home" className="header-link">
            <ApartmentOutlined /> <span>Department</span>
          </Link>
          <Link to="/service-home" className="header-link">
            <CustomerServiceOutlined /> <span>Services</span>
          </Link>
          <Link to="/doctor-home" className="header-link">
            <TeamOutlined /> <span>Doctors</span>
          </Link>
          <Link to="/medicines-home" className="header-link">
            <MedicineBoxOutlined /> <span>Medicines</span>
          </Link>
          {user ? (
            <>
              <Badge count={unreadCount} size="small" overflowCount={99}>
                <BellOutlined
                  onClick={() => navigate("/notifications")}
                  className="bell-icon"
                />
              </Badge>
              <div className="account-menu-wrapper">
                <button className="account-button">
                  <UserOutlined />
                  <span>Account</span>
                  <svg
                    className="dropdown-arrow"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <ul className="account-dropdown">
                  <li>
                    <Link to="/myprofile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/changepass">Change Password</Link>
                  </li>
                  <li>
                    <hr />
                  </li>
                  <li>
                    <button onClick={handleLogout}>Log out</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Dropdown menu={{ items: guestMenuItems }} trigger={["click"]}>
              <div className="header-link dropdown-trigger">
                <UserOutlined /> <span>Account</span>
              </div>
            </Dropdown>
          )}
          <Link to="/appointment" className="appointment-button">
            <CalendarOutlined /> <span>Appointment</span>
          </Link>
        </div>
      </div>
      {user && (
        <MenuComponent isOpen={menuOpen} onClose={onMenuClick} role="patient" />
      )}
    </nav>
  );
};

export default Header;
