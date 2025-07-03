import { useState, useEffect } from "react";
import { Table, Form, Input, Button, DatePicker, Select, Typography, Space, Modal, message, Popconfirm } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const UserMedicalProfileDetail = () => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const doctor = JSON.parse(localStorage.getItem("user"));

  const fetchProfiles = async () => {
    try {
      const res = await fetch(`http://localhost:9999/api/doctor`);
      const data = await res.json();
      setProfiles(data.data);
    } catch (err) {
      message.error("Failed to load profiles");
    }
  };


  useEffect(() => {
    fetchProfiles();
  }, []);

  console.log("Doctor ID:", doctor?._id);

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
      doctorId: doctor._id,
    };

    try {
      const url = editingId
        ? `http://localhost:9999/api/doctor/${editingId}`
        : "http://localhost:9999/api/doctor/";

      await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      message.success(editingId ? "Updated successfully" : "Created successfully");
      form.resetFields();
      modalForm.resetFields();
      setEditingId(null);
      setIsModalVisible(false);
      fetchProfiles();
    } catch {
      message.error("Error saving profile");
    }
  };

  const handleEdit = (record) => {
    modalForm.setFieldsValue({
      ...record,
      dateOfBirth: dayjs(record.dateOfBirth),
      doctorId: record.doctorId?._id,
      medicine: record.medicine?._id,
    });
    setEditingId(record._id);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:9999/api/doctor/${id}`, { method: "DELETE" });
      message.success("Deleted successfully");
      fetchProfiles();
    } catch {
      message.error("Delete failed");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Gender", dataIndex: "gender" },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      render: (dob) => dayjs(dob).format("DD/MM/YYYY"),
    },
    { title: "Diagnose", dataIndex: "diagnose" },
    { title: "Note", dataIndex: "note" },
    { title: "Issues", dataIndex: "issues" },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this profile?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Manage Medical Profiles</Title>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        {/* Bỏ Space để Form xử lý từng Form.Item chính xác */}
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter a name" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true, message: "Please select a date of birth" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select a gender" }]}>
          <Select allowClear>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="diagnose" label="Diagnose">
          <Input />
        </Form.Item>

        <Form.Item name="note" label="Note">
          <Input />
        </Form.Item>

        <Form.Item name="issues" label="Issues">
          <Input />
        </Form.Item>

        <Form.Item name="medicine" label="Medicine ID">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Profile
          </Button>
        </Form.Item>
      </Form>


      <br />
      <Title level={4}>Profile List</Title>
      <Table rowKey="_id" columns={columns} dataSource={profiles} loading={!profiles.length} />

      <Modal
        title="Edit Medical Profile"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          modalForm.resetFields();
          setEditingId(null);
        }}
        footer={null} // <-- Tắt nút mặc định của Modal
      >
        <Form layout="vertical" form={modalForm} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter a name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true, message: "Please select a date of birth" }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select a gender" }]}>
            <Select allowClear>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="diagnose" label="Diagnose">
            <Input />
          </Form.Item>
          <Form.Item name="note" label="Note">
            <Input />
          </Form.Item>
          <Form.Item name="issues" label="Issues">
            <Input />
          </Form.Item>
          <Form.Item name="medicine" label="Medicine ID">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default UserMedicalProfileDetail;