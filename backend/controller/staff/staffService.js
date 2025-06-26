// const Blog = require("../../models/Blog");
// const CategoryBlog = require("../../models/CategoryBlog");
// const Profile = require("../../models/Profile");
// const News = require("../../models/News");
// const Medicine = require("../../models/Medicine");
// const Employee = require('../../models/Employee');
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs").promises;
// const path = require("path");
// const slugify = require("slugify");
// const mongoose = require('mongoose');
// const uploadDir = path.join(__dirname, "../Uploads");
// fs.mkdir(uploadDir, { recursive: true })
//   .then(() => console.log("Uploads directory created or exists"))
//   .catch((err) => console.error("Error creating uploads directory:", err));

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Blog Functions
// exports.getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find()
//       .populate("author_id", "fullname email")
//       .populate("categoryId", "name");
//     res.json(blogs);
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getBlogBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const blog = await Blog.findOne({ slug })
//       .populate("author_id", "fullname email")
//       .populate("categoryId", "name");
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.json(blog);
//   } catch (error) {
//     console.error("Error fetching blog by slug:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createBlog = async (req, res) => {
//   try {
//     const { title, content, categoryId } = req.body;
//     const author_id = req.user.userId;
//     if (!title || !categoryId) {
//       return res
//         .status(400)
//         .json({ message: "Title and categoryId are required" });
//     }
//     if (!Array.isArray(content) || content.length === 0) {
//       return res.status(400).json({ message: "Content array is required" });
//     }
//     const slug = slugify(title, { lower: true, strict: true, locale: "vi" });
//     let mainImageUrl = req.body.image || "";
//     if (req.files && req.files.mainImage) {
//       const result = await cloudinary.uploader.upload(
//         req.files.mainImage[0].path,
//         { folder: "blog_images" }
//       );
//       mainImageUrl = result.secure_url;
//       await fs.unlink(req.files.mainImage[0].path);
//     }
//     const processedContent = await Promise.all(
//       content.map(async (item, index) => {
//         if (item.type === "image" && req.files && req.files.contentImages) {
//           const contentImage = req.files.contentImages.find(
//             (file) => file.fieldname === `contentImages[${index}]`
//           );
//           if (contentImage) {
//             const result = await cloudinary.uploader.upload(contentImage.path, {
//               folder: "blog_images",
//             });
//             await fs.unlink(contentImage.path);
//             return { ...item, url: result.secure_url };
//           }
//         }
//         return {
//           ...item,
//           bold: item.bold || false,
//           italic: item.italic || false,
//           fontSize: item.fontSize || "medium",
//         };
//       })
//     );
//     const newBlog = new Blog({
//       title,
//       content: processedContent,
//       author_id,
//       image: mainImageUrl,
//       slug,
//       categoryId,
//     });
//     await newBlog.save();
//     res.status(201).json(newBlog);
//   } catch (error) {
//     console.error("Error creating blog:", error);
//     if (req.files) {
//       await Promise.all(
//         Object.values(req.files)
//           .flat()
//           .map((file) => fs.unlink(file.path).catch(console.error))
//       );
//     }
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content, categoryId } = req.body;
//     if (!title || !categoryId) {
//       return res
//         .status(400)
//         .json({ message: "Title and categoryId are required" });
//     }
//     if (!Array.isArray(content) || content.length === 0) {
//       return res.status(400).json({ message: "Content array is required" });
//     }
//     const slug = title
//       ? slugify(title, { lower: true, strict: true, locale: "vi" })
//       : undefined;
//     let mainImageUrl = req.body.image;
//     if (req.files && req.files.mainImage) {
//       const result = await cloudinary.uploader.upload(
//         req.files.mainImage[0].path,
//         { folder: "blog_images" }
//       );
//       mainImageUrl = result.secure_url;
//       await fs.unlink(req.files.mainImage[0].path);
//     }
//     const processedContent = await Promise.all(
//       content.map(async (item, index) => {
//         if (item.type === "image" && req.files && req.files.contentImages) {
//           const contentImage = req.files.contentImages.find(
//             (file) => file.fieldname === `contentImages[${index}]`
//           );
//           if (contentImage) {
//             const result = await cloudinary.uploader.upload(contentImage.path, {
//               folder: "blog_images",
//             });
//             await fs.unlink(contentImage.path);
//             return { ...item, url: result.secure_url };
//           }
//         }
//         return {
//           ...item,
//           bold: item.bold || false,
//           italic: item.italic || false,
//           fontSize: item.fontSize || "medium",
//         };
//       })
//     );
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       {
//         title,
//         content: processedContent,
//         image: mainImageUrl,
//         slug,
//         categoryId,
//         updatedAt: Date.now(),
//       },
//       { new: true }
//     );
//     if (!updatedBlog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.json(updatedBlog);
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     if (req.files) {
//       await Promise.all(
//         Object.values(req.files)
//           .flat()
//           .map((file) => fs.unlink(file.path).catch(console.error))
//       );
//     }
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedBlog = await Blog.findByIdAndDelete(id);
//     if (!deletedBlog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.json({ message: "Blog deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.uploadImage = async (req, res) => {
//   try {
//     const files = req.files;
//     if (!files || Object.keys(files).length === 0) {
//       return res.status(400).json({ message: "No image files provided" });
//     }
//     const uploadResults = await Promise.all(
//       Object.entries(files).flatMap(([fieldName, fileArray]) =>
//         fileArray.map(async (file) => {
//           const result = await cloudinary.uploader.upload(file.path, {
//             folder: "blog_images",
//           });
//           await fs.unlink(file.path);
//           return result.secure_url;
//         })
//       )
//     );
//     res.status(200).json({ urls: uploadResults });
//   } catch (error) {
//     console.error("Cloudinary upload error:", error.message, error.stack);
//     if (req.files) {
//       await Promise.all(
//         Object.values(req.files)
//           .flat()
//           .map((file) => fs.unlink(file.path).catch(console.error))
//       );
//     }
//     res.status(500).json({
//       message: "Failed to upload images to Cloudinary",
//       error: error.message,
//     });
//   }
// };

// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await CategoryBlog.find();
//     res.json(categories);
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createCategory = async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!name) {
//       return res.status(400).json({ message: "Category name is required" });
//     }
//     const newCategory = new CategoryBlog({ name });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (error) {
//     console.error("Error creating category:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;
//     if (!name) {
//       return res.status(400).json({ message: "Category name is required" });
//     }
//     const updatedCategory = await CategoryBlog.findByIdAndUpdate(
//       id,
//       { name },
//       { new: true }
//     );
//     if (!updatedCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.json(updatedCategory);
//   } catch (error) {
//     console.error("Error updating category:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blogs = await Blog.find({ categoryId: id });
//     if (blogs.length > 0) {
//       return res
//         .status(400)
//         .json({ message: "Cannot delete category with associated blogs" });
//     }
//     const deletedCategory = await CategoryBlog.findByIdAndDelete(id);
//     if (!deletedCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.json({ message: "Category deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting category:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getTopViewedBlogs = async (req, res) => {
//   try {
//     const topBlogs = await Blog.find()
//       .populate("categoryId", "name")
//       .sort({ views: -1 }) // Sắp xếp giảm dần theo views
//       .limit(5) // Lấy 5 bài viết đầu tiên
//       .select("title content slug image views"); // Chỉ lấy các trường cần thiết
//     res.json(topBlogs);
//   } catch (error) {
//     console.error("Error fetching top viewed blogs:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.incrementBlogViews = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const blog = await Blog.findOne({ slug });
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     blog.views = (blog.views || 0) + 1;
//     await blog.save();
//     res.json({ message: "View count incremented", views: blog.views });
//   } catch (error) {
//     console.error("Error incrementing blog views:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// //Xử lý Medical Records(Profile)
// exports.getAllProfile = async (req, res) => {
//   try {
//     const profiles = await Profile.find()
//       .populate('doctorId', 'name')
//       .populate('medicine', 'name type unitPrice');
//     res.json(profiles);
//   } catch (error) {
//     console.error('Lỗi khi lấy tất cả hồ sơ:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createProfile = async (req, res) => {
//   try {
//     const { name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine } = req.body;
//     if (!name || !dateOfBirth || !gender) {
//       return res.status(400).json({ message: 'Tên, ngày sinh và giới tính là bắt buộc' });
//     }
//     if (!['Male', 'Female', 'Other'].includes(gender)) {
//       return res.status(400).json({ message: 'Giới tính không hợp lệ' });
//     }
//     const profile = new Profile({ name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine });
//     const savedProfile = await profile.save();
//     const populatedProfile = await Profile.findById(savedProfile._id)
//       .populate('doctorId', 'name email role')
//       .populate('medicine', 'name type unitPrice');
//     res.status(201).json(populatedProfile);
//   } catch (error) {
//     console.error('Lỗi khi tạo hồ sơ:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine } = req.body;
//     if (!name || !dateOfBirth || !gender) {
//       return res.status(400).json({ message: 'Tên, ngày sinh và giới tính là bắt buộc' });
//     }
//     if (!['Male', 'Female', 'Other'].includes(gender)) {
//       return res.status(400).json({ message: 'Giới tính không hợp lệ' });
//     }
//     const profile = await Profile.findByIdAndUpdate(
//       id,
//       { name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine },
//       { new: true }
//     )
//       .populate('doctorId', 'name email role')
//       .populate('medicine', 'name type unitPrice');
//     if (!profile) {
//       return res.status(404).json({ message: 'Hồ sơ không tìm thấy' });
//     }
//     res.json(profile);
//   } catch (error) {
//     console.error('Lỗi khi sửa hồ sơ:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deleteProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const profile = await Profile.findByIdAndDelete(id);
//     if (!profile) {
//       return res.status(404).json({ message: 'Hồ sơ không tìm thấy' });
//     }
//     res.json({ message: 'Hồ sơ đã được xóa thành công' });
//   } catch (error) {
//     console.error('Lỗi khi xóa hồ sơ:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// //lấy thông tin bác sĩ
// exports.getDoctors = async (req, res) => {
//   try {
//     const doctors = await Employee.find({ role: 'Doctor' }).select('name email role');
//     res.json(doctors);
//   } catch (error) {
//     console.error('Lỗi khi lấy danh sách bác sĩ:', error);
//     res.status(500).json({ message: 'Lỗi server khi lấy danh sách bác sĩ' });
//   }
// };
// exports.getAllMedicines = async (req, res) => {
//   try {
//     const medicines = await Medicine.find().select('name type unitPrice');
//     res.json(medicines);
//   } catch (error) {
//     console.error('Lỗi khi lấy danh sách thuốc:', error);
//     res.status(500).json({ message: 'Lỗi server khi lấy thuốc' });
//   }
// };

// // News - Quản lí tin tức phòng khám
// // Get all news
// exports.getAllNews = async (req, res) => {
//   try {
//     const { category, isFeatured, priority, page = 1, limit = 10 } = req.query;

//     // Build query object
//     const query = {};
//     if (category) query.category = category;
//     if (isFeatured === "true") query.isFeatured = true;
//     if (priority) query.priority = priority;

//     // Calculate pagination
//     const skip = (page - 1) * limit;

//     // Fetch news with pagination, sorted by creation date (newest first)
//     const news = await News.find(query)
//       .populate("author_id", "name email")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit))
//       .lean();

//     // Get total count for pagination
//     const total = await News.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: news,
//       pagination: {
//         total,
//         page: parseInt(page),
//         pages: Math.ceil(total / limit),
//         limit: parseInt(limit),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get news by slug
// exports.getNewsBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const news = await News.findOne({ slug })
//       .populate("author_id", "name email")
//       .lean();
//     if (!news) {
//       return res.status(404).json({ success: false, message: "News not found" });
//     }
//     res.status(200).json({ success: true, data: news });
//   } catch (error) {
//     console.error("Error fetching news by slug:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Create a new news item
// exports.createNews = async (req, res) => {
//   try {
//     const { title, content, category, isFeatured, priority, validUntil } = req.body;
//     const author_id = req.user.userId;

//     // Validate required fields
//     if (!title || !content || !category) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Title, content, and category are required" });
//     }

//     // Validate category
//     const validCategories = ["Holiday Notice", "Promotion", "Event", "Service Update", "Other"];
//     if (!validCategories.includes(category)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid category provided" });
//     }

//     // Validate priority
//     const validPriorities = ["low", "medium", "high"];
//     if (priority && !validPriorities.includes(priority)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid priority provided" });
//     }

//     // Validate thumbnail (required)
//     if (!req.files?.thumbnail && !req.body.thumbnail) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Thumbnail is required" });
//     }

//     // Handle thumbnail upload
//     let thumbnailUrl = req.body.thumbnail || "";
//     if (req.files && req.files.thumbnail) {
//       const result = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
//         folder: "news_images",
//       });
//       thumbnailUrl = result.secure_url;
//       await fs.unlink(req.files.thumbnail[0].path).catch(console.error);
//     }

//     // Handle optional image upload
//     let imageUrl = req.body.image || "";
//     if (req.files && req.files.image) {
//       const result = await cloudinary.uploader.upload(req.files.image[0].path, {
//         folder: "news_images",
//       });
//       imageUrl = result.secure_url;
//       await fs.unlink(req.files.image[0].path).catch(console.error);
//     }

//     // Generate slug
//     const slug = slugify(title, { lower: true, strict: true, locale: "vi" });

//     // Check for slug uniqueness
//     const existingNews = await News.findOne({ slug });
//     if (existingNews) {
//       return res
//         .status(400)
//         .json({ success: false, message: "A news item with this title already exists. Please use a different title." });
//     }

//     // Create news item
//     const newNews = new News({
//       title,
//       content,
//       image: imageUrl,
//       category,
//       thumbnail: thumbnailUrl,
//       slug,
//       author_id,
//       isFeatured: !!isFeatured, // Ensure boolean
//       priority: priority || "medium",
//       validUntil: validUntil ? new Date(validUntil) : undefined,
//     });

//     await newNews.save();

//     // Populate author details in response
//     const populatedNews = await News.findById(newNews._id)
//       .populate("author_id", "name email")
//       .lean();

//     res.status(201).json({
//       success: true,
//       message: "News created successfully",
//       data: populatedNews,
//     });
//   } catch (error) {
//     console.error("Error creating news:", error);
//     // Clean up uploaded files
//     if (req.files) {
//       await Promise.all(
//         Object.values(req.files)
//           .flat()
//           .map((file) => fs.unlink(file.path).catch(console.error))
//       );
//     }
//     if (error.code === 11000) {
//       return res
//         .status(400)
//         .json({ success: false, message: "A news item with this title already exists. Please use a different title." });
//     }
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Update a news item
// exports.updateNews = async (req, res) => {
//   try {
//     console.log('mongoose in updateNews:', mongoose ? 'Available' : 'Undefined'); // Debug
//     const { id } = req.params;
//     const { title, content, category, isFeatured, priority, validUntil, thumbnail, image } = req.body;

//     // Validate ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid news ID' });
//     }

//     // Check if news exists
//     const news = await News.findById(id);
//     if (!news) {
//       return res.status(404).json({ success: false, message: 'News not found' });
//     }

//     // Validate required fields
//     if (title && !title.trim()) {
//       return res.status(400).json({ success: false, message: 'Title is required' });
//     }
//     if (content && !content.trim()) {
//       return res.status(400).json({ success: false, message: 'Content is required' });
//     }
//     if (category && !['Holiday Notice', 'Promotion', 'Event', 'Service Update', 'Other'].includes(category)) {
//       return res.status(400).json({ success: false, message: 'Invalid category' });
//     }
//     if (priority && !['low', 'medium', 'high'].includes(priority)) {
//       return res.status(400).json({ success: false, message: 'Invalid priority' });
//     }
//     if (thumbnail && !thumbnail.trim()) {
//       return res.status(400).json({ success: false, message: 'Thumbnail is required' });
//     }

//     // Generate slug if title is updated
//     const slug = title ? slugify(title, { lower: true, strict: true, locale: 'vi' }) : news.slug;

//     // Update news
//     const updatedNews = await News.findByIdAndUpdate(
//       id,
//       {
//         title: title || news.title,
//         content: content || news.content,
//         image: image || news.image,
//         category: category || news.category,
//         thumbnail: thumbnail || news.thumbnail,
//         slug,
//         isFeatured: isFeatured !== undefined ? isFeatured : news.isFeatured,
//         priority: priority || news.priority,
//         validUntil: validUntil ? new Date(validUntil) : news.validUntil,
//         updatedAt: Date.now(),
//       },
//       { new: true }
//     ).populate('author_id', 'name email');

//     res.status(200).json({
//       success: true,
//       message: 'News updated successfully',
//       data: updatedNews,
//     });
//   } catch (error) {
//     console.error('Error updating news:', error);
//     if (error.code === 11000) {
//       return res.status(400).json({ success: false, message: 'Slug already exists. Please use a different title.' });
//     }
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Delete a news item
// exports.deleteNews = async (req, res) => {
//   try {
//     console.log('mongoose in deleteNews:', mongoose ? 'Available' : 'Undefined'); // Debug
//     const { id } = req.params;

//     // Validate ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid news ID' });
//     }

//     // Check if news exists
//     const deletedNews = await News.findByIdAndDelete(id);
//     if (!deletedNews) {
//       return res.status(404).json({ success: false, message: 'News not found' });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'News deleted successfully',
//     });
//   } catch (error) {
//     console.error('Error deleting news:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Increment news views
// exports.incrementNewsViews = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const news = await News.findOne({ slug });
//     if (!news) {
//       return res.status(404).json({ success: false, message: "News not found" });
//     }
//     news.views = (news.views || 0) + 1;
//     await news.save();
//     res.status(200).json({
//       success: true,
//       message: "View count incremented",
//       views: news.views,
//     });
//   } catch (error) {
//     console.error("Error incrementing news views:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get top viewed news
// exports.getTopViewedNews = async (req, res) => {
//   try {
//     const topNews = await News.find()
//       .sort({ views: -1 }) // Sort by views descending
//       .limit(5) // Get top 5 news items
//       .select("title content slug thumbnail views") // Select relevant fields
//       .lean();
//     res.status(200).json({ success: true, data: topNews });
//   } catch (error) {
//     console.error("Error fetching top viewed news:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Upload image for news
// exports.uploadImage = async (req, res) => {
//   try {
//     const files = req.files;
//     if (!files || Object.keys(files).length === 0) {
//       return res.status(400).json({ success: false, message: "No image files provided" });
//     }
//     const uploadResults = await Promise.all(
//       Object.entries(files).flatMap(([fieldName, fileArray]) =>
//         fileArray.map(async (file) => {
//           const result = await cloudinary.uploader.upload(file.path, {
//             folder: "news_images",
//           });
//           await fs.unlink(file.path);
//           return result.secure_url;
//         })
//       )
//     );
//     res.status(200).json({ success: true, urls: uploadResults });
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     if (req.files) {
//       await Promise.all(
//         Object.values(req.files)
//           .flat()
//           .map((file) => fs.unlink(file.path).catch(console.error))
//       );
//     }
//     res.status(500).json({
//       success: false,
//       message: "Failed to upload images to Cloudinary",
//       error: error.message,
//     });
//   }
// };