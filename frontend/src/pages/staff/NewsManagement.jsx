import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../../assets/css/NewsManagement.css";

const NEWS_CATEGORIES = [
  "Thông Báo Nghỉ Lễ",
  "Khuyến Mãi",
  "Sự Kiện",
  "Cập Nhật Dịch Vụ",
  "Khác",
];
const PRIORITIES = ["low", "medium", "high"];
const API_BASE_URL = "http://localhost:9999/api/staff";

const NewsManagement = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    category: "",
    isFeatured: false,
    priority: "medium",
    validUntil: "",
  });
  const [openEditNews, setOpenEditNews] = useState(false);
  const [openAddNews, setOpenAddNews] = useState(false);
  const [openDeleteNewsConfirm, setOpenDeleteNewsConfirm] = useState(false);
  const [imageFiles, setImageFiles] = useState({
    thumbnail: null,
    image: null,
  });
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterIsFeatured, setFilterIsFeatured] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const newsPerPage = 3;
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const truncateContent = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text || "";
    let lastSpace = text.substring(0, maxLength).lastIndexOf(" ");
    let lastNewline = text.substring(0, maxLength).lastIndexOf("\n");
    let cutOff = Math.max(lastSpace, lastNewline);
    cutOff = cutOff > 0 ? cutOff : maxLength;
    while (cutOff > 0 && /[\uD800-\uDFFF]/.test(text[cutOff - 1])) {
      cutOff--;
    }
    return text.substring(0, cutOff) + "...";
  };

  useEffect(() => {
    const token = getToken();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!token || !user || user.role !== "Staff") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }
    fetchNews();
  }, [navigate, page, filterCategory, filterIsFeatured, filterPriority, searchQuery]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("No authentication token found");
      const response = await axios.get(`${API_BASE_URL}/news`, {
        params: {
          category: filterCategory || undefined,
          isFeatured: filterIsFeatured || undefined,
          priority: filterPriority || undefined,
          title: searchQuery || undefined,
          page,
          limit: newsPerPage,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewsItems(response.data.data || []);
      setTotalPages(response.data.pagination?.pages || 1);
    } catch (error) {
      console.error("Error fetching news:", error);
      const message = error.response?.data?.message || error.message || "Failed to fetch news";
      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setErrorMessage(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImages = async (files) => {
    const formData = new FormData();
    if (files.thumbnail) formData.append("thumbnail", files.thumbnail);
    if (files.image) formData.append("image", files.image);
    if (!files.thumbnail && !files.image) return { thumbnail: "", image: "" };

    try {
      const token = getToken();
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        `${API_BASE_URL}/news/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const urls = response.data.urls || [];
      return {
        thumbnail: files.thumbnail ? urls[0] || "" : "",
        image: files.image ? (urls[1] || urls[0] || "") : "",
      };
    } catch (error) {
      console.error("Error uploading images:", error);
      const message = error.response?.data?.message || error.message || "Failed to upload images";
      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setErrorMessage(message);
      }
      return { thumbnail: "", image: "" };
    }
  };

  const handleAddNews = async () => {
    setLoading(true);
    try {
      if (!newNews.title.trim()) throw new Error("Please enter a title.");
      if (!newNews.content.trim()) throw new Error("Please enter content.");
      if (!newNews.category) throw new Error("Please select a category.");
      if (!imageFiles.thumbnail) throw new Error("Please upload a thumbnail.");
      if (!NEWS_CATEGORIES.includes(newNews.category)) throw new Error("Invalid category selected.");
      if (!PRIORITIES.includes(newNews.priority)) throw new Error("Invalid priority selected.");

      let newsToAdd = {
        title: newNews.title,
        content: newNews.content,
        category: newNews.category,
        isFeatured: newNews.isFeatured,
        priority: newNews.priority,
        validUntil: newNews.validUntil || undefined,
      };

      const uploadedUrls = await handleUploadImages(imageFiles);
      if (!uploadedUrls.thumbnail) throw new Error("Thumbnail upload failed. Please try again.");

      newsToAdd = {
        ...newsToAdd,
        thumbnail: uploadedUrls.thumbnail,
        image: uploadedUrls.image || "",
      };

      const token = getToken();
      if (!token) throw new Error("No authentication token found");

      console.log("News payload:", newsToAdd);

      const response = await axios.post(`${API_BASE_URL}/news`, newsToAdd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNewsItems([response.data.data, ...newsItems]);
      setNewNews({
        title: "",
        content: "",
        category: "",
        isFeatured: false,
        priority: "medium",
        validUntil: "",
      });
      setImageFiles({ thumbnail: null, image: null });
      setOpenAddNews(false);
      setSuccessMessage("News added successfully!");
      setPage(1);
    } catch (error) {
      console.error("Error adding news:", error);
      let message = error.response?.data?.message || error.message || "Failed to add news";
      if (message.includes("A news item with this title already exists")) {
        message = `${message} Try adding a unique identifier to the title (e.g., "Sự Kiện - Tháng 6 2025").`;
      }
      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setErrorMessage(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNews = async () => {
    setLoading(true);
    try {
      if (!editingNews.title.trim()) throw new Error("Please enter a title.");
      if (!editingNews.content.trim()) throw new Error("Please enter content.");
      if (!editingNews.category) throw new Error("Please select a category.");
      if (!imageFiles.thumbnail && !editingNews.thumbnail) throw new Error("Please upload or retain a thumbnail.");
      if (!NEWS_CATEGORIES.includes(editingNews.category)) throw new Error("Invalid category selected.");
      if (!PRIORITIES.includes(editingNews.priority)) throw new Error("Invalid priority selected.");

      let updatedNews = {
        title: editingNews.title,
        content: editingNews.content,
        category: editingNews.category,
        isFeatured: editingNews.isFeatured,
        priority: editingNews.priority,
        validUntil: editingNews.validUntil || undefined,
        thumbnail: editingNews.thumbnail,
        image: editingNews.image,
      };

      if (imageFiles.thumbnail || imageFiles.image) {
        const uploadedUrls = await handleUploadImages(imageFiles);
        updatedNews.thumbnail = uploadedUrls.thumbnail || updatedNews.thumbnail;
        updatedNews.image = uploadedUrls.image || updatedNews.image;
      }

      const token = getToken();
      if (!token) throw new Error("No authentication token found");

      console.log("Updating news with payload:", updatedNews);

      const response = await axios.put(
        `${API_BASE_URL}/news/${editingNews._id}`,
        updatedNews,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNewsItems(
        newsItems.map((news) =>
          news._id === editingNews._id ? response.data.data : news
        )
      );
      setEditingNews(null);
      setOpenEditNews(false);
      setImageFiles({ thumbnail: null, image: null });
      setSuccessMessage("News updated successfully!");
    } catch (error) {
      console.error("Error updating news:", error);
      const message = error.response?.data?.message || error.message || "Failed to update news";
      console.error("Backend error details:", error.response?.data);
      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setErrorMessage(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("No authentication token found");
      await axios.delete(`${API_BASE_URL}/news/${newsToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewsItems(newsItems.filter((news) => news._id !== newsToDelete._id));
      setOpenDeleteNewsConfirm(false);
      setNewsToDelete(null);
      setSuccessMessage("News deleted successfully!");
      if (newsItems.length % newsPerPage === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      const message = error.response?.data?.message || error.message || "Failed to delete news";
      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setErrorMessage(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditNews = (news) => {
    setEditingNews({
      _id: news._id,
      title: news.title,
      content: news.content,
      thumbnail: news.thumbnail,
      image: news.image,
      category: news.category,
      isFeatured: news.isFeatured,
      priority: news.priority,
      validUntil: news.validUntil ? news.validUntil.split("T")[0] : "",
    });
    setOpenEditNews(true);
  };

  const handleCloseEditNews = () => {
    setOpenEditNews(false);
    setEditingNews(null);
    setImageFiles({ thumbnail: null, image: null });
  };

  const handleOpenAddNews = () => {
    setOpenAddNews(true);
  };

  const handleCloseAddNews = () => {
    setOpenAddNews(false);
    setNewNews({
      title: "",
      content: "",
      category: "",
      isFeatured: false,
      priority: "medium",
      validUntil: "",
    });
    setImageFiles({ thumbnail: null, image: null });
  };

  const handleOpenDeleteNewsConfirm = (news) => {
    setNewsToDelete(news);
    setOpenDeleteNewsConfirm(true);
  };

  const handleCloseDeleteNewsConfirm = () => {
    setOpenDeleteNewsConfirm(false);
    setNewsToDelete(null);
  };

  const handleImageChange = (type, file) => {
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size exceeds 5MB limit.");
      return;
    }
    setImageFiles((prev) => ({ ...prev, [type]: file }));
  };

  const handleCloseSuccess = () => {
    setSuccessMessage("");
  };

  const handleCloseError = () => {
    setErrorMessage("");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const isAddButtonDisabled = !newNews.title.trim() || !newNews.content.trim() || !newNews.category || !imageFiles.thumbnail;

  return (
    <div className="news-list-page">
      <h1>Quản Lý Tin Tức</h1>
      <Box className="filter-search-container" sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <FormControl variant="outlined" sx={{ minWidth: 200, flex: 1 }}>
          <InputLabel id="filter-category-label" shrink={!!filterCategory}>
            Lọc Theo Danh Mục
          </InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            label="Lọc Theo Danh Mục"
          >
            <MenuItem value="">
              <em>Tất Cả Danh Mục</em>
            </MenuItem>
            {NEWS_CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 200, flex: 1 }}>
          <InputLabel id="filter-isFeatured-label" shrink={!!filterIsFeatured}>
            Nổi Bật
          </InputLabel>
          <Select
            labelId="filter-isFeatured-label"
            value={filterIsFeatured}
            onChange={(e) => setFilterIsFeatured(e.target.value)}
            label="Nổi Bật"
          >
            <MenuItem value="">
              <em>Tất Cả</em>
            </MenuItem>
            <MenuItem value="true">Nổi Bật</MenuItem>
            <MenuItem value="false">Không Nổi Bật</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 200, flex: 1 }}>
          <InputLabel id="filter-priority-label" shrink={!!filterPriority}>
            Độ Ưu Tiên
          </InputLabel>
          <Select
            labelId="filter-priority-label"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            label="Độ Ưu Tiên"
          >
            <MenuItem value="">
              <em>Tất Cả</em>
            </MenuItem>
            <MenuItem value="low">Thấp</MenuItem>
            <MenuItem value="medium">Trung Bình</MenuItem>
            <MenuItem value="high">Cao</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Tìm Kiếm Theo Tiêu Đề"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
          InputLabelProps={{ shrink: !!searchQuery }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAddNews}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        Add News
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Valid Until</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsItems.map((news) => (
              <TableRow key={news._id}>
                <TableCell>{news.title}</TableCell>
                <TableCell className="content-cell">{truncateContent(news.content, 50)}</TableCell>
                <TableCell>
                  {news.thumbnail && (
                    <img src={news.thumbnail} alt={news.title} style={{ width: "50px" }} />
                  )}
                </TableCell>
                <TableCell>
                  {news.image && (
                    <img src={news.image} alt={news.title} style={{ width: "50px" }} />
                  )}
                </TableCell>
                <TableCell>{news.category}</TableCell>
                <TableCell>{news.isFeatured ? "Có" : "Không"}</TableCell>
                <TableCell>
                  {news.priority === "low" ? "Thấp" : news.priority === "medium" ? "Trung Bình" : "Cao"}
                </TableCell>
                <TableCell>
                  {news.validUntil ? new Date(news.validUntil).toLocaleDateString("vi-VN") : "N/A"}
                </TableCell>
                <TableCell>{news.slug}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpenEditNews(news)}
                    startIcon={<EditIcon />}
                    disabled={loading}
                  />
                  <Button
                    color="secondary"
                    onClick={() => handleOpenDeleteNewsConfirm(news)}
                    startIcon={<DeleteIcon />}
                    disabled={loading}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
      {/* Edit News Dialog */}
      <Dialog open={openEditNews} onClose={handleCloseEditNews} maxWidth="md" fullWidth>
        <DialogTitle>Edit News</DialogTitle>
        <DialogContent>
          {loading && (
            <div className="custom-loading-overlay">
              <CircularProgress />
            </div>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Tiêu Đề"
            type="text"
            fullWidth
            value={editingNews?.title || ""}
            onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
            variant="outlined"
            InputLabelProps={{ shrink: !!editingNews?.title }}
          />
          <TextField
            margin="dense"
            label="Nội Dung"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editingNews?.content || ""}
            onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
            variant="outlined"
            InputLabelProps={{ shrink: !!editingNews?.content }}
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel id="edit-category-label" shrink={!!editingNews?.category}>
              Danh Mục
            </InputLabel>
            <Select
              labelId="edit-category-label"
              value={editingNews?.category || ""}
              onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
              label="Danh Mục"
            >
              {NEWS_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={editingNews?.isFeatured || false}
                onChange={(e) => setEditingNews({ ...editingNews, isFeatured: e.target.checked })}
              />
            }
            label="Nổi Bật"
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel id="edit-priority-label" shrink={!!editingNews?.priority}>
              Độ Ưu Tiên
            </InputLabel>
            <Select
              labelId="edit-priority-label"
              value={editingNews?.priority || "medium"}
              onChange={(e) => setEditingNews({ ...editingNews, priority: e.target.value })}
              label="Độ Ưu Tiên"
            >
              {PRIORITIES.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority === "low" ? "Thấp" : priority === "medium" ? "Trung Bình" : "Cao"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Hiệu Lực Đến"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editingNews?.validUntil || ""}
            onChange={(e) => setEditingNews({ ...editingNews, validUntil: e.target.value })}
            variant="outlined"
          />
          <Box sx={{ mt: 2 }}>
            <label>
              Ảnh Thu Nhỏ (bắt buộc):
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={(e) => handleImageChange("thumbnail", e.target.files[0])}
              />
            </label>
            {editingNews?.thumbnail && (
              <img
                src={editingNews.thumbnail}
                alt="Thumbnail"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <label>
              Ảnh (tùy chọn):
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={(e) => handleImageChange("image", e.target.files[0])}
              />
            </label>
            {editingNews?.image && (
              <img
                src={editingNews.image}
                alt="Image"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditNews} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleUpdateNews} color="primary" disabled={loading}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add News Dialog */}
      <Dialog open={openAddNews} onClose={handleCloseAddNews} maxWidth="md" fullWidth>
        <DialogTitle>Add News</DialogTitle>
        <DialogContent>
          {loading && (
            <div className="custom-loading-overlay">
              <CircularProgress />
            </div>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Tiêu Đề"
            type="text"
            fullWidth
            value={newNews.title}
            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
            variant="outlined"
            InputLabelProps={{ shrink: !!newNews.title }}
          />
          <TextField
            margin="dense"
            label="Nội Dung"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newNews.content}
            onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
            variant="outlined"
            InputLabelProps={{ shrink: !!newNews.content }}
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel id="add-category-label" shrink={!!newNews.category}>
              Danh Mục
            </InputLabel>
            <Select
              labelId="add-category-label"
              value={newNews.category}
              onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
              label="Danh Mục"
            >
              {NEWS_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={newNews.isFeatured}
                onChange={(e) => setNewNews({ ...newNews, isFeatured: e.target.checked })}
              />
            }
            label="Nổi Bật"
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel id="add-priority-label" shrink={!!newNews.priority}>
              Độ Ưu Tiên
            </InputLabel>
            <Select
              labelId="add-priority-label"
              value={newNews.priority}
              onChange={(e) => setNewNews({ ...newNews, priority: e.target.value })}
              label="Độ Ưu Tiên"
            >
              {PRIORITIES.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority === "low" ? "Thấp" : priority === "medium" ? "Trung Bình" : "Cao"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Hiệu Lực Đến"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newNews.validUntil}
            onChange={(e) => setNewNews({ ...newNews, validUntil: e.target.value })}
            variant="outlined"
          />
          <Box sx={{ mt: 2 }}>
            <label>
              Ảnh Thu Nhỏ (bắt buộc):
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={(e) => handleImageChange("thumbnail", e.target.files[0])}
                required
              />
            </label>
          </Box>
          <Box sx={{ mt: 2 }}>
            <label>
              Ảnh (tùy chọn):
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={(e) => handleImageChange("image", e.target.files[0])}
              />
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddNews} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleAddNews} color="primary" disabled={loading || isAddButtonDisabled}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete News Confirm Dialog */}
      <Dialog open={openDeleteNewsConfirm} onClose={handleCloseDeleteNewsConfirm}>
        <DialogTitle>Delete News</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn xóa tin tức này không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteNewsConfirm} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDeleteNews} color="secondary" disabled={loading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewsManagement;