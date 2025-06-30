import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "@ant-design/plots";
import { Card, Col, List, Row, Typography } from "antd";
import axios from "axios";
import { DatePicker } from "antd";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [revenueMethods, setRevenueMethods] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [employeeStats, setEmployeeStats] = useState({
    totalEmployees: 0,
    roles: [],
  });
  const { RangePicker } = DatePicker;
  useEffect(() => {
    const fetchStats = async () => {
      const [
        userRes,
        appointmentRes,
        revenueRes,
        typeRes,
        methodRes,
        summaryRes,
        employeeRes,
      ] = await Promise.all([
        axios.get("/api/admin/user-registrations"),
        axios.get("/api/admin/appointments"),
        axios.get("/api/admin/revenue"),
        axios.get("/api/admin/appointment-types"),
        axios.get("/api/admin/revenue-methods"),
        axios.get("/api/admin/summaries"),
        axios.get("/api/admin/employee-stats"),
      ]);

      setUserData(
        userRes.data.map((item) => ({ date: item._id, count: item.count }))
      );
      setAppointmentData(
        appointmentRes.data.map((item) => ({
          date: item._id,
          count: item.count,
        }))
      );
      setRevenueData(
        revenueRes.data.map((item) => ({
          date: item._id,
          revenue: item.totalRevenue,
        }))
      );
      setAppointmentTypes(
        typeRes.data.map((item) => ({ type: item._id, count: item.count }))
      );
      setRevenueMethods(
        methodRes.data.map((item) => ({ method: item._id, total: item.total }))
      );
      setSummaries(summaryRes.data);

      setEmployeeStats(employeeRes.data);
    };

    fetchStats();
  }, []);

  // Configs

  const userConfig = {
    data: userData,
    xField: "date",
    yField: "count",
    height: 250,
    smooth: true,
    point: { size: 4, shape: "circle" },
  };

  const appointmentConfig = {
    data: appointmentData,
    xField: "date",
    yField: "count",
    height: 250,
    smooth: true,
    point: { size: 4, shape: "circle" },
  };

  const revenueConfig = {
    data: revenueData,
    xField: "date",
    yField: "revenue",
    height: 250,
    smooth: true,
    point: { size: 4, shape: "circle" },
  };

  // ✅ Cleaner vertical Bar config for appointment types
  const barConfig = {
    data: appointmentTypes,
    xField: "type",
    yField: "count",
    height: 250,
    columnWidthRatio: 0.6,
    colorField: "type",
    label: false, // disable numbers inside bars
  };

  // ✅ New Bar: Appointments per day
  const appointmentBarConfig = {
    data: appointmentData,
    xField: "date",
    yField: "count",
    height: 250,
    columnWidthRatio: 0.5,
    color: "#3498db",
    label: false,
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2}>Admin Dashboard</Typography.Title>
      <div style={{ marginBottom: "20px" }}>
        <RangePicker onChange={(dates) => console.log(dates)} />
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Total Users">{summaries.totalUsers}</Card>
        </Col>
        <Col span={6}>
          <Card title="Total Appointments">{summaries.totalAppointments}</Card>
        </Col>
        <Col span={6}>
          <Card title="Total Revenue">
            {(summaries.totalRevenue || 0).toLocaleString()} VND
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Employee Statistics">
            <p>Total Employees: {employeeStats.totalEmployees}</p>
            <ul>
              {employeeStats.roles.map((role) => (
                <li key={role._id}>
                  {role._id}: {role.count}
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="User Growth Over Time (30 Days)">
            <Line {...userConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Appointments Over Time (30 Days)">
            <Line {...appointmentConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="Revenue Trend (30 Days)">
            <Line {...revenueConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Appointment Types (30 Days)">
            <Bar {...barConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="Appointments per Day (Bar)">
            <Bar {...appointmentBarConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Revenue by Payment Method (Pie)">
            <Pie
              data={revenueMethods}
              angleField="total"
              colorField="method"
              radius={0.9}
              legend={{ position: "bottom" }}
              label={false} // Hide pie slice labels
            />

            <List
              size="small"
              bordered={false}
              dataSource={revenueMethods}
              renderItem={(item) => {
                const total = revenueMethods.reduce(
                  (acc, cur) => acc + cur.total,
                  0
                );
                const percent = ((item.total / total) * 100).toFixed(1);
                return (
                  <List.Item>
                    <span style={{ fontWeight: 500 }}>{item.method}</span>:{" "}
                    {percent}%
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
