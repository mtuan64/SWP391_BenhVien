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
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "../../assets/css/MedicalRecord.css";

const MedicalRecord = () => {
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [newRecord, setNewRecord] = useState({
    userId: "",
    user_code: "",
    name: "",
    identityNumber: "",
    dateOfBirth: "",
    gender: "",
    diagnose: "",
    note: "",
    issues: "",
    doctorId: "",
    medicine: "",
    service: "",
  });
  const [userName, setUserName] = useState("");
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
      const [profilesResponse, doctorsResponse, medicinesResponse] = await Promise.all([
        axios.get("http://localhost:9999/api/staff/profiles", config),
        axios.get("http://localhost:9999/api/staff/doctors", config),
        axios.get("http://localhost:9999/api/staff/medicines", config),
      ]);
      setRecords(profilesResponse.data.data || []);
      setDoctors(doctorsResponse.data.data || []);
      setMedicines(medicinesResponse.data.data || []);
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error);
      setErrorMessage(error.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUser = async () => {
    if (!newRecord.user_code.trim()) {
      setErrorMessage("Please enter a user code");
      setUserName("");
      setNewRecord({ ...newRecord, userId: "" });
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:9999/api/staff/user_search/${newRecord.user_code}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserName(response.data.data.name || "");
      setNewRecord({ ...newRecord, userId: response.data.data.userId || "" });
      setErrorMessage("");
    } catch (error) {
      console.error("Search user error:", error.response?.data || error);
      setUserName("");
      setNewRecord({ ...newRecord, userId: "" });
      setErrorMessage(error.response?.data?.message || "Failed to search user");
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
        ...(newRecord.userId && { userId: newRecord.userId }),
        ...(newRecord.diagnose && { diagnose: newRecord.diagnose }),
        ...(newRecord.note && { note: newRecord.note }),
        ...(newRecord.issues && { issues: newRecord.issues }),
        ...(newRecord.doctorId && { doctorId: newRecord.doctorId }),
        ...(newRecord.medicine && { medicine: newRecord.medicine }),
        ...(newRecord.service && { service: newRecord.service }),
      };
      const response = await axios.post(
        "http://localhost:9999/api/staff/profiles",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecords([...records, response.data.data]);
      setNewRecord({
        userId: "",
        user_code: "",
        name: "",
        identityNumber: "",
        dateOfBirth: "",
        gender: "",
        diagnose: "",
        note: "",
        issues: "",
        doctorId: "",
        medicine: "",
        service: "",
      });
      setUserName("");
      setOpenAddRecord(false);
      setSuccessMessage("Patient record added successfully!");
      setPage(Math.ceil((records.length + 1) / recordsPerPage));
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
        ...(editingRecord.userId && { userId: editingRecord.userId }),
        ...(editingRecord.diagnose && { diagnose: editingRecord.diagnose }),
        ...(editingRecord.note && { note: editingRecord.note }),
        ...(editingRecord.issues && { issues: editingRecord.issues }),
        ...(editingRecord.doctorId && { doctorId: editingRecord.doctorId }),
        ...(editingRecord.medicine && { medicine: editingRecord.medicine }),
        ...(editingRecord.service && { service: editingRecord.service }),
      };
      const response = await axios.put(
        `http://localhost:9999/api/staff/profiles/${editingRecord._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecords(
        records.map((record) =>
          record._id === editingRecord._id ? response.data.data : record
        )
      );
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
      setRecords(records.filter((record) => record._id !== recordToDelete._id));
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
      userId: record.userId || "",
      userCode: record.userCode || "",
      userName: record.userName || "",
      name: record.name || "",
      identityNumber: record.identityNumber || "",
      dateOfBirth: record.dateOfBirth ? record.dateOfBirth.split("T")[0] : "",
      gender: record.gender || "",
      diagnose: record.diagnose || "",
      note: record.note || "",
      issues: record.issues || "",
      doctorId: record.doctor?._id || "",
      medicine: record.medicine?._id || "",
      service: record.service?._id || "",
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
      userId: "",
      user_code: "",
      name: "",
      identityNumber: "",
      dateOfBirth: "",
      gender: "",
      diagnose: "",
      note: "",
      issues: "",
      doctorId: "",
      medicine: "",
      service: "",
    });
    setUserName("");
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
      record.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.userCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        label="Search by Profile Name, User Name, User Code, or Identity Number"
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
              <TableCell>User Code</TableCell>
              <TableCell>User Name</TableCell>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecords.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{record.userCode || "N/A"}</TableCell>
                <TableCell>{record.userName || "N/A"}</TableCell>
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
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <TextField
              margin="dense"
              label="User Code"
              type="text"
              fullWidth
              value={newRecord.user_code}
              onChange={(e) => setNewRecord({ ...newRecord, user_code: e.target.value })}
              helperText="Enter user code to link a user (optional)"
              style={{ marginRight: "8px" }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={handleSearchUser}
              disabled={loading}
            >
              Search
            </Button>
          </div>
          <TextField
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            value={userName}
            disabled
          />
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
          <TextField
            margin="dense"
            label="Diagnosis"
            type="text"
            fullWidth
            value={newRecord.diagnose}
            onChange={(e) => setNewRecord({ ...newRecord, diagnose: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={newRecord.note}
            onChange={(e) => setNewRecord({ ...newRecord, note: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Issues"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={newRecord.issues}
            onChange={(e) => setNewRecord({ ...newRecord, issues: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Doctor</InputLabel>
            <Select
              value={newRecord.doctorId || ""}
              onChange={(e) => setNewRecord({ ...newRecord, doctorId: e.target.value })}
              disabled={doctors.length === 0}
            >
              <MenuItem value="">None</MenuItem>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No doctors available</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Medicine</InputLabel>
            <Select
              value={newRecord.medicine || ""}
              onChange={(e) => setNewRecord({ ...newRecord, medicine: e.target.value })}
              disabled={medicines.length === 0}
            >
              <MenuItem value="">None</MenuItem>
              {medicines.length > 0 ? (
                medicines.map((medicine) => (
                  <MenuItem key={medicine._id} value={medicine._id}>
                    {medicine.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No medicines available</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Service</InputLabel>
            <Select
              value={newRecord.service || ""}
              onChange={(e) => setNewRecord({ ...newRecord, service: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              {/* Add service options if available */}
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
            label="User Code"
            type="text"
            fullWidth
            value={editingRecord?.userCode || ""}
            disabled
          />
          <TextField
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            value={editingRecord?.userName || ""}
            disabled
          />
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
          <TextField
            margin="dense"
            label="Diagnosis"
            type="text"
            fullWidth
            value={editingRecord?.diagnose || ""}
            onChange={(e) => setEditingRecord({ ...editingRecord, diagnose: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={editingRecord?.note || ""}
            onChange={(e) => setEditingRecord({ ...editingRecord, note: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Issues"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={editingRecord?.issues || ""}
            onChange={(e) => setEditingRecord({ ...editingRecord, issues: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Doctor</InputLabel>
            <Select
              value={editingRecord?.doctorId || ""}
              onChange={(e) => setEditingRecord({ ...editingRecord, doctorId: e.target.value })}
              disabled={doctors.length === 0}
            >
              <MenuItem value="">None</MenuItem>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No doctors available</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Medicine</InputLabel>
            <Select
              value={editingRecord?.medicine || ""}
              onChange={(e) => setEditingRecord({ ...editingRecord, medicine: e.target.value })}
              disabled={medicines.length === 0}
            >
              <MenuItem value="">None</MenuItem>
              {medicines.length > 0 ? (
                medicines.map((medicine) => (
                  <MenuItem key={medicine._id} value={medicine._id}>
                    {medicine.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No medicines available</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Service</InputLabel>
            <Select
              value={editingRecord?.service || ""}
              onChange={(e) => setEditingRecord({ ...editingRecord, service: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              {/* Add service options if available */}
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