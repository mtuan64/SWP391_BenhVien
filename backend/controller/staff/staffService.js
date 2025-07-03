const medicineRepo = require('../../repository/medicine.repository');
const jwt = require('jsonwebtoken');

const createMedicine = async (req, res) => {
  try {
    const medicine = await medicineRepo.createMedicine(req.body);
    res.status(201).json({ message: "Created", medicine });
  } catch (err) {
    res.status(400).json({ message: "Error", error: err.message });
  }
};

const getAllMedicines = async (req, res) => {
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

const getMedicineById = async (req, res) => {
  try {
    const medicine = await medicineRepo.getMedicineById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "OK", medicine });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const medicine = await medicineRepo.updateMedicine(req.params.id, req.body);
    if (!medicine) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "OK", medicine });
  } catch (err) {
    res.status(400).json({ message: "Error", error: err.message });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicine = await medicineRepo.deleteMedicine(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted", medicine });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

const createCheckup = async (req, res) => {
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

module.exports = {
  createCheckup,
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};