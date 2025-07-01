import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Input, DatePicker, Select, TimePicker, Space, Form, message, Typography, Divider } from 'antd';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Popconfirm } from 'antd';

const { Title } = Typography;
const { Option } = Select;

function StaffScheduleManager() {
    const [schedules, setSchedules] = useState([]);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        fetchSchedules();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/staff/schedule/${id}`);
            message.success('Schedule deleted');
            fetchSchedules(); // cập nhật lại danh sách
        } catch (err) {
            message.error('Failed to delete schedule');
        }
    };


    const fetchSchedules = async () => {
        try {
            const res = await axios.get('/api/staff/schedule');
            setSchedules(res.data);
        } catch (err) {
            message.error('Failed to fetch schedules');
        }
    };


    const onFinish = async (values) => {
        const payload = {
            employeeId: String(values.employeeId).trim(),
            department: String(values.department).trim(),
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
            fetchSchedules();
            form.resetFields();
            setEditingId(null);
        } catch (err) {
            message.error('Error saving schedule');
        }
    };

    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'employeeId',
            key: 'employeeId',
            render: (employee) => {
                if (typeof employee === 'object') {
                    return employee.name || employee._id || '[N/A]';
                }
                return employee;
            }
        },

        { title: 'Department', dataIndex: 'department', key: 'department' },
        { title: 'Date', dataIndex: 'date', key: 'date', render: date => dayjs(date).format('DD/MM/YYYY') },
        {
            title: 'Time Slots',
            dataIndex: 'timeSlots',
            render: slots => (
                <ul>
                    {slots.map((s, i) => (
                        <li key={i}>{dayjs(s.startTime).format('HH:mm')} - {dayjs(s.endTime).format('HH:mm')} ({s.status})</li>
                    ))}
                </ul>
            )
        },
        {
            title: 'Actions',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => {
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
                    }}>
                        Edit
                    </Button>

                    <Popconfirm
                        title="Are you sure to delete this schedule?"
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
            <Title level={3}>Manage Doctor Work Schedule</Title>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={{
                    employeeId: '',
                    department: '',
                    date: null,
                    timeSlots: [{ timeRange: [], status: 'Available' }],
                }}
            >


                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Form.Item
                        label="Employee ID"
                        name="employeeId"
                        rules={[{ required: true, message: 'Please input employee ID' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Department"
                        name="department"
                        rules={[{ required: true, message: 'Please input department' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please select a date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>


                    <Form.List name="timeSlots">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} align="baseline">
                                        <Form.Item {...restField} name={[name, 'timeRange']} rules={[{ required: true }]}>
                                            <TimePicker.RangePicker format="HH:mm" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'status']} rules={[{ required: true }]}>
                                            <Select style={{ width: 120 }}>
                                                <Option value="Available">Available</Option>
                                                <Option value="Booked">Booked</Option>
                                                <Option value="Unavailable">Unavailable</Option>
                                            </Select>
                                        </Form.Item>
                                        <Button onClick={() => remove(name)} danger>-</Button>
                                    </Space>
                                ))}
                                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>Add Slot</Button>
                            </>
                        )}
                    </Form.List>
                    <Button type="primary" htmlType="submit">
                        {editingId ? 'Update Schedule' : 'Create Schedule'}
                    </Button>
                </Space>
            </Form>

            <Divider />

            <Title level={4}>Existing Schedules</Title>
            <Table rowKey="_id" dataSource={schedules} columns={columns} />
            <Modal
                title="Edit Schedule"
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingId(null);
                }}
                onOk={() => {
                    form.submit();
                }}
                okText="Update"
            >
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        label="Employee ID"
                        name="employeeId"
                        rules={[{ required: true, message: 'Please input employee ID' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Department"
                        name="department"
                        rules={[{ required: true, message: 'Please input department' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please select a date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.List name="timeSlots">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} align="baseline" style={{ marginBottom: 8 }}>
                                        <Form.Item {...restField} name={[name, 'timeRange']} rules={[{ required: true }]}>
                                            <TimePicker.RangePicker format="HH:mm" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'status']} rules={[{ required: true }]}>
                                            <Select style={{ width: 120 }}>
                                                <Option value="Available">Available</Option>
                                                <Option value="Booked">Booked</Option>
                                                <Option value="Unavailable">Unavailable</Option>
                                            </Select>
                                        </Form.Item>
                                        <Button onClick={() => remove(name)} danger>-</Button>
                                    </Space>
                                ))}
                                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                    Add Slot
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
