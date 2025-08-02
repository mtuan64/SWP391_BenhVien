// pages/DoctorAttendance.jsx
import { useEffect, useState } from "react";
import { Button, Card, Typography, message, Table, Empty, Spin } from "antd";

const { Title, Text } = Typography;

const DoctorAttendance = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const employee = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (employee?._id) {
      checkStatus();
    }
  }, [employee._id]);

  const checkStatus = async () => {
    setLoading(true);
    try {
      // Lấy trạng thái điểm danh hôm nay
      const res = await fetch(
        `http://localhost:9999/api/admin/todaystatus/${employee._id}`
      );
      const data = await res.json();

      if (data.status === "Present") {
        setHasCheckedIn(true);
        if (data.checkOutTime) {
          setHasCheckedOut(true);
        }
      }

      // Lấy lịch sử điểm danh
      const historyRes = await fetch(
        `http://localhost:9999/api/attendance/history/${employee._id}`
      );
      const historyData = await historyRes.json();

      if (Array.isArray(historyData)) {
        setAttendanceData(historyData);
      } else {
        setAttendanceData([]);
      }
    } catch (err) {
      message.error("Không thể tải trạng thái điểm danh.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      if (hasCheckedIn) {
        return message.warning("Bạn đã check-in hôm nay.");
      }

      const res = await fetch(
        `http://localhost:9999/api/admin/check-in/${employee._id}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error((await res.json()).message);
      message.success("Check-in thành công!");
      setHasCheckedIn(true);
      checkStatus();
    } catch (err) {
      message.error("Check-in thất bại: " + err.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      if (!hasCheckedIn) {
        return message.warning("Bạn cần check-in trước.");
      }
      if (hasCheckedOut) {
        return message.warning("Bạn đã check-out hôm nay.");
      }

      const res = await fetch(
        `http://localhost:9999/api/admin/check-out/${employee._id}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error((await res.json()).message);
      message.success("Check-out thành công!");
      setHasCheckedOut(true);
      checkStatus();
    } catch (err) {
      message.error("Check-out thất bại: " + err.message);
    }
  };

  const columns = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Giờ Check-in",
      dataIndex: "checkInTime",
      key: "checkInTime",
      render: (text) =>
        text ? (
          new Date(text).toLocaleTimeString()
        ) : (
          <i style={{ color: "gray" }}>Chưa có</i>
        ),
    },
    {
      title: "Giờ Check-out",
      dataIndex: "checkOutTime",
      key: "checkOutTime",
      render: (text) =>
        text ? (
          new Date(text).toLocaleTimeString()
        ) : (
          <i style={{ color: "gray" }}>Chưa có</i>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        switch (text) {
          case "Present":
            return <span style={{ color: "green" }}>Có mặt</span>;
          case "Absent":
            return <span style={{ color: "red" }}>Vắng mặt</span>;
          default:
            return <span>{text}</span>;
        }
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
      render: (text) => text || "-",
    },
  ];

  if (loading) return <Spin style={{ display: "block", marginTop: 100 }} />;

  return (
    <Card style={{ maxWidth: 900, margin: "auto", marginTop: 50 }}>
      <Title level={3}>Điểm danh hôm nay</Title>
      <Text strong>Tên nhân viên:</Text> <Text>{employee?.name}</Text>
      <br />
      <br />
      <Button
        type="primary"
        onClick={handleCheckIn}
        disabled={hasCheckedIn}
        style={{ marginRight: 10 }}
      >
        Check In
      </Button>
      <Button
        type="default"
        onClick={handleCheckOut}
        disabled={!hasCheckedIn || hasCheckedOut}
      >
        Check Out
      </Button>
      <br />
      <br />
      <Title level={4}>Lịch sử điểm danh</Title>
      {attendanceData.length === 0 ? (
        <Empty description="Chưa có dữ liệu điểm danh" />
      ) : (
        <Table
          columns={columns}
          dataSource={attendanceData}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 5 }}
        />
      )}
    </Card>
  );
};

export default DoctorAttendance;
