import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer } from "antd";
import {
    HomeOutlined, UserOutlined, LockOutlined, CloseOutlined,
    TeamOutlined, FileTextOutlined, SettingOutlined
} from "@ant-design/icons";

const DRAWER_WIDTH = 240;

// Định nghĩa menu theo từng vai trò với đường dẫn rõ ràng
const menuByRole = {
    admin: [
        { title: "Home", path: "/", icon: <HomeOutlined /> },
        { title: "Manage Users", path: "/users-management", icon: <TeamOutlined /> },
        { title: "Manage Recruitment", path: "/manage-recruitment", icon: <FileTextOutlined /> },
        { title: "Manage BlogList", path: "/bloglist", icon: <FileTextOutlined /> },
        { title: "Manage Doctor Account", path: "/doctoraccount", icon: <FileTextOutlined /> },
        { title: "Settings", path: "/settings", icon: <SettingOutlined /> },
    ],
    doctor: [
        { title: "Home", path: "/", icon: <HomeOutlined /> },
        { title: "My Project", path: "/my-project", icon: <TeamOutlined /> },
        { title: "Report Management", path: "/report", icon: <LockOutlined /> },
        { title: "Message Management", path: "/message-management", icon: <LockOutlined /> },
        { title: "Attendance Management", path: "/attendance-management", icon: <LockOutlined /> },
        { title: "Recruitment Management", path: "/recruitment-management-mentor", icon: <LockOutlined /> },
    ],
    staff: [
        { title: "Home", path: "/", icon: <HomeOutlined /> },
        { title: "Addresses", path: "/addresses", icon: <UserOutlined /> },
        { title: "Change Password", path: "/change-password", icon: <LockOutlined /> },
    ],
    patient: [
        { title: "Home", path: "/", icon: <HomeOutlined /> },
        { title: "My Project", path: "/my-project-intern", icon: <HomeOutlined /> },
        { title: "Report Management", path: "/report-management", icon: <FileTextOutlined /> },
        { title: "Schedule", path: "/schedule", icon: <FileTextOutlined /> },
        { title: "Attendance", path: "/attendance", icon: <FileTextOutlined /> },
        { title: "Mark Report", path: "/attendance", icon: <FileTextOutlined /> },
    ],
};

const MenuComponent = ({ isOpen, onClose, role }) => {
    const navigations = menuByRole[role] || [];
    const location = useLocation();

    return (
        <Drawer
            title={null}
            placement="left"
            onClose={onClose}
            open={isOpen}
            closeIcon={<CloseOutlined style={{ fontSize: 20 }} />}
            width={DRAWER_WIDTH}
            style={{ top: 70 }}
            mask={false}
        >
            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",    // THÊM DÒNG NÀY
                    alignItems: "flex-start",    // Đảm bảo mục menu vẫn bám lề trái
                    minHeight: "100%",
                    height: "calc(100vh - 64px)", // <-- Sửa dòng này!
                    overflowY: "auto",
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            >
                {navigations.map(({ title, path, icon }) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link
                            key={title}
                            to={path}
                            onClick={onClose}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                                padding: "14px 28px",
                                fontSize: "16px",
                                color: isActive ? "#1890ff" : "#333",
                                textDecoration: "none",
                                borderRadius: "0 24px 24px 0",
                                background: isActive ? "#e6f7ff" : "transparent",
                                fontWeight: isActive ? 600 : 400,
                                margin: "2px 0",
                                cursor: "pointer",
                                transition: "background 0.2s,color 0.2s"
                            }}
                        >
                            {React.cloneElement(icon, { style: { fontSize: 20 } })}
                            <span>{title}</span>
                        </Link>
                    );
                })}
            </nav>
        </Drawer>
    );
};

export default MenuComponent;
