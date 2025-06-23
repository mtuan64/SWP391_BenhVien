const UserMedicalProfile = require("../../models/UserMedicalProfile");

module.exports.createProfile = async (req, res) => {
    const {
        fullName,
        gender,
        sampleType,
        collectionDate,
        containerType,
        userId
    } = req.body;

    const profile = new UserMedicalProfile({
        fullName,
        gender,
        sampleType,
        collectionDate,
        collectedBy: "abc",
        containerType,
        userId
    });

    await profile.save();

    res.status(201).json({
        message: "Created successfully",
        data: profile
    });
};

module.exports.getAllProfiles = async (req, res) => {
    const data = await UserMedicalProfile.find({});
    res.status(200).json({
        data,
        message: "Retrieved successfully"
    });
};

module.exports.getProfileById = async (req, res) => {
    const id = req.params.profileId;

    const profile = await UserMedicalProfile.find({
        userId: id
    });
    res.status(200).json({ data: profile });
};

module.exports.updateProfileById = async (req, res) => {
    const { id } = req.params;
    const {
        fullName,
        gender,
        sampleType,
        collectionDate,
        containerType,
        userId
    } = req.body;

    try {
        const updatedProfile = await UserMedicalProfile.findByIdAndUpdate(
            id,
            {
                fullName,
                gender,
                sampleType,
                collectionDate,
                containerType,
                userId
            },
            { new: true } // trả về bản ghi đã cập nhật
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Medical profile not found." });
        }

        res.status(200).json({
            message: "Updated successfully",
            data: updatedProfile
        });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};