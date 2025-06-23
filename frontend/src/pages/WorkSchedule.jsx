"use client"

import {useEffect, useState} from "react"

// Sample appointment data based on your structure
const sampleAppointments = [
    {
        _id: "6850587cab69d58f66971465",
        userId: "665f9c3ad2f496a82968e111",
        profileId: "665f9c3ad2f496a82968e112",
        doctorId: "665f9c3ad2f496a82968e113",
        department: "Cardiology",
        appointmentDate: "2025-06-20T10:00:00.000+00:00",
        type: "Offline",
        status: "Booked",
        reminderSent: false,
        createdAt: "2025-06-16T17:46:36.799+00:00",
        updatedAt: "2025-06-16T17:46:36.799+00:00",
        patientName: "Nguyễn Văn A",
    },
    {
        _id: "6850587cab69d58f66971466",
        userId: "665f9c3ad2f496a82968e114",
        profileId: "665f9c3ad2f496a82968e115",
        doctorId: "665f9c3ad2f496a82968e113",
        department: "Cardiology",
        appointmentDate: "2025-06-20T14:30:00.000+00:00",
        type: "Online",
        status: "Confirmed",
        reminderSent: true,
        createdAt: "2025-06-16T18:30:15.799+00:00",
        updatedAt: "2025-06-16T18:30:15.799+00:00",
        patientName: "Trần Thị B",
    },
    {
        _id: "6850587cab69d58f66971467",
        userId: "665f9c3ad2f496a82968e116",
        profileId: "665f9c3ad2f496a82968e117",
        doctorId: "665f9c3ad2f496a82968e113",
        department: "Cardiology",
        appointmentDate: "2025-06-21T09:00:00.000+00:00",
        type: "Offline",
        status: "Pending",
        reminderSent: false,
        createdAt: "2025-06-17T09:15:22.799+00:00",
        updatedAt: "2025-06-17T09:15:22.799+00:00",
        patientName: "Lê Văn C",
    },
]

export default function WorkSchedulePage() {
    const [appointments, setAppointments] = useState(sampleAppointments);

    useEffect( () => {
        const fetchData = async () => {
            const resp = await fetch("http://localhost:9999/api/work-schedule/all");
            if (!resp.ok) {
                setAppointments([]);
                return;
            }

            const respJson = await resp.json();
            console.log("response", respJson);
            setAppointments(respJson.data)
        }
        fetchData();
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Booked":
                return "#4CAF50"
            case "Confirmed":
                return "#2196F3"
            case "Pending":
                return "#FF9800"
            case "Cancelled":
                return "#F44336"
            default:
                return "#757575"
        }
    }

    return (
        <div style={styles.container}>
            {/* Main Content */}
            <main style={styles.main}>
                <div style={styles.contentWrapper}>
                    {/* Tab Navigation */}
                    <div style={styles.tabContainer}>
                        <div style={styles.tabActive}>📅 Lịch Làm Việc</div>
                    </div>

                    {/* Schedule Card */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h2 style={styles.cardTitle}>Lịch Làm Việc Hôm Nay</h2>
                            <p style={styles.cardSubtitle}>Quản lý và xem lịch hẹn của bệnh nhân</p>
                        </div>

                        <div style={styles.cardContent}>
                            {/* Appointments List */}
                            <div style={styles.appointmentsList}>
                                <h3 style={styles.listTitle}>Danh Sách Lịch Hẹn ({appointments.length})</h3>

                                {appointments.length === 0 ? (
                                    <div style={styles.emptyState}>
                                        <p>Không có lịch hẹn nào</p>
                                    </div>
                                ) : (
                                    <div style={styles.appointmentsGrid}>
                                        {appointments.map((appointment) => (
                                            <div key={appointment._id} style={styles.appointmentCard}>
                                                <div style={styles.appointmentHeader}>
                                                    <div style={styles.appointmentTime}>
                                                        <span style={styles.timeText}>{formatTime(appointment.appointmentDate)}</span>
                                                        <span style={styles.dateText}>{formatDate(appointment.appointmentDate)}</span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            ...styles.statusBadge,
                                                            backgroundColor: getStatusColor(appointment.status),
                                                        }}
                                                    >
                                                        {appointment.status}
                                                    </div>
                                                </div>

                                                <div style={styles.appointmentBody}>
                                                    <h4 style={styles.patientName}>{appointment.patientName}</h4>
                                                    <div style={styles.appointmentDetails}>
                                                        <span style={styles.detailItem}>🏥 {appointment.department}</span>
                                                        <span style={styles.detailItem}>
                              {appointment.type === "Online" ? "💻" : "🏥"} {appointment.type}
                            </span>
                                                        <span style={styles.detailItem}>
                              {appointment.reminderSent ? "✅" : "⏰"}
                                                            {appointment.reminderSent ? " Đã nhắc" : " Chưa nhắc"}
                            </span>
                                                    </div>
                                                </div>

                                                <div style={styles.appointmentActions}>
                                                    <button style={styles.actionBtn}>Xem Chi Tiết</button>
                                                    <button style={styles.actionBtnSecondary}>Chỉnh Sửa</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        margin: 0,
        padding: 0,
    },
    header: {
        backgroundColor: "white",
        borderBottom: "1px solid #e0e6ed",
        padding: "1rem 0",
    },
    headerContent: {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
    },
    logo: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#1976d2",
        margin: 0,
    },
    nav: {
        display: "flex",
        alignItems: "center",
        gap: "2rem",
    },
    navLink: {
        textDecoration: "none",
        color: "#333",
        fontSize: "0.9rem",
    },
    appointmentBtn: {
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
    },
    main: {
        padding: "2rem 0",
    },
    contentWrapper: {
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "0 2rem",
    },
    tabContainer: {
        display: "flex",
        marginBottom: "1rem",
    },
    tabActive: {
        backgroundColor: "white",
        padding: "0.75rem 1.5rem",
        borderRadius: "8px 8px 0 0",
        borderBottom: "2px solid #4285f4",
        color: "#4285f4",
        fontWeight: "500",
    },
    tab: {
        backgroundColor: "#f8f9fa",
        padding: "0.75rem 1.5rem",
        borderRadius: "8px 8px 0 0",
        color: "#666",
        cursor: "pointer",
    },
    card: {
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
    },
    cardHeader: {
        padding: "1.5rem",
        borderBottom: "1px solid #e0e6ed",
    },
    cardTitle: {
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#333",
        margin: "0 0 0.5rem 0",
    },
    cardSubtitle: {
        color: "#666",
        fontSize: "0.9rem",
        margin: 0,
    },
    cardContent: {
        padding: "1.5rem",
    },
    appointmentsList: {
        marginTop: "2rem",
    },
    listTitle: {
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#333",
        marginBottom: "1rem",
    },
    emptyState: {
        textAlign: "center",
        padding: "2rem",
        color: "#666",
    },
    appointmentsGrid: {
        display: "grid",
        gap: "1rem",
        marginBottom: "2rem",
    },
    appointmentCard: {
        border: "1px solid #e0e6ed",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#fafbfc",
    },
    appointmentHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "0.75rem",
    },
    appointmentTime: {
        display: "flex",
        flexDirection: "column",
    },
    timeText: {
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#333",
    },
    dateText: {
        fontSize: "0.85rem",
        color: "#666",
    },
    statusBadge: {
        color: "white",
        padding: "0.25rem 0.75rem",
        borderRadius: "12px",
        fontSize: "0.8rem",
        fontWeight: "500",
    },
    appointmentBody: {
        marginBottom: "1rem",
    },
    patientName: {
        fontSize: "1rem",
        fontWeight: "600",
        color: "#333",
        margin: "0 0 0.5rem 0",
    },
    appointmentDetails: {
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
    },
    detailItem: {
        fontSize: "0.85rem",
        color: "#666",
    },
    appointmentActions: {
        display: "flex",
        gap: "0.5rem",
    },
    actionBtn: {
        backgroundColor: "#4285f4",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        fontSize: "0.85rem",
        cursor: "pointer",
    },
    actionBtnSecondary: {
        backgroundColor: "transparent",
        color: "#4285f4",
        border: "1px solid #4285f4",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        fontSize: "0.85rem",
        cursor: "pointer",
    },
}
