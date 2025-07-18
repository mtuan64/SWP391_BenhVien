import React from "react";
import { Button } from "react-bootstrap";

const MedicineSearchBar = ({ search, setSearch, onAdd }) => (
  <div className="d-flex mb-3 align-items-center">
    <input
      className="form-control me-2"
      placeholder="Tìm kiếm tên thuốc..."
      value={search ?? ""}
      onChange={e => setSearch(e.target.value)}
      style={{ maxWidth: 320 }}
    />
    <Button onClick={onAdd} variant="success">Thêm thuốc</Button>
  </div>
);

export default MedicineSearchBar;
