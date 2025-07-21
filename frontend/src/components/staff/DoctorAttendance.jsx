// pages/DoctorAttendance.jsx
import { useEffect, useState } from "react";
import { Button, Card, Typography, message } from "antd";

const { Title, Text } = Typography;

const DoctorAttendance = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [loading, setLoading] = useState(true);

  const doctor = JSON.parse(localStorage.getItem("user")); // Ensure doctor._id exists

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`http://localhost:9999/api/attendance/status/${doctor._id}`);
        const data = await res.json();

        if (data) {
          setHasCheckedIn(true);
          if (data.checkOutTime) {
            setHasCheckedOut(true);
          }
        }
      } catch (err) {
        message.error("Failed to load attendance status");
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [doctor._id]);

  const handleCheckIn = async () => {
    try {
      const res = await fetch("http://localhost:9999/api/attendance/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: doctor._id }),
      });

      if (!res.ok) throw new Error((await res.json()).message);
      message.success("Checked in successfully!");
      setHasCheckedIn(true);
    } catch (err) {
      message.error("Check-in failed: " + err.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await fetch("http://localhost:9999/api/attendance/checkout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: doctor._id }),
      });

      if (!res.ok) throw new Error((await res.json()).message);
      message.success("Checked out successfully!");
      setHasCheckedOut(true);
    } catch (err) {
      message.error("Check-out failed: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card style={{ maxWidth: 500, margin: "auto", marginTop: 50, textAlign: "center" }}>
      <Title level={3}>Doctor Attendance</Title>
      <Text strong>Doctor: {doctor.name}</Text>
      <br /><br />
      <Button
        type="primary"
        onClick={handleCheckIn}
        disabled={hasCheckedIn}
      >
        Check In
      </Button>
      <br /><br />
      <Button
        type="default"
        onClick={handleCheckOut}
        disabled={!hasCheckedIn || hasCheckedOut}
      >
        Check Out
      </Button>
    </Card>
  );
};

export default DoctorAttendance;
