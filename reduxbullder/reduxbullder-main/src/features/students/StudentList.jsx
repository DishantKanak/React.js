import React, { useMemo } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, setSortBy, setSortOrder, resetStudents } from "./studentSlice";
import StudentCard from "../../components/StudentCard";

function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const searchTerm = useSelector((state) => state.students.searchTerm);
  const sortBy = useSelector((state) => state.students.sortBy);
  const sortOrder = useSelector((state) => state.students.sortOrder);

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(search) ||
          student.course.toLowerCase().includes(search)
      );
    }

    result.sort((a, b) => {
      let compareA, compareB;

      if (sortBy === "name") {
        compareA = a.name.toLowerCase();
        compareB = b.name.toLowerCase();
      } else {
        compareA = a.course.toLowerCase();
        compareB = b.course.toLowerCase();
      }

      if (compareA < compareB) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (compareA > compareB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [students, searchTerm, sortBy, sortOrder]);

  const uniqueCourses = new Set(students.map((s) => s.course)).size;

  const stats = {
    total: students.length,
    displayed: filteredAndSortedStudents.length,
    courses: uniqueCourses,
  };

  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to delete all students? This cannot be undone.")) {
      dispatch(resetStudents());
    }
  };

  return (
    <div className="student-list">
      <div className="list-header">
        <div className="list-title">
          <h2>📋 Students List</h2>
          <div className="stats">
            <span className="stat-item">📊 Total: <strong>{stats.total}</strong></span>
            <span className="stat-item">📚 Courses: <strong>{stats.courses}</strong></span>
          </div>
        </div>
      </div>

      {students.length > 0 && (
        <div className="list-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search by name or course..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => dispatch(setSearchTerm(""))}
              >
                ✕
              </button>
            )}
          </div>

          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="course">Sort by Course</option>
            </select>

            <button
              className={`sort-order-btn ${sortOrder}`}
              onClick={() => dispatch(setSortBy(sortBy))}
              title={`Currently sorting ${sortOrder === "asc" ? "ascending" : "descending"}`}
            >
              {sortOrder === "asc" ? "🔼" : "🔽"}
            </button>

            {students.length > 0 && (
              <button
                className="reset-all-btn"
                onClick={handleResetAll}
                title="Delete all students"
              >
                🗑️ Reset All
              </button>
            )}
          </div>
        </div>
      )}

      {students.length === 0 ? (
        <div className="empty-message">
          📭 No students added yet. Create your first student using the form above!
        </div>
      ) : filteredAndSortedStudents.length === 0 ? (
        <div className="empty-message">
          🔍 No students found matching "{searchTerm}". Try a different search!
        </div>
      ) : (
        <div className="students-container">
          <div className="results-info">
            Showing {filteredAndSortedStudents.length} of {stats.total} student{stats.total !== 1 ? "s" : ""}
          </div>
          {filteredAndSortedStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;