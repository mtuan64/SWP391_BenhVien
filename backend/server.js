// Load environment variables early
require("dotenv").config();

// Import packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// App initialization
const app = express();
const connectDb = require("./config/db");

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware setup
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routers import
const userRouter = require("./routers/User/user.route");
const userMedicalProfile = require("./routers/User/userMedicalProfile.route");
const workschedule = require("./routers/Doctor/workschedule.route");
const adminRouter = require("./routers/Admin/admin.route");
const authRouter = require("./routers/auth/auth.route");
const doctorRouter = require("./routers/Doctor/doctor.route");
const staffRouter = require("./routers/Staff/staff.route");

// Mount routers
app.use("/api/user", userRouter);
app.use("/api/user-profile",userMedicalProfile);
app.use("/api/work-schedule",workschedule )
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/staff", staffRouter);

// Start server after DB connected
const PORT = process.env.PORT || 9999;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});
