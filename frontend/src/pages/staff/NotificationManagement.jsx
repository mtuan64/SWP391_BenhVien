import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  DatePicker,
  Switch,
  Modal,
  Form,
  message,
  Space,
  Tag,
  AutoComplete,
} from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/authContext";

const { RangePicker } = DatePicker;
const { confirm } = Modal;

const NotificationManagement = () => {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [userEmails, setUserEmails] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const fetchUserEmails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9999/api/staff/getAllUserEmails",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserEmails(res.data);
    } catch (err) {
      message.error("Failed to fetch user emails");
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:9999/api/staff/getNoti", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
      setFiltered(res.data);
    } catch (err) {
      message.error("Failed to fetch notifications");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filter logic
  const handleSearch = (values) => {
    const { title, receiver, dateRange, isUrgent } = values;

    let filteredData = [...notifications];

    if (title) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (receiver) {
      filteredData = filteredData.filter(
        (item) =>
          (item.receiver &&
            item.receiver.email
              .toLowerCase()
              .includes(receiver.toLowerCase())) ||
          (receiver.toLowerCase() === "all" && item.receiver === null)
      );
    }

    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange;
      filteredData = filteredData.filter((item) =>
        moment(item.createdAt).isBetween(start, end, null, "[]")
      );
    }

    if (isUrgent !== undefined) {
      filteredData = filteredData.filter((item) => item.isUrgent === isUrgent);
    }

    setFiltered(filteredData);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Confirm delete",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await axios.delete(`http://localhost:9999/api/staff/deleteNoti/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Deleted");
        fetchNotifications();
      },
    });
  };

  const handleCreate = async (values) => {
    await axios.post("http://localhost:9999/api/staff/createNoti", values, {
      headers: { Authorization: `Bearer ${token}` },
    });
    message.success("Notification created");
    setShowModal(false);
    form.resetFields();
    fetchNotifications();
  };

  const handleToggleUrgent = async (id, isUrgent) => {
    await axios.put(
      `http://localhost:9999/api/staff/urgent/${id}`,
      { isUrgent },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchNotifications();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      ellipsis: true,
    },
    {
      title: "Receiver",
      dataIndex: ["receiver", "email"],
      render: (email, record) => email || <Tag color="blue">All users</Tag>,
    },
    {
      title: "Urgent",
      dataIndex: "isUrgent",
      render: (isUrgent, record) => (
        <Switch
          checked={isUrgent}
          onChange={(checked) => handleToggleUrgent(record._id, checked)}
        />
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Notification Management</h2>
      <Form
        layout="inline"
        onFinish={handleSearch}
        onValuesChange={(_, values) => handleSearch(values)} // instant update on any change
      >
        {/* search fields */}
        <Form.Item name="title">
          <Input placeholder="Search Title" allowClear />
        </Form.Item>
        <Form.Item name="receiver">
          <Input placeholder="Receiver Email / all" allowClear />
        </Form.Item>
        <Form.Item name="dateRange">
          <RangePicker placeholder={["Start date", "End date"]} />
        </Form.Item>
        <Form.Item name="isUrgent" valuePropName="checked">
          <Switch checkedChildren="Urgent" unCheckedChildren="Normal" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => {
              form.resetFields();
              setFiltered(notifications); // reset table to all notifications
            }}
          >
            Reset
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setShowModal(true);
              fetchUserEmails();
            }}
          >
            New Notification
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="_id"
        loading={loading}
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Create Notification"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="receiverEmail" label="Receiver Email (optional)">
            <AutoComplete
              options={filteredOptions}
              onSearch={(value) => {
                if (value) {
                  const filtered = userEmails
                    .filter((email) =>
                      email.toLowerCase().includes(value.toLowerCase())
                    )
                    .map((email) => ({ value: email }));
                  setFilteredOptions(filtered);
                } else {
                  setFilteredOptions([]);
                }
              }}
              placeholder="Type email — leave empty for all"
            />
          </Form.Item>

          <Form.Item name="isUrgent" valuePropName="checked">
            <Switch checkedChildren="Urgent" unCheckedChildren="Normal" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NotificationManagement;
