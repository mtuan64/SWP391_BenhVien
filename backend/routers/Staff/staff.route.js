// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const staffRouter = express.Router();

// const {
//   getAllProfile,
//   createProfile,
//   updateProfile,
//   deleteProfile,
//   getAllMedicines,
//   getDoctors
// } = require("../../controller/staff/staffService");
// const {
//   getAllBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   uploadImage: uploadBlogImage,
//   getAllCategories,
//   createCategory,
//   updateCategory,
//   deleteCategory,
//   getBlogBySlug,
//   getTopViewedBlogs,
//   incrementBlogViews
// } = require("../../controller/staff/staffService");
// const {
//   getAllNews,
//   getNewsBySlug,
//   createNews,
//   updateNews,
//   deleteNews,
//   incrementNewsViews,
//   getTopViewedNews,
//   uploadImage: uploadNewsImage
// } = require("../../controller/staff/staffService");

// const {
//   authStaffMiddleware
// } = require("../../middleware/auth.middleware");

// // Cấu hình Multer để upload ảnh
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Thư mục cần tồn tại
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const uploadMulter = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (extname && mimetype) {
//       return cb(null, true);
//     }
//     cb(new Error("Only JPEG/PNG images are allowed"));
//   },
// });

// // ---------------- ROUTES ----------------

// // Blog
// staffRouter.get("/blogs", getAllBlogs);
// staffRouter.get("/blogs/slug/:slug", getBlogBySlug);
// staffRouter.get("/blogs/top-viewed", getTopViewedBlogs);
// staffRouter.post("/blogs/slug/:slug/views", incrementBlogViews);

// staffRouter.post("/blogs", authStaffMiddleware, createBlog);
// staffRouter.put("/blogs/:id", authStaffMiddleware, updateBlog);
// staffRouter.delete("/blogs/:id", authStaffMiddleware, deleteBlog);

// staffRouter.post(
//   "/blogs/upload",
//   authStaffMiddleware,
//   uploadMulter.fields([
//     { name: "mainImage", maxCount: 1 },
//     { name: "contentImages", maxCount: 10 },
//   ]),
//   uploadBlogImage
// );

// // Category
// staffRouter.get("/categories", getAllCategories);
// staffRouter.post("/categories", authStaffMiddleware, createCategory);
// staffRouter.put("/categories/:id", authStaffMiddleware, updateCategory);
// staffRouter.delete("/categories/:id", authStaffMiddleware, deleteCategory);

// // News
// staffRouter.get("/news", getAllNews);
// staffRouter.get("/news/slug/:slug", getNewsBySlug);
// staffRouter.get("/news/top-viewed", getTopViewedNews);
// staffRouter.post("/news/slug/:slug/views", incrementNewsViews);

// staffRouter.post(
//   "/news",
//   authStaffMiddleware,
//   createNews
// );
// staffRouter.put('/news/:id', authStaffMiddleware, updateNews);
// staffRouter.delete('/news/:id', authStaffMiddleware, deleteNews);

// // Thêm route upload ảnh cho tin tức
// staffRouter.post(
//   "/news/upload",
//   authStaffMiddleware,
//   uploadMulter.fields([
//     { name: "thumbnail", maxCount: 1 },
//     { name: "image", maxCount: 1 },
//   ]),
//   uploadNewsImage
// );

// // Medical Record (Profile)
// staffRouter.get("/profiles", getAllProfile);
// staffRouter.get("/medicines", getAllMedicines);
// staffRouter.get("/doctors", getDoctors);
// staffRouter.post("/profiles", authStaffMiddleware, createProfile);
// staffRouter.put("/profiles/:id", authStaffMiddleware, updateProfile);
// staffRouter.delete("/profiles/:id", authStaffMiddleware, deleteProfile);

// module.exports = staffRouter;