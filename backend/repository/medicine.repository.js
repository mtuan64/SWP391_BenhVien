const Medicine = require('../models/Medicine');

async function createMedicine(data) {
    return await Medicine.create(data);
}

async function getAllMedicines() {
    return await Medicine.find().populate('supplier');
}

const countMedicines = async () => {
  const result = await Medicine.countDocuments();
  return result;
};

const getMedicinesWithPagination = async (skip, limit) => {
  const medicines = await Medicine.find().skip(skip).limit(limit).exec();
  return medicines;
};


async function getMedicineById(id) {
    return await Medicine.findById(id);
}

async function updateMedicine(id, data) {
    return await Medicine.findByIdAndUpdate(id, data, { new: true });
}

async function deleteMedicine(id) {
    return await Medicine.findByIdAndDelete(id);
}

module.exports = {
    createMedicine,
    getAllMedicines,
    countMedicines,
    getMedicinesWithPagination,
    getMedicineById,
    updateMedicine,
    deleteMedicine,
};