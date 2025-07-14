import { useState } from 'react';
import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  const todoTitleInput = useRef('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle" aria-label="enter todo">
        Todo
      </label>
      <input
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        ref={todoTitleInput}
        name="title"
        id="todoTitle"
        type="text"
      />
      <button disabled={workingTodoTitle === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
