import { useState, useEffect } from "react";
import { Button, Card, Typography, message } from "antd";

const { Title, Text } = Typography;

const DoctorAttendance = () => {
  const doctor = JSON.parse(localStorage.getItem("user")); // doctor._id
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);

  const checkIn = async () => {
    try {
      const res = await fetch("http://localhost:9999/api/doctor/attendance/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: doctor._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      message.success("Checked in successfully");
      setHasCheckedIn(true);
    } catch (err) {
      message.error(err.message || "Check-in failed");
    }
  };

  const checkOut = async () => {
    try {
      const res = await fetch("http://localhost:9999/api/doctor/attendance/check-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: doctor._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      message.success("Checked out successfully");
      setHasCheckedOut(true);
    } catch (err) {
      message.error(err.message || "Check-out failed");
    }
  };

  return (
    <Card title="Doctor Attendance" style={{ maxWidth: 400, margin: "20px auto" }}>
      <Title level={5}>Welcome, Dr. {doctor.name}</Title>

      <div style={{ marginTop: 16 }}>
        <Text>Status:</Text>{" "}
        <Text strong type={hasCheckedOut ? "danger" : hasCheckedIn ? "success" : "secondary"}>
          {hasCheckedOut ? "Checked Out" : hasCheckedIn ? "Checked In" : "Not Checked In"}
        </Text>
      </div>

      <div style={{ marginTop: 24 }}>
        <Button
          type="primary"
          onClick={checkIn}
          disabled={hasCheckedIn}
          style={{ marginRight: 8 }}
        >
          Check In
        </Button>

        <Button
          type="default"
          danger
          onClick={checkOut}
          disabled={!hasCheckedIn || hasCheckedOut}
        >
          Check Out
        </Button>
      </div>
    </Card>
  );
};

export default DoctorAttendance;
