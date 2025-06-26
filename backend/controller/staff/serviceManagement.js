const Services = require("../../models/Service");
const Employee = require("../../models/Employee");
const mongoose = require("mongoose");

// Manual validation for service data
const validateService = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    errors.push("Tên dịch vụ là bắt buộc");
  } else if (data.name.length > 100) {
    errors.push("Tên dịch vụ không được vượt quá 100 ký tự");
  }

  if (data.description && typeof data.description !== "string") {
    errors.push("Mô tả phải là chuỗi ký tự");
  } else if (data.description && data.description.length > 500) {
    errors.push("Mô tả không được vượt quá 500 ký tự");
  }

  if (data.price == null || typeof data.price !== "number" || data.price < 0) {
    errors.push("Giá dịch vụ phải là số không âm");
  }

  if (data.doctors) {
    if (!Array.isArray(data.doctors)) {
      errors.push("Danh sách bác sĩ phải là mảng");
    } else {
      data.doctors.forEach((id, index) => {
        if (!mongoose.isValidObjectId(id)) {
          errors.push(`ID bác sĩ tại vị trí ${index} không hợp lệ`);
        }
      });
    }
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

// Controller getAllServices hỗ trợ tìm kiếm và phân trang
exports.getAllServices = async (req, res) => {
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

    const totalServices = await Services.countDocuments(query);
    const services = await Services.find(query)
      .populate("doctors", "name")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      services,
      totalPages: Math.ceil(totalServices / limit),
      currentPage: parseInt(page),
      totalServices,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy dịch vụ theo ID
exports.getServiceById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID dịch vụ không hợp lệ" });
    }
    const service = await Services.findById(req.params.id).populate("doctors", "name").lean();
    if (!service) {
      return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Tạo dịch vụ mới
exports.createService = async (req, res) => {
  try {
    const validationError = validateService(req.body);
    if (validationError) {
      return res.status(400).json({ message: `Dữ liệu không hợp lệ: ${validationError}` });
    }

    const { name, description, price, doctors } = req.body;

    // Kiểm tra xem bác sĩ có tồn tại trong cơ sở dữ liệu không
    if (doctors && doctors.length > 0) {
      const invalidDoctors = [];
      for (const doctorId of doctors) {
        const doctorExists = await Employee.exists({ _id: doctorId });
        if (!doctorExists) {
          invalidDoctors.push(doctorId);
        }
      }

      if (invalidDoctors.length > 0) {
        return res.status(400).json({
          message: `Các bác sĩ sau không tồn tại: ${invalidDoctors.join(", ")}`,
        });
      }
    }

    const existingService = await Services.findOne({ name });
    if (existingService) {
      return res.status(400).json({ message: "Tên dịch vụ đã tồn tại" });
    }

    const newService = new Services({
      name,
      description,
      price,
      doctors,
    });

    await newService.save();
    const populatedService = await newService.populate("doctors", "name");
    res.status(201).json({ message: "Tạo dịch vụ thành công", service: populatedService });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Tên dịch vụ đã tồn tại" });
    }
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Cập nhật dịch vụ
exports.updateService = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID dịch vụ không hợp lệ" });
    }

    const validationError = validateService(req.body);
    if (validationError) {
      return res.status(400).json({ message: `Dữ liệu không hợp lệ: ${validationError}` });
    }

    const updateData = { ...req.body };

    const existingService = await Services.findOne({
      name: updateData.name,
      _id: { $ne: req.params.id },
    });
    if (existingService) {
      return res.status(400).json({ message: "Tên dịch vụ đã tồn tại" });
    }

    const updatedService = await Services.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("doctors", "name");

    if (!updatedService) {
      return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
    }
    res.status(200).json({ message: "Cập nhật thành công", service: updatedService });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Tên dịch vụ đã tồn tại" });
    }
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xóa dịch vụ
exports.deleteService = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID dịch vụ không hợp lệ" });
    }
    const deletedService = await Services.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
    }
    res.status(200).json({ message: "Xóa dịch vụ thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy danh sách bác sĩ
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Employee.find({ role: "Doctor" })
      .select("_id name")
      .lean();
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ nào" });
    }
    res.status(200).json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách bác sĩ", error: error.message });
  }
};