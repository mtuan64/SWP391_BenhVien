const Department = require('../models/Department');

async function getAllDepartment() {
    return await Department.find();
}

async function getDepartmentById(id) {
    return await Department.findById(id);
}

module.exports = {
    getAllDepartment,
    getDepartmentById,
};