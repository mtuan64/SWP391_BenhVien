import React, { useState } from "react";
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
  CheckCircleOutlined, // Icon for Attendance
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const StaffLayout = () => {
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
          <Menu.Item key="1" icon={<FileTextOutlined />}>
            <Link to="/staff/blogs">Quản Lý Bài Viết</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/staff/services">Quản Lý Dịch Vụ</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>
            <Link to="/staff/departments">Quản Lý Khoa Phòng</Link>
          </Menu.Item>
          
          <Menu.Item key="6" icon={<CalendarOutlined />}>
            <Link to="/staff/appointments">Lịch Hẹn</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<BellOutlined />}>
            <Link to="/staff/notifications">Quản Lý Thông Báo</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<UserOutlined />}>
            <Link to="/staff/users">Quản Lý Người Dùng</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<FileTextOutlined />}>
            <Link to="/staff/medicalrecord">Hồ Sơ Y Tế</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<PlusCircleOutlined />}>
            <Link to="/staff/medicines">Quản Lý Thuốc</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<DollarOutlined />}>
            <Link to="/staff/invoices">Quản Lý Hóa Đơn</Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<DollarOutlined />}>
            <Link to="/staff/payments">Quản Lý Thanh Toán</Link>
          </Menu.Item>
          <Menu.Item key="13" icon={<NotificationOutlined />}>
            <Link to="/staff/news">Quản Lý Tin Tức</Link>
          </Menu.Item>
          <Menu.Item key="14" icon={<CommentOutlined />}>
            <Link to="/staff/feedback">Quản Lý Feedback</Link>
          </Menu.Item>
          <Menu.Item key="15" icon={<QuestionCircleOutlined />}>
            <Link to="/staff/qna">Q/A</Link>
          </Menu.Item>

          <Menu.Item key="16" icon={<QuestionCircleOutlined />}>
            <Link to="/staff/schedule">Quản Lý Lịch Trình</Link>
          </Menu.Item>

          <Menu.Item key="19" icon={<CheckCircleOutlined />}>
            <Link to="/staff/attendance">Điểm Danh</Link>
          </Menu.Item>

          <Menu.Item key="18" icon={<QuestionCircleOutlined />}>
            <Link to="/staff/profile">Hồ Sơ Cá Nhân</Link>
          </Menu.Item>

          <Menu.Item key="17" icon={<LogoutOutlined />} onClick={handleLogout}>
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

export default StaffLayout;