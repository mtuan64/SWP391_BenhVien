import React from "react";
import { Button } from "react-bootstrap";

const MedicineTable = ({ medicines, onEdit, onDelete }) => (
  <div className="table-responsive">
    <table className="table table-bordered table-hover align-middle">
      <thead>
        <tr>
          <th>Tên thuốc</th>
          <th>Loại</th>
          <th>Hoạt chất</th>
          <th>Nhóm thuốc</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Hạn dùng</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {medicines.map(med => (
          <tr key={med._id}>
            <td>{med.name ?? ""}</td>
            <td>{med.type ?? ""}</td>
            <td>{med.ingredient ?? ""}</td>
            <td>{med.group ?? ""}</td>
            <td>{med.unitPrice?.toLocaleString() ?? ""}</td>
            <td>{med.quantity ?? ""}</td>
            <td>{med.expirationDate ? new Date(med.expirationDate).toLocaleDateString("vi-VN") : ""}</td>
            <td>
              <Button variant="primary" size="sm" onClick={() => onEdit(med)}>Sửa</Button>{" "}
              <Button variant="danger" size="sm" onClick={() => onDelete(med._id)}>Xoá</Button>
            </td>
          </tr>
        ))}
        {!medicines.length && <tr><td colSpan={8} className="text-center">Không có thuốc nào</td></tr>}
      </tbody>
    </table>
  </div>
);

export default MedicineTable;
