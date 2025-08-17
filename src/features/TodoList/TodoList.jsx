import TodoListItem from './TodoListItem.jsx';

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  isLoading,
  queryString,
}) {
  const todosToRender = todoList;

  if (isLoading && queryString === '') {
    return <p>Todo list is loading... </p>;
  }

  if (todoList.length === 0) {
    return <p>Add todo above to get started</p>;
  }

  return (
    <>
      {!isLoading && (
        <ul>
          {todosToRender.map((todo) => {
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
