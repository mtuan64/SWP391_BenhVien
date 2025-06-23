const mongoose = require("mongoose");
const LabTestSchema = require("../../models/LabTest");
const UserSchema = require("../../models/User");

module.exports.createLabTest = async (req, res) => {
    const {
        fullName,
        gender,
        sampleType,
        collectionDate,
        containerType
    } = req.body;

    const entity = new LabTestSchema({
        fullName,
        gender,
        sampleType,
        collectionDate,
        collectedBy: "abc",
        containerType
    });

    await entity.save();

    res.status(201).json({
        message: "Created successfully",
        data: entity
    });
}

module.exports.getAll = async (req, res) => {
   const data = await LabTestSchema.find({})
    res.status(200).json({
        data,
        message: "Created successfully"
    });
}

module.exports.findById = async (req, res) => {
    const id = req.params.testId

    const testLab = await LabTestSchema.findById(id);
    res.status(200).json({
        data: testLab
    })
}