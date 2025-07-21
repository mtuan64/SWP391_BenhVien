const express = require("express");
const adminRouter = express.Router();

const {
  getUserAccs,
  editUsers,
  delUsers,
  getEmployees,
  editEmployees,
  delEmployees,
  createEmployees,
  changeStatus,
  getAllDepartments,
} = require("../../controller/admin/adminService");
const {
  getAppointmentTypeStats,
  getRevenueByMethod,
  getDashboardSummaries,
  getUserRegistrationTrend,
  getAppointmentTrend,
  getRevenueTrend,
  getUserGrowthStats,
  getEmployeeStats,
} = require("../../controller/admin/statisService");
const { getAllAttendance, getAttendanceById, createAttendance, updateAttendance, deleteAttendance, getAttendanceSummary, getConfig, updateConfig } = require("../../controller/admin/attendanceService");

// Admin - user manage
adminRouter.get("/users", getUserAccs);
adminRouter.put("/updUser/:id", editUsers);
adminRouter.put("/changeStatus/:id", changeStatus);
adminRouter.delete("/delUser/:id", delUsers);

// Admin - employee manage
adminRouter.get("/employees", getEmployees);
adminRouter.put("/updEmp/:id", editEmployees);
adminRouter.delete("/delEmp/:id", delEmployees);
adminRouter.post("/createEmp", createEmployees);
adminRouter.get("/getDepart", getAllDepartments); 

// Admin - statistics
adminRouter.get("/user-registrations", getUserRegistrationTrend);
adminRouter.get("/appointments", getAppointmentTrend);
adminRouter.get("/revenue", getRevenueTrend);
adminRouter.get("/appointment-types", getAppointmentTypeStats);
adminRouter.get("/revenue-methods", getRevenueByMethod);
adminRouter.get("/summaries", getDashboardSummaries);
adminRouter.get("/user-growth-stats", getUserGrowthStats);
adminRouter.get("/employee-stats", getEmployeeStats);

// Admin - attendance management

adminRouter.get('/attend', getAllAttendance);
adminRouter.get('/attend/:id', getAttendanceById);
adminRouter.post('/createAttend', createAttendance);
adminRouter.put('/updAttend/:id', updateAttendance);
adminRouter.delete('/delAttend/:id', deleteAttendance);
adminRouter.get('/attend/stats/summary', getAttendanceSummary);

adminRouter.get('/attend-config', getConfig)
adminRouter.post('/upd-config', updateConfig)


module.exports = adminRouter;
