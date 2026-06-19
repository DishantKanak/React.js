import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { deleteStudent, setEditingStudent } from "../features/students/studentSlice";

function StudentCard({ student }) {
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    dispatch(setEditingStudent(student));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteStudent(student.id));
    setShowDeleteConfirm(false);
  };

  if (showDeleteConfirm) {
    return (
      <div className="student-card delete-confirm-card">
        <div className="confirm-content">
          <h3>⚠️ Confirm Delete</h3>
          <p>Are you sure you want to delete <strong>{student.name}</strong>?</p>
          <p className="confirm-hint">This action cannot be undone.</p>
          <div className="confirm-actions">
            <button
              className="confirm-delete-btn"
              onClick={confirmDelete}
            >
              Yes, Delete
            </button>
            <button
              className="confirm-cancel-btn"
              onClick={() => setShowDeleteConfirm(false)}
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-card">
      <div className="card-header">
        <h3>👤 {student.name}</h3>
        <span className="course-badge">{student.course}</span>
      </div>
      <p className="card-details"><strong>📚 Course:</strong> {student.course}</p>

      <div className="card-actions">
        <button
          className="edit-btn"
          onClick={handleEdit}
          title="Edit this student"
        >
          ✏️ Edit
        </button>
        <button
          className="delete-btn"
          onClick={handleDeleteClick}
          title="Delete this student"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;