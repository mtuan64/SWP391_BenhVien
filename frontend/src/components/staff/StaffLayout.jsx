import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  AppstoreOutlined, // Replaced ServiceOutlined with AppstoreOutlined
  MedicineBoxOutlined,
  DollarOutlined,
  CommentOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const StaffLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
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
          <Menu.Item key="1" icon={<FileTextOutlined />}>
            <Link to="/staff/blogs">Manage Blogs</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/staff/services">Manage Service</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MedicineBoxOutlined />}>
            <Link to="/staff/specialties">Manage Specialty</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<DollarOutlined />}>
            <Link to="/staff/invoices">Manage Invoices</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<DollarOutlined />}>
            <Link to="/staff/payments">View Payment</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<NotificationOutlined />}>
            <Link to="/staff/news">Manage News</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<CommentOutlined />}>
            <Link to="/staff/feedback">Manage Feedback</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<QuestionCircleOutlined />}>
            <Link to="/staff/qna">View Q&A</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
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

export default StaffLayout;