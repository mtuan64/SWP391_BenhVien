import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Doctor2Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  // Menu items for Doctor2 role
  const menuItems = [
    {
      key: "1",
      path: "/doctor2/procedure-requests",
      icon: <UserOutlined />,
      label: "Danh sách bệnh nhân",
    },
    {
      key: "2",
      path: "/doctor2/lab-tests",
      icon: <MedicineBoxOutlined />,
      label: "Xét nghiệm",
    },
    {
      key: "3",
      path: "/doctor2/profile",
      icon: <UserOutlined />,
      label: "Hồ sơ cá nhân",
    },
    {
      key: "4",
      path: null,
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
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
    const currentItem = menuItems.find((item) => item.path === location.pathname);
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
          {collapsed ? "KC" : "Bác sĩ xét nghiệm"}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick || undefined}>
              {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
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

export default Doctor2Layout;