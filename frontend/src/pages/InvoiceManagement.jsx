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
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../assets/css/InvoiceManagement.css"

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    profileId: "",
    invoiceNumber: "",
    services: "",
    totalAmount: "",
    status: "pending",
  });
  const [openAddInvoice, setOpenAddInvoice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:9999/api/med/invoices", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (Array.isArray(response.data)) {
        setInvoices(response.data);
      } else {
        console.error("Unexpected data format", response.data);
        setInvoices([]);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error.response?.data || error.message);
      setErrorMessage("Failed to fetch invoices: " + (error.response?.data?.message || error.message));
      setInvoices([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddInvoice = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      // Validate form data
      if (!formData.userId.trim()) {
        setErrorMessage("Please enter a User ID.");
        setLoading(false);
        return;
      }
      if (!formData.profileId.trim()) {
        setErrorMessage("Please enter a Profile ID.");
        setLoading(false);
        return;
      }
      if (!formData.invoiceNumber.trim()) {
        setErrorMessage("Please enter an Invoice Number.");
        setLoading(false);
        return;
      }
      if (!formData.services.trim()) {
        setErrorMessage("Please enter at least one service ID.");
        setLoading(false);
        return;
      }
      if (!formData.totalAmount || isNaN(parseFloat(formData.totalAmount))) {
        setErrorMessage("Please enter a valid Total Amount.");
        setLoading(false);
        return;
      }

      // Convert services to array
      const servicesArray = formData.services
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id);

      const payload = {
        userId: formData.userId,
        profileId: formData.profileId,
        invoiceNumber: formData.invoiceNumber,
        services: servicesArray,
        totalAmount: parseFloat(formData.totalAmount),
        status: formData.status,
      };

      const response = await axios.post(
        "http://localhost:9999/api/med/invoices",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setInvoices([...invoices, response.data]);
      setFormData({
        userId: "",
        profileId: "",
        invoiceNumber: "",
        services: "",
        totalAmount: "",
        status: "pending",
      });
      setOpenAddInvoice(false);
      setSuccessMessage("Invoice added successfully!");
      fetchInvoices();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error creating invoice";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddInvoice = () => {
    setOpenAddInvoice(true);
  };

  const handleCloseAddInvoice = () => {
    setOpenAddInvoice(false);
    setFormData({
      userId: "",
      profileId: "",
      invoiceNumber: "",
      services: "",
      totalAmount: "",
      status: "pending",
    });
    setErrorMessage("");
  };

  const handleCloseMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="invoice-management" style={{ padding: "24px" }}>
      <h1>Invoice Management</h1>
      <p>Total Invoices: {invoices.length}</p>

      {/* Add Invoice Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAddInvoice}
        disabled={loading}
        sx={{ mb: 4 }}
      >
        Add Invoice
      </Button>

      {/* Add Invoice Dialog */}
      <Dialog
        open={openAddInvoice}
        onClose={handleCloseAddInvoice}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Invoice</DialogTitle>
        <DialogContent>
          {loading && (
            <div className="custom-loading-overlay" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255, 255, 255, 0.8)" }}>
              <CircularProgress />
            </div>
          )}
          <Box sx={{ display: "grid", gap: 2, mt: 2 }}>
            <TextField
              label="User ID"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              required
              fullWidth
              disabled={loading}
            />
            <TextField
              label="Profile ID"
              name="profileId"
              value={formData.profileId}
              onChange={handleInputChange}
              required
              fullWidth
              disabled={loading}
            />
            <TextField
              label="Invoice Number"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleInputChange}
              required
              fullWidth
              disabled={loading}
            />
            <TextField
              label="Services (comma-separated IDs)"
              name="services"
              value={formData.services}
              onChange={handleInputChange}
              placeholder="e.g., 68503ca37155acd1ad3905d2,68503ca37155acd1ad3905d3"
              required
              fullWidth
              disabled={loading}
            />
            <TextField
              label="Total Amount"
              name="totalAmount"
              type="number"
              value={formData.totalAmount}
              onChange={handleInputChange}
              required
              inputProps={{ step: "0.01" }}
              fullWidth
              disabled={loading}
            />
            <Select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              fullWidth
              disabled={loading}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAddInvoice}
            color="primary"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddInvoice}
            color="primary"
            disabled={loading}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table of Invoices */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Profile ID</TableCell>
              <TableCell>Services</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>No invoices found</TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.userId?.fullname || "N/A"}</TableCell>
                  <TableCell>{invoice.profileId?._id || invoice.profileId || "N/A"}</TableCell>
                  <TableCell>
                    {invoice.services && invoice.services.length > 0 ? (
                      invoice.services.map((s, index) => (
                        <div key={index}>
                          {typeof s === "object" ? s.name : s}
                        </div>
                      ))
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{new Date(invoice.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Success/Error Messages */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseMessages}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseMessages} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={handleCloseMessages}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseMessages} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InvoiceManagement;