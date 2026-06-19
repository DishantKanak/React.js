import { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, push, set, onValue, remove, update } from "firebase/database";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const studentsRef = ref(db, "students");
    const unsubscribe = onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setStudents(list);
      } else {
        setStudents([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rollNo || !name || !email || !course) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const studentRef = ref(db, `students/${editId}`);
      update(studentRef, { rollNo, name, email, course })
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          alert("Error updating student: " + error.message);
        });
    } else {
      const studentsRef = ref(db, "students");
      const newStudentRef = push(studentsRef);
      set(newStudentRef, { rollNo, name, email, course })
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          alert("Error adding student: " + error.message);
        });
    }
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setRollNo(student.rollNo);
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      const studentRef = ref(db, `students/${id}`);
      remove(studentRef).catch((error) => {
        alert("Error deleting student: " + error.message);
      });
    }
  };

  const resetForm = () => {
    setEditId(null);
    setRollNo("");
    setName("");
    setEmail("");
    setCourse("");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Student Database</h1>
        <p>Manage student profiles and records in real-time</p>
      </header>

      <main className="content">
        <section className="form-section">
          <h2>{editId ? "Edit Student Details" : "Register New Student"}</h2>
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label htmlFor="rollNo">Roll Number</label>
              <input
                id="rollNo"
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course">Course</label>
              <input
                id="course"
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editId ? "Update Student" : "Add Student"}
              </button>
              {editId && (
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="table-section">
          <h2>Student Records</h2>
          <div className="table-wrapper">
            {students.length === 0 ? (
              <p className="no-data">No students registered yet.</p>
            ) : (
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.course}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEdit(student)}
                            className="btn-action edit-btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="btn-action delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
