import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  AppstoreOutlined,
  MedicineBoxOutlined,
  DollarOutlined,
  CommentOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  BellOutlined,
  UserOutlined,
  PlusCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import AttendanceButton from "../AttendanceButton";
import AttendanceAction from "../AttendanceButton";

const { Header, Sider, Content } = Layout;

const StaffLayout = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  // Map routes to menu keys
  const menuItems = [
    {
      key: "1",
      path: "/staff/blogs",
      icon: <FileTextOutlined />,
      label: "Quản Lý Bài Viết",
    },
    {
      key: "2",
      path: "/staff/services",
      icon: <AppstoreOutlined />,
      label: "Quản Lý Dịch Vụ",
    },
    {
      key: "3",
      path: "/staff/departments",
      icon: <AppstoreOutlined />,
      label: "Quản Lý Khoa Phòng",
    },

    {
      key: "4",
      path: "/staff/notifications",
      icon: <BellOutlined />,
      label: "Quản Lý Thông Báo",
    },
    {
      key: "5",
      path: "/staff/news",
      icon: <NotificationOutlined />,
      label: "Quản Lý Tin Tức",
    },
    {
      key: "6",
      path: "/staff/feedback",
      icon: <CommentOutlined />,
      label: "Quản Lý Feedback",
    },
    {
      key: "7",
      path: "/staff/qna",
      icon: <QuestionCircleOutlined />,
      label: "Q/A",
    },
    {
      key: "8",
      path: "/staff/schedule",
      icon: <QuestionCircleOutlined />,
      label: "Quản Lý Lịch Trình",
    },

    {
      key: "9",
      path: "/staff/profile",
      icon: <QuestionCircleOutlined />,
      label: "Hồ Sơ Cá Nhân",
    },

    {
      key: "10",
      path: "/staff/attendance",
      icon: <CheckCircleOutlined />,
      label: "Điểm danh",
    },
    {
      key: "11",
      path: null,
      icon: <LogoutOutlined />,
      label: "Đăng Xuất",
      onClick: () => handleLogout(),
    },
  ];
  const employeeId = localStorage.getItem("employeeId");
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // Force reload to update Header
  };

  // Update selected key based on current route
  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (currentItem && currentItem.key !== selectedKey) {
      setSelectedKey(currentItem.key);
    }
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {collapsed ? "KC" : "KiwiCare"}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={item.onClick || undefined}
            >
              {item.path ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                item.label
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18, cursor: "pointer" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>

        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffLayout;
