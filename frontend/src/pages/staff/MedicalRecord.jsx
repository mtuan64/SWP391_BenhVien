import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Input,
  Modal,
  Form,
  Select,
  DatePicker,
  Space,
  notification,
  Drawer,
  Descriptions,
  List,
} from "antd";
import axios from "axios";
import moment from "moment";
import "../../assets/css/AdminPages.css";
const { Option } = Select;
const { RangePicker } = DatePicker;

function MedicalRecord() {
  const [profiles, setProfiles] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [services, setServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [genderFilter, setGenderFilter] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [viewingProfile, setViewingProfile] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get("http://localhost:9999/api/staff/profiles", config);
      // Sort profiles by updatedAt in descending order (newest first)
      const sortedProfiles = (res.data.data || []).sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setProfiles(sortedProfiles);
    } catch (err) {
      message.error("Failed to fetch patient profiles");
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get("http://localhost:9999/api/staff/doctors", config);
      setDoctors(res.data.data || []);
    } catch (err) {
      message.error("Failed to fetch doctors");
    }
  };

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get("http://localhost:9999/api/staff/medicines", config);
      setMedicines(res.data.data || []);
    } catch (err) {
      message.error("Failed to fetch medicines");
    }
  };

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get("http://localhost:9999/api/staff/services", config);
      setServices(res.data.data || []);
    } catch (err) {
      message.error("Failed to fetch services");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user || user.role !== "Staff") {
      message.error("Unauthorized access");
      window.location.href = "/";
      return;
    }
    fetchProfiles();
    fetchDoctors();
    fetchMedicines();
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9999/api/staff/profiles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Patient profile deleted");
      setProfiles((prev) => prev.filter((profile) => profile._id !== id));
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    form.setFieldsValue({
      name: profile.name,
      identityNumber: profile.identityNumber,
      gender: profile.gender,
      dateOfBirth: profile.dateOfBirth ? moment(profile.dateOfBirth) : null,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        name: values.name,
        identityNumber: values.identityNumber,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
      };
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:9999/api/staff/profiles/${editingProfile._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notification.success({ message: "Patient profile updated" });
      setEditingProfile(null);
      fetchProfiles();
    } catch (err) {
      notification.error({ message: "Update failed" });
    }
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      const payload = {
        name: values.name,
        identityNumber: values.identityNumber,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
      };
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:9999/api/staff/profiles", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notification.success({ message: "Patient profile created" });
      setCreateModalVisible(false);
      createForm.resetFields();
      fetchProfiles();
    } catch (err) {
      notification.error({ message: "Create failed" });
    }
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchName = profile.name.toLowerCase().includes(searchText.toLowerCase()) ||
                     profile.identityNumber.toLowerCase().includes(searchText.toLowerCase());
    const matchGender = genderFilter ? profile.gender === genderFilter : true;
    const matchDate = dateRange
      ? new Date(profile.createdAt) >= dateRange[0] &&
        new Date(profile.createdAt) <= dateRange[1]
      : true;
    return matchName && matchGender && matchDate;
  });

  return (
    <div>
      <h1>Patient Management</h1>
      {/* Filters */}
      <div
        style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        <Input
          placeholder="Search by profile name or identity number"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by gender"
          onChange={(value) => setGenderFilter(value)}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
        <RangePicker
          onChange={(dates) => setDateRange(dates)}
          allowClear
          format="YYYY-MM-DD"
        />
        <Button
          onClick={() => {
            setSearchText("");
            setGenderFilter(null);
            setDateRange(null);
          }}
        >
          Reset
        </Button>
        <Button
          type="primary"
          className="custom-add-button"
          onClick={() => setCreateModalVisible(true)}
        >
          Add Patient
        </Button>
      </div>

      {/* Table */}
      <Table
        dataSource={filteredProfiles}
        columns={[
          {
            title: "Profile Name",
            dataIndex: "name",
            render: (text, record) => (
              <Button type="link" onClick={() => setViewingProfile(record)}>
                {text}
              </Button>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          { title: "Identity Number", dataIndex: "identityNumber" },
          { title: "Gender", dataIndex: "gender" },
          {
            title: "Date of Birth",
            dataIndex: "dateOfBirth",
            render: (date) => moment(date).format("YYYY-MM-DD"),
            sorter: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth),
          },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button onClick={() => handleEdit(record)}>Edit</Button>
                <Button danger onClick={() => handleDelete(record._id)}>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        rowKey="_id"
      />

      {/* Patient Detail Drawer */}
      <Drawer
        title="Patient Details"
        open={!!viewingProfile}
        onClose={() => setViewingProfile(null)}
        width={400}
      >
        {viewingProfile && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Profile Name">
              {viewingProfile.name}
            </Descriptions.Item>
            <Descriptions.Item label="Identity Number">
              {viewingProfile.identityNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {viewingProfile.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {moment(viewingProfile.dateOfBirth).format("YYYY-MM-DD")}
            </Descriptions.Item>
            <Descriptions.Item label="Diagnosis">
              {viewingProfile.diagnose || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Note">
              {viewingProfile.note || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Issues">
              {viewingProfile.issues || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Doctor">
              {viewingProfile.doctor?.name || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Medicines">
              {viewingProfile.medicines?.length > 0 ? (
                <List
                  dataSource={viewingProfile.medicines}
                  renderItem={(item) => (
                    <List.Item>
                      {item.name} (Type: {item.type}, Price: {item.unitPrice})
                    </List.Item>
                  )}
                />
              ) : (
                "—"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Services">
              {viewingProfile.services?.length > 0 ? (
                <List
                  dataSource={viewingProfile.services}
                  renderItem={(item) => (
                    <List.Item>
                      {item.name} (Price: {item.price})
                    </List.Item>
                  )}
                />
              ) : (
                "—"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Lab Test">
              {viewingProfile.labTest ? (
                <>
                  Result: {viewingProfile.labTest.result || "—"}<br />
                  Date: {viewingProfile.labTest.dayTest ? moment(viewingProfile.labTest.dayTest).format("YYYY-MM-DD") : "—"}
                </>
              ) : (
                "—"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {moment(viewingProfile.createdAt).format("YYYY-MM-DD HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {moment(viewingProfile.updatedAt).format("YYYY-MM-DD HH:mm")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>

      {/* Edit Patient Modal */}
      <Modal
        title="Edit Patient Profile"
        open={!!editingProfile}
        onCancel={() => setEditingProfile(null)}
        onOk={handleEditSubmit}
        okText="Save"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Profile Name"
            name="name"
            rules={[{ required: true, message: "Please input the profile name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Identity Number"
            name="identityNumber"
            rules={[{ required: true, message: "Please input the identity number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select the gender!" }]}
          >
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[{ required: true, message: "Please select the date of birth!" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Patient Modal */}
      <Modal
        title="Add New Patient"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={handleCreate}
        okText="Create"
        destroyOnClose
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            label="Profile Name"
            name="name"
            rules={[{ required: true, message: "Please input the profile name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Identity Number"
            name="identityNumber"
            rules={[{ required: true, message: "Please input the identity number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select the gender!" }]}
          >
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[{ required: true, message: "Please select the date of birth!" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MedicalRecord;