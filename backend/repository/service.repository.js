const Service = require("../models/Service");

async function getAllServices() {
    return await Service.find();
}

async function getServiceById(id) {
    return await Service.find({ _id: id });
}

module.exports = {
  getAllServices,
  getServiceById,
};