import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Tag,
  Input,
  Modal,
  Form,
  Select,
  DatePicker,
  Space,
  notification,
} from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/delUser/${id}`);
      message.success("User deleted");
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
      message.error("Delete failed");
    }
  };

  const handleChangeStatus = async (id) => {
    try {
      await axios.put(`/api/admin/changeStatus/${id}`);
      notification.success({
        message: "Success",
        description: "User status updated successfully.",
        placement: "topRight",
      });
      fetchUsers();
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Failed to update status",
        placement: "topRight",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
  const matchName = user.name.toLowerCase().includes(searchText.toLowerCase());
  const matchStatus = statusFilter ? user.status === statusFilter : true;
  const matchDate = dateRange
    ? new Date(user.createdAt) >= dateRange[0] && new Date(user.createdAt) <= dateRange[1]
    : true;
  return matchName && matchStatus && matchDate;
});
  

console.log(filteredUsers);
  return (
    <div>
      <h1>
        User Management
      </h1>
      <div
        style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by status"
          onChange={(value) => setStatusFilter(value)}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
        <RangePicker onChange={(dates) => setDateRange(dates)} allowClear format="YYYY-MM-DD"/>
        <Button
          onClick={() => {
            setSearchText("");
            setStatusFilter(null);
            setDateRange(null);
          }}
        >
          Reset Filters
        </Button>
      </div>

      <Table
        dataSource={filteredUsers}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          { title: "Email", dataIndex: "email" },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
              <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
            ),
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
            render: (createdAt) => moment(createdAt).format("YYYY-MM-DD HH:mm"),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
          },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button
                  type="primary"
                  danger={record.status === "active"}
                  onClick={() => handleChangeStatus(record._id)}
                >
                  {record.status === "active" ? "Deactivate" : "Activate"}
                </Button>
                <Button danger onClick={() => handleDelete(record._id)}>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        rowKey="_id"
      />
    </div>
  );
}

export default UserManagement;
