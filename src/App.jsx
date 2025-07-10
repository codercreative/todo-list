import { useState } from 'react';
import './App.css';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    // using Date.now() to create a separate and distinct key for all the todos
    const newTodo = { id: Date.now(), title: title };
    // using state to list all the previous items and any new items
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
