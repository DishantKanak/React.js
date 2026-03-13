import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  const addTodo = () => {
    if (!text.trim()) return
    setTodos([...todos, { id: Date.now(), text, done: false }])
    setText('')
  }

  const toggleDone = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleDone(todo.id)}>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
