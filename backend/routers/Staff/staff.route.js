const express = require('express');
const staffRouter = express.Router();

staffRouter.get('/', (req, res) => {
  res.send("Staff route is working!");
});

module.exports = staffRouter;