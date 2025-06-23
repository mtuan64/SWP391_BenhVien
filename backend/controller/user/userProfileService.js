const Profile = require("../../models/Profile");

// Tạo hồ sơ mới
exports.createProfile = async (req, res) => {
    try {
        const userId = req.cc;
        const { name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine } = req.body;

        const profile = new Profile({
            name,
            dateOfBirth,
            gender,
            diagnose,
            note,
            issues,
            doctorId,
            medicine,
            userId
        });

        await profile.save();

        res.status(201).json({
            message: "Profile created successfully",
            data: profile
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to create profile", error: err.message });
    }
};

// Lấy tất cả hồ sơ thuộc user
exports.getMyProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Fetched successfully",
            data: profiles
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch profiles", error: err.message });
    }
};

// Lấy 1 hồ sơ theo ID và đảm bảo thuộc user hiện tại
exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.id, userId: req.user._id });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ data: profile });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch profile", error: err.message });
    }
};

// Cập nhật hồ sơ
exports.updateProfile = async (req, res) => {
    try {
        const updateData = req.body;

        const updated = await Profile.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            updateData,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Profile not found or unauthorized" });
        }

        res.status(200).json({ message: "Profile updated", data: updated });
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

// Xoá hồ sơ
exports.deleteProfile = async (req, res) => {
    try {
        const deleted = await Profile.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!deleted) {
            return res.status(404).json({ message: "Profile not found or unauthorized" });
        }

        res.status(200).json({ message: "Profile deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};