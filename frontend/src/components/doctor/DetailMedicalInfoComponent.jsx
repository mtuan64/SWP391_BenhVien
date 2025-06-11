import React, { useState } from 'react';

const DetailMedicalInfoComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState('');

  const handleAdd = () => {
    if (newIssue.trim() !== '') {
      setIssues([...issues, newIssue]);
      setNewIssue('');
      setShowForm(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Medical Issues List</h5>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add'}
          </button>
        </div>

        {showForm && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new issue"
              value={newIssue}
              onChange={(e) => setNewIssue(e.target.value)}
            />
            <button className="btn btn-success mt-2" onClick={handleAdd}>
              Save
            </button>
          </div>
        )}

        <ul className="list-group">
          {issues.map((issue, index) => (
            <li key={index} className="list-group-item">
              {issue}
            </li>
          ))}
        </ul>
      </div>
      <div className='card-body'>
          bảng đơn thuốc
      </div>
    </div>
  );
};

export default DetailMedicalInfoComponent;
