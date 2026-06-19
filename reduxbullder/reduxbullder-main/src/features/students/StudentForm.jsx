import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent, clearEditingStudent } from "./studentSlice";

function StudentForm() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const dispatch = useDispatch();
  const editingStudent = useSelector((state) => state.students.editingStudent);

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setCourse(editingStudent.course);
      setErrors({});
    } else {
      setName("");
      setCourse("");
      setErrors({});
    }
  }, [editingStudent]);

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Student name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (name.trim().length > 50) {
      newErrors.name = "Name must not exceed 50 characters";
    }

    if (!course.trim()) {
      newErrors.course = "Course is required";
    } else if (course.trim().length < 2) {
      newErrors.course = "Course must be at least 2 characters";
    } else if (course.trim().length > 50) {
      newErrors.course = "Course must not exceed 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingStudent) {
      dispatch(
        updateStudent({
          id: editingStudent.id,
          name: name.trim(),
          course: course.trim(),
        })
      );
    } else {
      dispatch(
        addStudent({
          id: Date.now(),
          name: name.trim(),
          course: course.trim(),
        })
      );
    }

    setName("");
    setCourse("");
    setErrors({});
    setSubmitSuccess(true);
  };

  const handleCancel = () => {
    dispatch(clearEditingStudent());
    setName("");
    setCourse("");
    setErrors({});
  };

  // Clear error when user starts typing
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors({ ...errors, name: "" });
    }
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
    if (errors.course) {
      setErrors({ ...errors, course: "" });
    }
  };

  const isFormValid = name.trim().length > 0 && course.trim().length > 0;

  return (
    <>
      {submitSuccess && (
        <div className="success-message">
          ✅ {editingStudent ? "Student updated" : "Student added"} successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-title">
          {editingStudent ? "✏️ Edit Student" : "➕ Add New Student"}
        </div>

        <div className="form-group">
          <label htmlFor="studentName">Student Name *</label>
          <input
            id="studentName"
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={handleNameChange}
            className={errors.name ? "input-error" : ""}
            autoFocus
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="courseName">Course *</label>
          <input
            id="courseName"
            type="text"
            placeholder="Enter course name"
            value={course}
            onChange={handleCourseChange}
            className={errors.course ? "input-error" : ""}
          />
          {errors.course && <div className="error-message">{errors.course}</div>}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={!isFormValid}>
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
          {editingStudent && (
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default StudentForm;