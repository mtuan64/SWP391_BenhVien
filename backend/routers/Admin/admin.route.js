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

// Admin - user manage
adminRouter.get("/users", getUserAccs);
adminRouter.put("/updUser/:id", editUsers);
adminRouter.put("/changeStatus/:id", changeStatus); // Assuming this is for changing user status
adminRouter.delete("/delUser/:id", delUsers);

// Admin - employee manage
adminRouter.get("/employees", getEmployees);
adminRouter.put("/updEmp/:id", editEmployees);
adminRouter.delete("/delEmp/:id", delEmployees);
adminRouter.post("/createEmp", createEmployees);

// Admin - statistics
adminRouter.get("/user-registrations", getUserRegistrationTrend);
adminRouter.get("/appointments", getAppointmentTrend);
adminRouter.get("/revenue", getRevenueTrend);
adminRouter.get("/appointment-types", getAppointmentTypeStats);
adminRouter.get("/revenue-methods", getRevenueByMethod);
adminRouter.get("/summaries", getDashboardSummaries);
adminRouter.get("/user-growth-stats", getUserGrowthStats);
adminRouter.get("/employee-stats", getEmployeeStats);

module.exports = adminRouter;
