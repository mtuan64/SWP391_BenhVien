// src/pages/AdminAttendanceManagement.js
import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Space,
  message,
  Card,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const AttendanceManagement = () => {
  const [attendances, setAttendances] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch attendance + deadline
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [attendanceRes, configRes] = await Promise.all([
        axios.get("/api/admin/attend"),
        axios.get("/api/admin//attend-config"),
      ]);
      setAttendances(attendanceRes.data.attendance || []);
      setFiltered(attendanceRes.data.attendance || []);
      setDeadline(dayjs(configRes.data?.deadlineTime, "HH:mm"));
    } catch (err) {
      message.error("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  // Filter handler
  useEffect(() => {
    let result = [...attendances];

    if (searchName) {
      result = result.filter((a) =>
        a.employeeId.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      result = result.filter((a) => a.status === filterStatus);
    }

    if (filterDate) {
      result = result.filter((a) => dayjs(a.date).isSame(filterDate, "day"));
    }

    setFiltered(result);
  }, [searchName, filterStatus, filterDate, attendances]);

  // Update deadline
  const handleDeadlineUpdate = async () => {
    try {
      await axios.put("/api/admin/upd-config", {
        deadlineTime: deadline.format("HH:mm"),
      });
      message.success("Deadline updated");
    } catch (err) {
      message.error("Failed to update deadline");
    }
  };

  const columns = [
    {
      title: "Employee",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (emp) => (
        <>
          <div>
            <strong>{emp.name}</strong>
          </div>
          <div style={{ color: "#888" }}>{emp.email}</div>
        </>
      ),
    },
    {
      title: "Department",
      dataIndex: "employeeId",
      key: "department",
      render: (emp) => emp.department || "-",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (d) => dayjs(d).format("DD/MM/YYYY"),
    },
    {
      title: "Check-in",
      dataIndex: "checkInTime",
      key: "checkInTime",
      render: (t) => (t ? dayjs(t).format("HH:mm") : "-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "attend" ? (
          <span style={{ color: "green" }}>✅ Attend</span>
        ) : (
          <span style={{ color: "red" }}>❌ Absent</span>
        ),
    },
    {
      title: "Late (min)",
      dataIndex: "lateDuration",
      key: "lateDuration",
      render: (min) => (min ? `${min} phút` : "-"),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card title="Attendance Settings" style={{ marginBottom: 24 }}>
        <Space>
          <span>Deadline Check-in Time:</span>
          <TimePicker value={deadline} onChange={setDeadline} format="HH:mm" />
          <Button type="primary" onClick={handleDeadlineUpdate}>
            Save
          </Button>
        </Space>
      </Card>

      <Card title="Attendance Records">
        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            allowClear
          />
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 150 }}
          >
            <Option value="all">All Status</Option>
            <Option value="attend">Attend</Option>
            <Option value="absent">Absent</Option>
          </Select>
          <DatePicker value={filterDate} onChange={setFilterDate} allowClear />
          <Button
            onClick={() => {
              setSearchName("");
              setFilterStatus("all");
              setFilterDate(null);
            }}
          >
            Clear Filters
          </Button>
        </Space>

        <Table
          rowKey="_id"
          columns={columns}
          dataSource={filtered}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default AttendanceManagement;
