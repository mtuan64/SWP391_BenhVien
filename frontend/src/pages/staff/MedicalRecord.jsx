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
  CircularProgress,
  Snackbar,
  Alert,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../../assets/css/MedicalRecord.css";

const MedicalRecord = () => {
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [services, setServices] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [newRecord, setNewRecord] = useState({
    name: "",
    identityNumber: "",
    dateOfBirth: "",
    gender: "",
  });
  const [openEditRecord, setOpenEditRecord] = useState(false);
  const [openAddRecord, setOpenAddRecord] = useState(false);
  const [openDeleteRecordConfirm, setOpenDeleteRecordConfirm] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const recordsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log('User from localStorage:', user);
    if (!token || !user || user.role !== "Staff") {
      navigate("/");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [profilesResponse, doctorsResponse, medicinesResponse, servicesResponse] = await Promise.all([
        axios.get("http://localhost:9999/api/staff/profiles", config),
        axios.get("http://localhost:9999/api/staff/doctors", config),
        axios.get("http://localhost:9999/api/staff/medicines", config),
        axios.get("http://localhost:9999/api/staff/services", config),
      ]);
      // Sort records by updatedAt in descending order (newest first)
      const sortedRecords = (profilesResponse.data.data || []).sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setRecords(sortedRecords);
      setDoctors(doctorsResponse.data.data || []);
      setMedicines(medicinesResponse.data.data || []);
      setServices(servicesResponse.data.data || []);
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error);
      setErrorMessage(error.response?.data?.message || "Failed to fetch data");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async () => {
    setLoading(true);
    setErrorMessage("");
    if (
      !newRecord.name.trim() ||
      !newRecord.identityNumber.trim() ||
      !newRecord.dateOfBirth ||
      !newRecord.gender
    ) {
      setErrorMessage("Please fill in all required fields: Profile Name, Identity Number, Date of Birth, Gender.");
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const payload = {
        name: newRecord.name,
        identityNumber: newRecord.identityNumber,
        dateOfBirth: newRecord.dateOfBirth,
        gender: newRecord.gender,
      };
      const response = await axios.post(
        "http://localhost:9999/api/staff/profiles",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Add new record and re-sort by updatedAt
      const updatedRecords = [response.data.data, ...records].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setRecords(updatedRecords);
      setNewRecord({
        name: "",
        identityNumber: "",
        dateOfBirth: "",
        gender: "",
      });
      setOpenAddRecord(false);
      setSuccessMessage("Patient record added successfully!");
      setPage(1); // Go to first page to show newest record
    } catch (error) {
      console.error("Add record error:", error.response?.data || error);
      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        setErrorMessage(error.response?.data?.message || "Failed to add record");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecord = async () => {
    setLoading(true);
    setErrorMessage("");
    if (
      !editingRecord.name.trim() ||
      !editingRecord.identityNumber.trim() ||
      !editingRecord.dateOfBirth ||
      !editingRecord.gender
    ) {
      setErrorMessage("Please fill in all required fields: Profile Name, Identity Number, Date of Birth, Gender.");
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const payload = {
        name: editingRecord.name,
        identityNumber: editingRecord.identityNumber,
        dateOfBirth: editingRecord.dateOfBirth,
        gender: editingRecord.gender,
      };
      const response = await axios.put(
        `http://localhost:9999/api/staff/profiles/${editingRecord._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update record and re-sort by updatedAt
      const updatedRecords = records
        .map((record) =>
          record._id === editingRecord._id ? response.data.data : record
        )
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setRecords(updatedRecords);
      setEditingRecord(null);
      setOpenEditRecord(false);
      setSuccessMessage("Patient record updated successfully!");
    } catch (error) {
      console.error("Update record error:", error.response?.data || error);
      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        setErrorMessage(error.response?.data?.message || "Failed to update record");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:9999/api/staff/profiles/${recordToDelete._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedRecords = records
        .filter((record) => record._id !== recordToDelete._id)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setRecords(updatedRecords);
      setOpenDeleteRecordConfirm(false);
      setRecordToDelete(null);
      setSuccessMessage("Patient record deleted successfully!");
      if (filteredRecords.length % recordsPerPage === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error("Delete record error:", error.response?.data || error);
      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        setErrorMessage(error.response?.data?.message || "Failed to delete record");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditRecord = (record) => {
    setEditingRecord({
      _id: record._id,
      name: record.name || "",
      identityNumber: record.identityNumber || "",
      dateOfBirth: record.dateOfBirth ? record.dateOfBirth.split("T")[0] : "",
      gender: record.gender || "",
    });
    setOpenEditRecord(true);
  };

  const handleCloseEditRecord = () => {
    setOpenEditRecord(false);
    setEditingRecord(null);
    setErrorMessage("");
  };

  const handleOpenAddRecord = () => {
    setOpenAddRecord(true);
  };

  const handleCloseAddRecord = () => {
    setOpenAddRecord(false);
    setNewRecord({
      name: "",
      identityNumber: "",
      dateOfBirth: "",
      gender: "",
    });
    setErrorMessage("");
  };

  const handleOpenDeleteRecordConfirm = (record) => {
    setRecordToDelete(record);
    setOpenDeleteRecordConfirm(true);
  };

  const handleCloseDeleteRecordConfirm = () => {
    setOpenDeleteRecordConfirm(false);
    setRecordToDelete(null);
    setErrorMessage("");
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

  const filteredRecords = records.filter(
    (record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.identityNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedRecords = filteredRecords.slice(
    (page - 1) * recordsPerPage,
    page * recordsPerPage
  );

  return (
    <div className="medical-record-management">
      <h1>Patient Record Management</h1>
      <TextField
        label="Search by Profile Name or Identity Number"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, width: "300px" }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAddRecord}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        Add Record
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile Name</TableCell>
              <TableCell>Identity Number</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Issues</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Medicine</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecords.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.identityNumber}</TableCell>
                <TableCell>
                  {new Date(record.dateOfBirth).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>{record.gender}</TableCell>
                <TableCell>{record.diagnose || "N/A"}</TableCell>
                <TableCell>{record.note || "N/A"}</TableCell>
                <TableCell>{record.issues || "N/A"}</TableCell>
                <TableCell>{record.doctor?.name || "N/A"}</TableCell>
                <TableCell>{record.medicine?.name || "N/A"}</TableCell>
                <TableCell>{record.service?.name || "N/A"}</TableCell>
                <TableCell>
                  {new Date(record.updatedAt).toLocaleString("vi-VN")}
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpenEditRecord(record)}
                    startIcon={<EditIcon />}
                    disabled={loading}
                  />
                  <Button
                    color="secondary"
                    onClick={() => handleOpenDeleteRecordConfirm(record)}
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
        count={Math.ceil(filteredRecords.length / recordsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />

      {/* Add Record Dialog */}
      <Dialog open={openAddRecord} onClose={handleCloseAddRecord} maxWidth="sm" fullWidth>
        <DialogTitle>Add Patient Record</DialogTitle>
        <DialogContent>
          {loading && (
            <div className="custom-loading-overlay">
              <CircularProgress />
            </div>
          )}
          <TextField
            margin="dense"
            label="Profile Name"
            type="text"
            fullWidth
            required
            value={newRecord.name}
            onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
            error={!!errorMessage}
          />
          <TextField
            margin="dense"
            label="Identity Number"
            type="text"
            fullWidth
            required
            value={newRecord.identityNumber}
            onChange={(e) => setNewRecord({ ...newRecord, identityNumber: e.target.value })}
            error={!!errorMessage}
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={newRecord.dateOfBirth}
            onChange={(e) => setNewRecord({ ...newRecord, dateOfBirth: e.target.value })}
            error={!!errorMessage}
          />
          <FormControl fullWidth margin="dense" required error={!!errorMessage}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={newRecord.gender}
              onChange={(e) => setNewRecord({ ...newRecord, gender: e.target.value })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddRecord} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleAddRecord} color="primary" disabled={loading}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Record Dialog */}
      <Dialog open={openEditRecord} onClose={handleCloseEditRecord} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Patient Record</DialogTitle>
        <DialogContent>
          {loading && (
            <div className="custom-loading-overlay">
              <CircularProgress />
            </div>
          )}
          <TextField
            margin="dense"
            label="Profile Name"
            type="text"
            fullWidth
            required
            value={editingRecord?.name || ""}
            onChange={(e) => setEditingRecord({ ...editingRecord, name: e.target.value })}
            error={!!errorMessage}
          />
          <TextField
            margin="dense"
            label="Identity Number"
            type="text"
            fullWidth
            required
            value={editingRecord?.identityNumber || ""}
            onChange={(e) => setEditingRecord({ ...editingRecord, identityNumber: e.target.value })}
            error={!!errorMessage}
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={editingRecord?.dateOfBirth || ""}
            onChange={(e) => setEditingRecord({ ...editingRecord, dateOfBirth: e.target.value })}
            error={!!errorMessage}
          />
          <FormControl fullWidth margin="dense" required error={!!errorMessage}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={editingRecord?.gender || ""}
              onChange={(e) => setEditingRecord({ ...editingRecord, gender: e.target.value })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditRecord} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleUpdateRecord} color="primary" disabled={loading}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Record Confirm Dialog */}
      <Dialog open={openDeleteRecordConfirm} onClose={handleCloseDeleteRecordConfirm}>
        <DialogTitle>Delete Patient Record</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this patient record?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteRecordConfirm} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDeleteRecord} color="secondary" disabled={loading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
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

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
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

export default MedicalRecord;