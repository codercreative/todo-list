import { useState } from 'react';
import './App.css';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';

function App() {
  const [newTodo, setNewTodo] = useState("Today's list:");
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm />
      <p> {newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;
