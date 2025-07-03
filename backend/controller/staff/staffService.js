const medicineRepo = require('../../repository/medicine.repository');
const jwt = require('jsonwebtoken');
const Schedule = require('../../models/Schedule');

module.exports.createMedicine = async (req, res) => {
  try {
    const medicine = await medicineRepo.createMedicine(req.body);
    res.status(201).json({ message: "Created", medicine });
  } catch (err) {
    res.status(400).json({ message: "Error", error: err.message });
  }
};

module.exports.getAllMedicines = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("token", token);
       
        if(!token){
            return res.status(401).json({message: "fel"});
        }
        //co token
        try{
            const decode = jwt.verify(token,"your_jwt_secret_key");
            console.log("decode", JSON.stringify(decode));
        }catch(error){
          console.log("error", error)
            return res.status(401).json({message: "fel1"});
        }
    
    const medicines = await medicineRepo.getAllMedicines();
    res.status(200).json({ message: "OK", medicines });
  } catch (err) {
    res.status(400).json({ message: "Error", error: err.message });
  }
};

module.exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await medicineRepo.getMedicineById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "OK", medicine });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

module.exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await medicineRepo.updateMedicine(req.params.id, req.body);
    if (!medicine) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "OK", medicine });
  } catch (err) {
    res.status(400).json({ message: "Error", error: err.message });
  }
};

module.exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await medicineRepo.deleteMedicine(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted", medicine });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

module.exports.createCheckup = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, symptoms } = req.body;
    if (!patientId || !doctorId || !date || !time || !symptoms) {
      return res.status(400).json({ message: "All fields are required" });
    }

    return res.status(201).json({ message: "Checkup created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports.createSchedule = async (req, res) => {
  try {
    const { employeeId, department, date, timeSlots } = req.body;

    if (!employeeId || !department || !date || !timeSlots || !Array.isArray(timeSlots)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSchedule = new Schedule({ employeeId, department, date, timeSlots });
    await newSchedule.save();

    return res.status(201).json({ message: "Schedule created successfully", schedule: newSchedule });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getSchedules = async (req, res) => {
  try {
    const query = {};
    if (req.query.employeeId) query.employeeId = req.query.employeeId;
    if (req.query.date) query.date = new Date(req.query.date);

    const schedules = await Schedule.find(query).populate('employeeId');

    return res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId, department, date, timeSlots } = req.body;

    if (!employeeId || !department || !date || !timeSlots) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(id, {
      employeeId,
      department,
      date,
      timeSlots,
    }, { new: true });

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res.status(200).json({ message: "Schedule updated successfully", schedule: updatedSchedule });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Schedule.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
