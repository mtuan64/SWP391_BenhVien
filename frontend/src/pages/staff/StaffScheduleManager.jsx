import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, Button, Input, DatePicker, Select, TimePicker,
  Space, Form, message, Typography, Divider, Modal, Popconfirm, Tag
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
      message.error('Không thể lấy lịch');
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('/api/staff/departments');
      setDepartments(res.data);
    } catch (err) {
      message.error('Không thể tìm được các khoa');
    }
  };

  const fetchEmployeesByDepartment = async (departmentName) => {
    try {
      const res = await axios.get(`/api/staff/employees?department=${departmentName}`);
      setEmployees(res.data);
    } catch (err) {
      message.error('Không thể tìm được nhân viên');
    }
  };

  const handleDepartmentChange = (value) => {
    form.setFieldValue('employeeId', undefined);
    fetchEmployeesByDepartment(value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/staff/schedule/${id}`);
      message.success('Lịch đã xóa');
      fetchSchedules();
    } catch (err) {
      message.error('Không xóa được lịch');
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
        message.success('Lịch trình đã cập nhật');
      } else {
        await axios.post('/api/staff/schedule', payload);
        message.success('Lịch đã được tạo');
      }

      form.resetFields();
      setEditingId(null);
      setIsModalVisible(false);
      fetchSchedules();
    } catch (err) {
      console.error(err);
      message.error('Lỗi khi lưu lịch');
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

  // Disable past dates in DatePicker
  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < dayjs().startOf('day');
  };

  const columns = [
    {
      title: 'Bác sĩ',
      dataIndex: 'employeeId',
      render: emp => typeof emp === 'object' ? emp.name || emp._id : emp
    },
    {
      title: 'Khoa',
      dataIndex: 'department',
      render: (depId) => {
        const dep = departments.find(d => d._id === (depId?._id || depId));
        return dep?.name || 'N/A';
      }
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      render: date => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Khung giờ',
      dataIndex: 'timeSlots',
      render: slots => (
        <ul style={{ marginBottom: 0 }}>
          {slots.map((s, idx) => (
            <li key={idx}>
              {dayjs(s.startTime).format('HH:mm')} - {dayjs(s.endTime).format('HH:mm')}
            </li>
          ))}
        </ul>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'timeSlots',
      render: slots => (
        <ul style={{ marginBottom: 0 }}>
          {slots.map((slot, idx) => (
            <li key={idx}>
              <Tag color={
                slot.status === 'Available'
                  ? 'green'
                  : slot.status === 'Booked'
                  ? 'volcano'
                  : slot.status === 'Unavailable'
                  ? 'red'
                  : 'default'
              }>
                {slot.status}
              </Tag>
            </li>
          ))}
        </ul>
      )
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => handleDelete(record._id)}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý lịch bác sĩ</Title>

      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Tìm kiếm theo tên bác sĩ"
          onSearch={value => setSearchText(value)}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
          value={searchText}
        />
        <Select
          placeholder="Lọc theo phòng ban"
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
          placeholder="Lọc theo ngày"
          onChange={value => setFilterDate(value)}
          style={{ width: 200 }}
          value={filterDate}
        />
        <Button onClick={clearFilters}>Xóa Filter</Button>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingId(null);
            setIsModalVisible(true);
          }}
        >
          Thêm lịch
        </Button>
      </Space>

      <Divider />

      <Table rowKey="_id" dataSource={filteredSchedules} columns={columns} />

      <Modal
        title={editingId ? "Chỉnh sửa lịch" : "Tạo lịch"}
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
            label="Khoa"
            name="department"
            rules={[{ required: true, message: 'Vui lòng chọn khoa' }]}
          >
            <Select placeholder="Chọn khoa" onChange={handleDepartmentChange}>
              {departments.map(dep => (
                <Option key={dep._id} value={dep._id}>{dep.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Bác sĩ"
            name="employeeId"
            rules={[{ required: true, message: 'Vui lòng chọn bác sĩ' }]}
          >
            <Select placeholder="Chọn bác sĩ" allowClear>
              {employees.map(emp => (
                <Option key={emp._id} value={emp._id}>{emp.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày"
            name="date"
            rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
          >
            <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
          </Form.Item>
          <Form.List name="timeSlots" initialValue={[{ timeRange: [], status: 'Available' }]}>
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }, index) => (
        <Space key={key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
          <Form.Item
            {...restField}
            name={[name, 'timeRange']}
            rules={[
              { required: true, message: 'Chọn khoảng thời gian' },
              {
                validator: async (_, value) => {
                  if (!value || value.length !== 2) return;

                  const allSlots = form.getFieldValue('timeSlots');
                  const currentStart = value[0];
                  const currentEnd = value[1];

                  if (!currentStart || !currentEnd) return;

                  const hasOverlap = allSlots.some((slot, idx) => {
                    if (idx === index) return false; // skip current
                    const [start, end] = slot.timeRange || [];
                    if (!start || !end) return false;
                    return (
                      currentStart.isBefore(end) &&
                      currentEnd.isAfter(start)
                    );
                  });

                  if (hasOverlap) {
                    throw new Error('Khung giờ bị trùng với khoảng khác');
                  }
                }
              }
            ]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, 'status']}
            rules={[{ required: true, message: 'Chọn trạng thái' }]}
          >
            <Select style={{ width: 120 }}>
              <Option value="Available">Available</Option>
              <Option value="Booked">Booked</Option>
            </Select>
          </Form.Item>

          <Button danger onClick={() => remove(name)}>X</Button>
        </Space>
      ))}
      <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
        Thêm khung giờ
      </Button>
    </>
  )}
</Form.List>

        </Form>
      </Modal>
    </div>
  );
}

export default StaffScheduleManager;
