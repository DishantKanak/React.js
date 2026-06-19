import React from 'react'
import StudentForm from "./features/students/StudentForm";
import StudentList from "./features/students/StudentList";

function App() {
  return (
    <div className="app-container">
      <h1>📚 Student Management System</h1>

      <StudentForm />
      <StudentList />
    </div>
  );
}

export default App;
