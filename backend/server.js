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

app.use("/api/checkup", require("./routers/checkup/checkup.route"));
app.use("/api/apm", require("./routers/appointment/appointment.routes"));
app.use("/api/auth", require("./routers/auth/auth.route"));
app.use("/api/med", require("./routers/medicine/medicine.route"));

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
