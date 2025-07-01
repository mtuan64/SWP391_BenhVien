import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Button, Badge } from "antd";
import { MenuOutlined, BellOutlined } from "@ant-design/icons";
import axios from "axios";

const Header = ({ onMenuClick }) => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token) return;

    const fetchUnreadCount = async () => {
      try {
        const res = await axios.get("/api/user/getNoti", {
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
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0"
      style={{ position: "fixed", width: "100%", top: 0, left: 0, zIndex: 3000 }}
    >
      {user && (
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 24 }} />}
          onClick={onMenuClick}
          style={{ marginRight: 16, border: "none", background: "none" }}
        />
      )}

      <Link to="/" className="navbar-brand p-0 d-flex align-items-center">
        <h1 className="m-0 text-primary" style={{ fontWeight: 700, fontSize: 32 }}>
          <i className="fa fa-tooth me-2"></i>KiwiCare
        </h1>
      </Link>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0 align-items-center d-flex">
          <Link to="/" className="nav-item nav-link">Home</Link>
          <Link to="/about" className="nav-item nav-link">About</Link>
          <Link to="/service" className="nav-item nav-link">Service</Link>
          <Link to="/doctor" className="nav-item nav-link">Doctor</Link>

          <Link to="/health/calculator" className="nav-item nav-link">BMI</Link>
          {user ? (
            <>
              <Badge count={unreadCount} size="small">
                <BellOutlined
                  onClick={() => navigate("/notifications")}
                  style={{ fontSize: 22, cursor: "pointer", marginLeft: 24, color: "#333" }}
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
                    <Link to="/myprofile" className="dropdown-item">Profile</Link>
                  </li>
                  <li>
                    <Link to="/changepass" className="dropdown-item">Change password</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item nav-link">Login</Link>
              <Link to="/register" className="nav-item nav-link">Register</Link>
            </>
          )}
        </div>

        <Link to="/appointment" className="btn btn-primary py-2 px-4 ms-3">
          Appointment
        </Link>
      </div>
    </nav>
  );
};

export default Header;
