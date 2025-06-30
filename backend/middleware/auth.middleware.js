const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "fel" });
  }
  //co token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.cc = decode;
    next();
  } catch (error) {
    res.status(401).json({ message: "fel" });
  }
};

const ismeomeo = (req, res, next) => {
  if (req.cc.name !== "chi") {
    res.status(400).json({ message: "fel name" });
  }
  next();
};

module.exports = { authMiddleware, ismeomeo };
