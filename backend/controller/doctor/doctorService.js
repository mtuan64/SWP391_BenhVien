const Employee = require("../../models/Employee");

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Employee.find({ role: 'Doctor', status: 'active' })
            .select('name department expYear avatar'); // CHỈ lấy các trường cần thiết

        res.status(200).json(doctors);
    } catch (err) {
        console.error("Error fetching doctors:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
