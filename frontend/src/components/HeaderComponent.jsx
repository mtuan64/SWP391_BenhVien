import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Thêm useNavigate
import { useAuth } from "../context/authContext";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // ✅ Sử dụng navigate

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Điều hướng về trang chủ
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0"
      style={{ position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 3000 }}
    >
      {/* Nút menu 3 gạch chỉ hiện khi đã đăng nhập */}
      {user && (
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 24 }} />}
          onClick={onMenuClick}
          style={{
            marginRight: 16,
            border: 'none',
            background: 'none',
            boxShadow: 'none',
            outline: 'none'
          }}
        />
      )}

      <Link to="/" className="navbar-brand p-0 d-flex align-items-center">
        <h1 className="m-0 text-primary" style={{ fontWeight: 700, fontSize: 32 }}>
          <i className="fa fa-tooth me-2"></i>KiwiCare
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
          <Link to="/" className="nav-item nav-link">Home</Link>
          <Link to="/about" className="nav-item nav-link">About</Link>
          <Link to="/service" className="nav-item nav-link">Service</Link>
          <Link to="/doctor" className="nav-item nav-link">Doctor</Link>

          {user ? (
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
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-item nav-link">Login</Link>
              <Link to="/register" className="nav-item nav-link">Register</Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="btn text-dark"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
        >
          <i className="fa fa-search"></i>
        </button>

        <Link to="/appointment" className="btn btn-primary py-2 px-4 ms-3">
          Appointment
        </Link>
      </div>
    </nav>
  );
};

export default Header;
