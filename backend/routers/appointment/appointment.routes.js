const express = require("express");
const {
  getUserAccs,
  editUsers,
  delUsers,
  getEmployees,
  editEmployees,
  delEmployees,
  createEmployees,
  changeStatus,
} = require("../../controller/appointment/apmServices");
const apmRouter = express.Router();

// Admin - user manage
apmRouter.get("/users", getUserAccs);
apmRouter.put("/updUser/:id", editUsers);
apmRouter.put("/changeStatus/:id", changeStatus); // Assuming this is for changing user status
apmRouter.delete("/delUser/:id", delUsers);

// Admin - employee manage
apmRouter.get("/employees", getEmployees);
apmRouter.put("/updEmp/:id", editEmployees);
apmRouter.delete("/delEmp/:id", delEmployees);
apmRouter.post("/createEmp", createEmployees);

module.exports = apmRouter;
