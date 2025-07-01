const Department = require("../../models/Department");
const mongoose = require("mongoose");

// Manual validation for department data
const validateDepartment = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    errors.push("Tên khoa là bắt buộc");
  } else if (data.name.length > 100) {
    errors.push("Tên khoa không được vượt quá 100 ký tự");
  }

  if (data.description && typeof data.description !== "string") {
    errors.push("Mô tả phải là chuỗi ký tự");
  } else if (data.description && data.description.length > 500) {
    errors.push("Mô tả không được vượt quá 500 ký tự");
  }

  return errors.length > 0 ? errors.join(", ") : null;
};

// Validate query parameters
const validateQueryParams = (page, limit, search) => {
  const errors = [];

  const pageNum = parseInt(page, 10);
  if (isNaN(pageNum) || pageNum < 1) {
    errors.push("Trang phải là số lớn hơn 0");
  }

  const limitNum = parseInt(limit, 10);
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    errors.push("Giới hạn phải là số từ 1 đến 100");
  }

  if (search && typeof search !== "string") {
    errors.push("Tìm kiếm phải là chuỗi ký tự");
  }

  return errors.length > 0 ? errors.join(", ") : null;
};

// Lấy tất cả khoa có hỗ trợ tìm kiếm và phân trang
exports.getAllDepartments = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const validationError = validateQueryParams(page, limit, search);
    if (validationError) {
      return res.status(400).json({ message: `Dữ liệu không hợp lệ: ${validationError}` });
    }

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    const total = await Department.countDocuments(query);
    const departments = await Department.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      departments,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalDepartments: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy khoa theo ID
exports.getDepartmentById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID khoa không hợp lệ" });
    }
    const department = await Department.findById(req.params.id).lean();
    if (!department) {
      return res.status(404).json({ message: "Không tìm thấy khoa" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Tạo khoa mới
exports.createDepartment = async (req, res) => {
  try {
    const validationError = validateDepartment(req.body);
    if (validationError) {
      return res.status(400).json({ message: `Dữ liệu không hợp lệ: ${validationError}` });
    }

    const { name, description } = req.body;

    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Tên khoa đã tồn tại" });
    }

    const newDepartment = new Department({
      _id: new mongoose.Types.ObjectId(),
      name,
      description,
    });

    await newDepartment.save();
    res.status(201).json({ message: "Tạo khoa thành công", department: newDepartment });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Tên khoa đã tồn tại" });
    }
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Cập nhật khoa
exports.updateDepartment = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID khoa không hợp lệ" });
    }

    const validationError = validateDepartment(req.body);
    if (validationError) {
      return res.status(400).json({ message: `Dữ liệu không hợp lệ: ${validationError}` });
    }

    const { name, description } = req.body;

    const existing = await Department.findOne({
      name,
      _id: { $ne: req.params.id }
    });
    if (existing) {
      return res.status(400).json({ message: "Tên khoa đã tồn tại" });
    }

    const updated = await Department.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy khoa" });
    }

    res.status(200).json({ message: "Cập nhật thành công", department: updated });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xóa khoa
exports.deleteDepartment = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID khoa không hợp lệ" });
    }

    const deleted = await Department.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy khoa" });
    }

    res.status(200).json({ message: "Xóa khoa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
