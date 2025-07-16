import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import MedicineTable from "../../components/staff/MedicineTable";
import MedicineFormModal from "../../components/staff/MedicineFormModal";
import MedicineSearchBar from "../../components/staff/MedicineSearchBar";

const EMPTY_MEDICINE = {
  name: "",
  type: "",
  group: "",
  ingredient: "",
  indication: "",
  contraindication: "",
  dosage: "",
  sideEffects: "",
  precaution: "",
  interaction: "",
  note: "",
  storage: "",
  quantity: "",
  unitPrice: "",
  expirationDate: "",
};

const axios = axiosInstance;

const MedicineManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMedicine, setEditMedicine] = useState(null);

  const fetchMedicines = async () => {
    const res = await axios.get("/api/staff/medicinesall");
     console.log("DATA FROM API:", res.data.medicines);
    setMedicines(res.data.medicines || []);
  };

  useEffect(() => { fetchMedicines(); }, []);

  console.log("Medicines in render:", medicines);

  const handleAdd = () => {
    setEditMedicine(null);
    setShowModal(true);
  };
  const handleEdit = (medicine) => {
    setEditMedicine(medicine);
    setShowModal(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xoá thuốc này?")) {
      await axios.delete(`/api/staff/medicines/${id}`);
      fetchMedicines();
    }
  };
  const handleSubmit = async (form) => {
    if (editMedicine) {
      await axios.put(`/api/staff/medicines/${editMedicine._id}`, form);
    } else {
      await axios.post(`/api/staff/medicines`, form);
    }
    setShowModal(false);
    fetchMedicines();
  };

  const filtered = medicines.filter(m =>
    m.name && m.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("Filtered:", filtered);

  return (
    <div className="container py-4">
      <h2>Quản lý danh mục thuốc</h2>
      <MedicineSearchBar search={search} setSearch={setSearch} onAdd={handleAdd} />
      <MedicineTable
        medicines={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <MedicineFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSubmit}
        editMedicine={editMedicine}
        emptyMedicine={EMPTY_MEDICINE}
      />
    </div>
  );
};

export default MedicineManagement;
