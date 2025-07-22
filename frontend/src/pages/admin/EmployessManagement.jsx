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
  Drawer,
  Descriptions,
} from "antd";
import axios from "axios";
import moment from "moment";
import "../../assets/css/AdminPages.css";
const { Option } = Select;
const { RangePicker } = DatePicker;

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/admin/employees");
      setEmployees(res.data);
    } catch (err) {
      message.error("Failed to fetch employees");
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("/api/admin/getDepart");
      setDepartments(res.data);
    } catch (err) {
      message.error("Failed to fetch departments");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/delEmp/${id}`);
      message.success("Employee deleted");
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    form.setFieldsValue({
      ...employee,
      department: employee.department?._id || undefined,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`/api/admin/updEmp/${editingEmployee._id}`, values);
      notification.success({ message: "Employee updated" });
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      notification.error({ message: "Update failed" });
    }
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      await axios.post("/api/admin/createEmp", values);
      notification.success({ message: "Employee created" });
      setCreateModalVisible(false);
      createForm.resetFields();
      fetchEmployees();
    } catch (err) {
      notification.error({ message: "Create failed" });
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchName = emp.name.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = statusFilter ? emp.status === statusFilter : true;
    const matchRole = roleFilter ? emp.role === roleFilter : true;
    const matchDate = dateRange
      ? new Date(emp.createdAt) >= dateRange[0] &&
        new Date(emp.createdAt) <= dateRange[1]
      : true;
    return matchName && matchStatus && matchRole && matchDate;
  });

  return (
    <div>
      <h1>Employee Management</h1>
      {/* Filters */}
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
          placeholder="Filter by role"
          onChange={(value) => setRoleFilter(value)}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="Admin">Admin</Option>
          <Option value="Staff">Staff</Option>
          <Option value="Doctor">Doctor</Option>
        </Select>

        <Select
          placeholder="Filter by status"
          onChange={(value) => setStatusFilter(value)}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
        <RangePicker
          onChange={(dates) => setDateRange(dates)}
          allowClear
          format="YYYY-MM-DD"
        />
        <Button
          onClick={() => {
            setSearchText("");
            setStatusFilter(null);
            setDateRange(null);
            setRoleFilter(null);
          }}
        >
          Reset
        </Button>
        <Button
          type="primary"
          className="custom-add-button"
          onClick={() => setCreateModalVisible(true)}
        >
          Add Employee
        </Button>
      </div>

      {/* Table */}
      <Table
        dataSource={filteredEmployees}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
              <Button type="link" onClick={() => setViewingEmployee(record)}>
                {text}
              </Button>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          { title: "Email", dataIndex: "email" },
          { title: "Role", dataIndex: "role" },
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

      {/* Employee Detail Drawer */}
      <Drawer
        title="Employee Details"
        open={!!viewingEmployee}
        onClose={() => setViewingEmployee(null)}
        width={400}
      >
        {viewingEmployee && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">
              {viewingEmployee.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {viewingEmployee.email}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              {viewingEmployee.role}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {viewingEmployee.status}
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {viewingEmployee?.department?.name || "—"}
            </Descriptions.Item>

            <Descriptions.Item label="Specialization">
              {viewingEmployee.specialization || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {viewingEmployee.phone || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {moment(viewingEmployee.createdAt).format("YYYY-MM-DD HH:mm")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>

      {/* Edit Employee Modal */}
      <Modal
        title="Edit Employee"
        open={!!editingEmployee}
        onCancel={() => setEditingEmployee(null)}
        onOk={handleEditSubmit}
        okText="Save"
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Staff">Staff</Option>
              <Option value="Doctor">Doctor</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select department">
              {departments.map((dept) => (
                <Option key={dept._id} value={dept._id}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Specialization" name="specialization">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Employee Modal */}
      <Modal
        title="Add New Employee"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={handleCreate}
        okText="Create"
        destroyOnHidden
      >
        <Form form={createForm} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Staff">Staff</Option>
              <Option value="Doctor">Doctor</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployeeManagement;
