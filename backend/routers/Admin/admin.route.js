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

module.exports = adminRouter;
