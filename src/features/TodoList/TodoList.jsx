import TodoListItem from './TodoListItem.jsx';
import TodoListStyles from './TodoList.module.css';

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  isLoading,
  queryString,
}) {
  // Using the filter method to filter todos based on user's query
  const matchingTodos = todoList.filter((todo) =>
    todo.title.toLowerCase().includes(queryString.toLowerCase())
  );

  // If user's query doesn't match any of the todos
  if (matchingTodos.length === 0 && queryString !== '')
    return <p>The todo is not listed...Try again </p>;

  // If there are no todos at all
  if (todoList.length === 0) {
    return <p>Add todo above to get started</p>;
  }

  // If todos are still loading from airtable
  if (isLoading && queryString === '') {
    return <p>Todo list is loading... </p>;
  }

  return (
    <>
      {!isLoading && (
        <ul className={TodoListStyles.unordered}>
          {todoList.map((todo) => {
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
      )}
    </>
  );
}

export default TodoList;
