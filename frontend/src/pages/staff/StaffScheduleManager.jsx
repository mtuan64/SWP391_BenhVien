import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, Button, Input, DatePicker, Select, TimePicker,
  Space, Form, message, Typography, Divider, Modal, Popconfirm
} from 'antd';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

function StaffScheduleManager() {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterDepartment, setFilterDepartment] = useState(null);
  const [filterDate, setFilterDate] = useState(null);

  useEffect(() => {
    fetchSchedules();
    fetchDepartments();
  }, []);

  useEffect(() => {
    let result = schedules;
    
    if (searchText) {
      result = result.filter(schedule => 
        (typeof schedule.employeeId === 'object' 
          ? schedule.employeeId.name?.toLowerCase()
          : schedule.employeeId?.toLowerCase()
        )?.includes(searchText.toLowerCase())
      );
    }

    if (filterDepartment) {
      result = result.filter(schedule => schedule.department === filterDepartment);
    }

    if (filterDate) {
      result = result.filter(schedule => 
        dayjs(schedule.date).format('YYYY-MM-DD') === filterDate.format('YYYY-MM-DD')
      );
    }

    setFilteredSchedules(result);
  }, [schedules, searchText, filterDepartment, filterDate]);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get('/api/staff/schedule');
      setSchedules(res.data);
    } catch (err) {
      message.error('Failed to fetch schedules');
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('/api/staff/departments');
      setDepartments(res.data);
    } catch (err) {
      message.error('Failed to fetch departments');
    }
  };

  const fetchEmployeesByDepartment = async (departmentName) => {
    try {
      const res = await axios.get(`/api/staff/employees?department=${departmentName}`);
      setEmployees(res.data);
    } catch (err) {
      message.error('Failed to fetch employees');
    }
  };

  const handleDepartmentChange = (value) => {
    form.setFieldValue('employeeId', undefined);
    fetchEmployeesByDepartment(value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/staff/schedule/${id}`);
      message.success('Schedule deleted');
      fetchSchedules();
    } catch (err) {
      message.error('Failed to delete schedule');
    }
  };

  const onFinish = async (values) => {
    const payload = {
      employeeId: values.employeeId,
      department: values.department,
      date: values.date.format('YYYY-MM-DD'),
      timeSlots: values.timeSlots.map(slot => ({
        startTime: slot.timeRange[0].toISOString(),
        endTime: slot.timeRange[1].toISOString(),
        status: slot.status
      }))
    };

    try {
      if (editingId) {
        await axios.put(`/api/staff/schedule/${editingId}`, payload);
        message.success('Schedule updated');
      } else {
        await axios.post('/api/staff/schedule', payload);
        message.success('Schedule created');
      }

      form.resetFields();
      setEditingId(null);
      setIsModalVisible(false);
      fetchSchedules();
    } catch (err) {
      console.error(err);
      message.error('Error saving schedule');
    }
  };

  const handleEdit = (record) => {
    fetchEmployeesByDepartment(record.department);
    form.setFieldsValue({
      employeeId: typeof record.employeeId === 'object' ? record.employeeId._id : record.employeeId,
      department: record.department,
      date: dayjs(record.date),
      timeSlots: record.timeSlots.map(slot => ({
        timeRange: [dayjs(slot.startTime), dayjs(slot.endTime)],
        status: slot.status
      }))
    });
    setEditingId(record._id);
    setIsModalVisible(true);
  };

  const clearFilters = () => {
    setSearchText('');
    setFilterDepartment(null);
    setFilterDate(null);
  };

  const columns = [
    {
      title: 'Doctor',
      dataIndex: 'employeeId',
      render: emp => typeof emp === 'object' ? emp.name || emp._id : emp
    },
    {
      title: 'Department',
      dataIndex: 'department',
      render: (depId) => {
        const dep = departments.find(d => d._id === (depId?._id || depId));
        return dep?.name || 'N/A';
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: date => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Time Slots',
      dataIndex: 'timeSlots',
      render: slots => (
        <ul style={{ marginBottom: 0 }}>
          {slots.map((s, idx) => (
            <li key={idx}>
              {dayjs(s.startTime).format('HH:mm')} - {dayjs(s.endTime).format('HH:mm')} ({s.status})
            </li>
          ))}
        </ul>
      )
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Confirm delete?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Doctor Schedule Management</Title>

      <Space style={{ marginBottom: 16 }}>
  <Search
    placeholder="Search by doctor name"
    onSearch={value => setSearchText(value)}
    onChange={e => setSearchText(e.target.value)}
    style={{ width: 200 }}
    value={searchText}
  />
  <Select
    placeholder="Filter by department"
    allowClear
    style={{ width: 200 }}
    onChange={value => setFilterDepartment(value)}
    value={filterDepartment}
  >
    {departments.map(dep => (
      <Option key={dep._id} value={dep._id}>{dep.name}</Option>
    ))}
  </Select>
  <DatePicker
    placeholder="Filter by date"
    onChange={value => setFilterDate(value)}
    style={{ width: 200 }}
    value={filterDate}
  />
  <Button onClick={clearFilters}>Clear</Button>

  <Button
    type="primary"
    icon={<PlusOutlined />}
    onClick={() => {
      form.resetFields();
      setEditingId(null);
      setIsModalVisible(true);
    }}
  >
    Add Schedule
  </Button>
</Space>

      <Divider />

      <Table rowKey="_id" dataSource={filteredSchedules} columns={columns} />

      <Modal
        title={editingId ? "Edit Schedule" : "Create Schedule"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        onOk={() => form.submit()}
        okText={editingId ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <Select placeholder="Select department" onChange={handleDepartmentChange}>
              {departments.map(dep => (
                <Option key={dep._id} value={dep._id}>{dep.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Doctor"
            name="employeeId"
            rules={[{ required: true, message: 'Please select employee' }]}
          >
            <Select placeholder="Select employee" allowClear>
              {employees.map(emp => (
                <Option key={emp._id} value={emp._id}>{emp.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.List name="timeSlots" initialValue={[{ timeRange: [], status: 'Available' }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'timeRange']}
                      rules={[{ required: true, message: 'Select time range' }]}
                    >
                      <TimePicker.RangePicker format="HH:mm" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'status']}
                      rules={[{ required: true, message: 'Select status' }]}
                    >
                      <Select style={{ width: 120 }}>
                        <Option value="Available">Available</Option>
                        <Option value="Booked">Booked</Option>
                        <Option value="Unavailable">Unavailable</Option>
                      </Select>
                    </Form.Item>
                    <Button danger onClick={() => remove(name)}>-</Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>Add Slot</Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
}

export default StaffScheduleManager;