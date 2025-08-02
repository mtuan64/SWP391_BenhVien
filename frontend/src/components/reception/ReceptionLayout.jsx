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

const { Header, Sider, Content } = Layout;

const ReceptionLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  // Menu items for Doctor2 role
  const menuItems = [
    {
      key: "1",
      path: "/recep/appointments",
      icon: <CalendarOutlined />,
      label: "Lịch Hẹn",
    },

    {
      key: "3",
      path: "/recep/users",
      icon: <UserOutlined />,
      label: "Quản Lý Người Dùng",
    },
    // {
    //   key: "4",
    //   path: "/recep/medicalrecord",
    //   icon: <FileTextOutlined />,
    //   label: "Hồ Sơ Y Tế",
    // },

    {
      key: "5",
      path: "/recep/invoices",
      icon: <DollarOutlined />,
      label: "Quản Lý Hóa Đơn",
    },
    {
      key: "6",
      path: "/recep/payments",
      icon: <DollarOutlined />,
      label: "Quản Lý Thanh Toán",
    },

    {
      key: "7",
      path: "/recep/datlichoffline",
      icon: <QuestionCircleOutlined />,
      label: "Đặt lịch",
    },
    {
      key: "8",
      path: "/recep/tao-ho-so",
      icon: <QuestionCircleOutlined />,
      label: "Tạo hồ sơ",
    },
    {
      key: "9",
      path: "/recep/profile",
      icon: <QuestionCircleOutlined />,
      label: "Hồ Sơ Cá Nhân",
    },
    {
      key: "10",
      path: null,
      icon: <LogoutOutlined />,
      label: "Đăng Xuất",
      onClick: () => handleLogout(),
    },
  ];

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
          {collapsed ? "KC" : "Lễ Tân"}
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
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 16,
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

export default ReceptionLayout;
