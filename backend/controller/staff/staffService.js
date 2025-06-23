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