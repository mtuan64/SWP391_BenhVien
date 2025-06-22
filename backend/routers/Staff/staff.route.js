const express = require('express');
const multer = require('multer');
const path = require('path');
const staffRouter = express.Router();

const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBlogBySlug,
  getTopViewedBlogs,
  incrementBlogViews
} = require("../../controller/staff/staffService");

const {
  authStaffMiddleware,
  authAdminMiddleware
} = require("../../middleware/auth.middleware");

// Cấu hình Multer để upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục cần tồn tại
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadMulter = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only JPEG/PNG images are allowed"));
  },
});

// ---------------- ROUTES ----------------

// Blog
staffRouter.get("/blogs", getAllBlogs);
staffRouter.get("/blogs/slug/:slug", getBlogBySlug);
staffRouter.get("/blogs/top-viewed", getTopViewedBlogs);
staffRouter.post("/blogs/slug/:slug/views", incrementBlogViews);

staffRouter.post("/blogs", authStaffMiddleware, createBlog);
staffRouter.put("/blogs/:id", authStaffMiddleware, updateBlog);
staffRouter.delete("/blogs/:id", authStaffMiddleware, deleteBlog);

staffRouter.post(
  "/blogs/upload",
  authStaffMiddleware,
  uploadMulter.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "contentImages", maxCount: 10 },
  ]),
  uploadImage
);

// Category
staffRouter.get("/categories", getAllCategories);
staffRouter.post("/categories", authStaffMiddleware, createCategory);
staffRouter.put("/categories/:id", authStaffMiddleware, updateCategory);
staffRouter.delete("/categories/:id", authStaffMiddleware, deleteCategory);

module.exports = staffRouter;
