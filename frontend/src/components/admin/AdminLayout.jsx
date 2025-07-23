import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, Routes, Route, useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/admin">Bảng Điều Khiển</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin/accounts">Quản Lý Người Dùng</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <Link to="/admin/employees">Quản Lý Nhân Viên</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link to="/admin/attendance">Quản Lý Điểm Danh</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
            Đăng Xuất
          </Menu.Item>
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

export default AdminLayout;
