import React, { useEffect, useState } from "react";
import { Button, message, Tag } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const AttendanceAction = ({ employeeId }) => {
  const [status, setStatus] = useState("loading");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTodayStatus = async () => {
    try {
      const res = await axios.get(`/api/attendance/status/${employeeId}`);
      const { status, checkInTime, checkOutTime } = res.data;
      setStatus(status);
      setCheckInTime(checkInTime);
      setCheckOutTime(checkOutTime);
    } catch (err) {
      console.error("Error fetching status", err);
      message.error("Không thể lấy trạng thái điểm danh.");
    }
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/attendance/checkin/${employeeId}`);
      message.success(res.data.message);
      await fetchTodayStatus();
    } catch (err) {
      message.error(err.response?.data?.message || "Lỗi khi check-in.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/attendance/checkout/${employeeId}`);
      message.success(res.data.message);
      await fetchTodayStatus();
    } catch (err) {
      message.error(err.response?.data?.message || "Lỗi khi check-out.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchTodayStatus();
    }
  }, [employeeId]);

  const renderAction = () => {
    if (status === "loading") return null;

    return (
      <div style={{ marginTop: 16 }}>
        {status === "Absent" && (
          <Button type="primary" onClick={handleCheckIn} loading={loading}>
            Check In
          </Button>
        )}
        {status === "Present" && !checkOutTime && (
          <Button type="dashed" onClick={handleCheckOut} loading={loading}>
            Check Out
          </Button>
        )}
        {status === "Present" && checkOutTime && (
          <Tag color="green">Đã Check-out lúc {dayjs(checkOutTime).format("HH:mm")}</Tag>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <div>
        <strong>Trạng thái hôm nay:</strong>{" "}
        {status === "Present" ? (
          <Tag color="green">Có mặt</Tag>
        ) : (
          <Tag color="red">Vắng mặt</Tag>
        )}
      </div>
      {checkInTime && (
        <div>✅ Check-in lúc: {dayjs(checkInTime).format("HH:mm")}</div>
      )}
      {renderAction()}
    </div>
  );
};

export default AttendanceAction;
