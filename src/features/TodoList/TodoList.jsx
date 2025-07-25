import { useEffect } from 'react';
import TodoListItem from './TodoListItem.jsx';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo) => todo.isCompleted !== true);

  isLoading && <p>Todo list is loading... </p>;

  if (todoList.length === 0) {
    return <p>Add todo above to get started</p>;
  }

  return (
    <ul>
      {filteredTodoList.map((todo) => {
        return (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onCompleteTodo={onCompleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        );
      })}
    </ul>
  );
}

export default TodoList;
