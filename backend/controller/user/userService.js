const DoctorInfo = async (req, res) => {
    const { doctorId } = req.params;

    // Giả sử đây là database giả lập:
    const doctors = [
        {
            _id: "1",
            userId: { fullname: "Nguyễn Văn An" },
            ProfileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
            Specialty: "Nội Tổng Quát",
        },
        {
            _id: "2",
            userId: { fullname: "Trần Thị Bình" },
            ProfileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
            Specialty: "Nhi Khoa",
        },
        // ... thêm các bác sĩ khác
    ];

    const doctor = doctors.find(d => d._id === doctorId);

    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({
        message: "OK",
        doctor: doctor,
    });
};

module.exports = { DoctorInfo };
