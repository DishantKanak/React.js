import { createSlice } from "@reduxjs/toolkit";

const loadStudentsFromStorage = () => {
  try {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  } catch (error) {
    console.error("Failed to load students from localStorage:", error);
    return [];
  }
};

const initialState = {
  students: loadStudentsFromStorage(),
  editingStudent: null,
  searchTerm: "",
  sortBy: "name", 
  sortOrder: "asc", 
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
      localStorage.setItem("students", JSON.stringify(state.students));
    },

    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
      localStorage.setItem("students", JSON.stringify(state.students));
    },

    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
      state.editingStudent = null;
      localStorage.setItem("students", JSON.stringify(state.students));
    },

    setEditingStudent: (state, action) => {
      state.editingStudent = action.payload;
    },

    clearEditingStudent: (state) => {
      state.editingStudent = null;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },

    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },

    resetStudents: (state) => {
      state.students = [];
      state.editingStudent = null;
      state.searchTerm = "";
      localStorage.setItem("students", JSON.stringify([]));
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  updateStudent,
  setEditingStudent,
  clearEditingStudent,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  toggleSortOrder,
  resetStudents,
} = studentSlice.actions;

export default studentSlice.reducer;