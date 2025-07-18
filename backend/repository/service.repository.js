const Service = require("../models/Service");

async function getAllServices() {
    return await Service.find();
}

async function getServiceById(id) {
    return await Service.find({ _id: id });
}

const countServices = async () => {
  const result = await Service.countDocuments();
  return result;
};

const getServicesWithPagination = async (skip, limit) => {
  const services = await Service.find().skip(skip).limit(limit).exec();
  return services;
};


module.exports = {
  getAllServices,
  getServiceById,
  countServices,
  getServicesWithPagination,
};