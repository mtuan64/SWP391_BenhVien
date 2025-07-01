const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connectDb = require("./config/db");
const morgan = require("morgan");
require("dotenv").config();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", require("./routers/User/user.route"));
app.use("/api/admin", require("./routers/Admin/admin.route"));
app.use("/api/auth", require("./routers/auth/auth.route"));
app.use("/api/doctor", require("./routers/Doctor/doctor.route"));
app.use("/api/staff", require("./routers/Staff/staff.route"));
app.use("/api/appointmentScheduleManagement", require("./routers/Staff/appointmentScheduleManagement.route"));
app.use("/api/users", require("./routers/Staff/userManagement.route"));
app.use("/api/departments", require("./routers/Staff/departmentManagement.route"));

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
