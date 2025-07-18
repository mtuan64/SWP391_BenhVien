import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import {
  Table,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Typography,
  Space,
  Modal,
  message,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const UserMedicalProfileDetail = () => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const doctor = JSON.parse(localStorage.getItem("user"));

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:9999/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      message.error("Failed to fetch services");
    }
  };

  const fetchProfiles = async () => {
    try {
      const res = await fetch("http://localhost:9999/api/doctor");
      const data = await res.json();
      setProfiles(data.data);
    } catch (err) {
      message.error("Failed to load profiles");
    }
  };

  useEffect(() => {
    fetchProfiles();
    fetchServices();
  }, []);

  const handleSearchIdentity = async (identityNumber) => {
    try {
      const res = await fetch(`http://localhost:9999/api/users/identity/${identityNumber}`);
      const data = await res.json();

      if (!data || !data._id) {
        message.warning("No user found with this identity number");
        return;
      }

      form.setFieldsValue({
        name: data.name,
        dateOfBirth: dayjs(data.dateOfBirth),
        gender: data.gender,
        userId: data._id,
      });
    } catch (err) {
      message.error("Failed to fetch user info");
    }
  };

  const handleSubmit = async (values) => {
    const payload = {
      userId: values.userId,
      identityNumber: values.identityNumber,
      name: values.name,
      dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
      gender: values.gender,
      service: values.service, // <-- _id of the selected service
      doctorId: doctor._id,
    };

    try {
      await fetch("http://localhost:9999/api/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      message.success("Medical profile created");
      form.resetFields();
      fetchProfiles();
    } catch (err) {
      message.error("Error creating profile");
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
      await axios.delete(`/api/medical-profiles/${profileId}`);
      message.success("Deleted successfully");
      fetchProfiles();
    } catch (error) {
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
    { title: "Identity Number", dataIndex: "identityNumber" },
    { title: "Diagnose", dataIndex: "diagnose" },
    { title: "Note", dataIndex: "note" },
    { title: "Issues", dataIndex: "issues" },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this profile?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Manage Medical Profiles</Title>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="identityNumber"
          label="Identity Number"
          rules={[{ required: true, message: "Please enter identity number" }]}
        >
          <Input.Search
            placeholder="Enter Identity Number"
            enterButton="Find"
            onSearch={handleSearchIdentity}
          />
        </Form.Item>

        <Form.Item name="name" label="Name">
          <Input disabled />
        </Form.Item>

        <Form.Item name="dateOfBirth" label="Date of Birth">
          <DatePicker disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Select disabled>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="service"
          label="Services"
          rules={[
            {
              required: true,
              message: "Please select at least one service",
            },
            {
              validator: (_, value) =>
                value && value.length <= 6
                  ? Promise.resolve()
                  : Promise.reject("You can select up to 5 services only"),
            },
          ]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              {services.map((s) => (
                <Checkbox key={s._id} value={s._id}>
                  {s.name} - ${s.price}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item name="userId" hidden>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Medical Profile
          </Button>
        </Form.Item>
      </Form>

      <br />
      <Title level={4}>Profile List</Title>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={profiles}
        loading={!profiles.length}
      />

      <Modal
        title="Edit Medical Profile"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          modalForm.resetFields();
          setEditingId(null);
        }}
        footer={null}
      >
        <Form layout="vertical" form={modalForm} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: "Please select a date of birth" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select a gender" }]}
          >
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