import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Input,
  Button,
  Switch,
  Space,
  Select,
  Typography,
  DatePicker,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
import dayjs from "dayjs";

const { Search } = Input;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [readFilter, setReadFilter] = useState("all");
  const [dateRange, setDateRange] = useState([]);
  const { token, user } = useAuth();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/user/getNoti", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.notifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifies = notifications
    .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
    .filter((n) => {
      if (urgencyFilter === "urgent") return n.isUrgent;
      if (urgencyFilter === "normal") return !n.isUrgent;
      return true;
    })
    .filter((n) => {
      const isRead = n.isReadBy.includes(user._id);
      if (readFilter === "read") return isRead;
      if (readFilter === "unread") return !isRead;
      return true;
    })
    .filter((n) => {
      if (dateRange.length === 2) {
        const createdAt = dayjs(n.createdAt);
        return (
          createdAt.isAfter(dateRange[0].startOf("day")) &&
          createdAt.isBefore(dateRange[1].endOf("day"))
        );
      }
      return true;
    });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => {
        const isUnread = !record.isReadBy.includes(user._id);
        return (
          <Link to={`/notifications/${record._id}` } style={{ textDecoration: "none" }}>
            <span style={{ fontWeight: isUnread ? "bold" : "normal" }}>
              {text}
              {isUnread && <Tag color="processing" style={{ marginLeft: 8 }}>Unread</Tag>}
            </span>
          </Link>
        );
      },
    },
    {
      title: "Urgency",
      dataIndex: "isUrgent",
      render: (urgent) =>
        urgent ? <Tag color="red">URGENT</Tag> : <Tag>Normal</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>🛎️ Notification Center</Title>

      <Space style={{ marginBottom: 16 }} wrap>
        <Search
          placeholder="🔍 Search by title"
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 230 }}
        />

        <Select
          value={urgencyFilter}
          onChange={setUrgencyFilter}
          style={{ width: 140 }}
        >
          <Option value="all">All Urgencies</Option>
          <Option value="urgent">Urgent</Option>
          <Option value="normal">Normal</Option>
        </Select>

        <Select
          value={readFilter}
          onChange={setReadFilter}
          style={{ width: 140 }}
        >
          <Option value="all">All Read Status</Option>
          <Option value="read">Read</Option>
          <Option value="unread">Unread</Option>
        </Select>

        <RangePicker
          value={dateRange}
          onChange={(val) => setDateRange(val || [])}
          style={{ width: 280 }}
          placeholder={["Start date", "End date"]}
        />

        <Button
          onClick={() => {
            setSearch("");
            setUrgencyFilter("all");
            setReadFilter("all");
            setDateRange([]);
          }}
        >
          Reset Filters
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredNotifies}
        rowKey="_id"
        rowClassName={(record) =>
          !record.isReadBy.includes(user._id) ? "unread-row" : ""
        }
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default NotificationCenter;
