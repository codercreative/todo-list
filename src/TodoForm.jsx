import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');

  function handleAddTodo(event) {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = '';
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle" aria-label="enter todo">
        Todo
      </label>
      <input ref={todoTitleInput} name="title" id="todoTitle" type="text" />
      <button>Add Todo</button>
    </form>
  );
}

export default TodoForm;
