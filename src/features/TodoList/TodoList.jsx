import TodoListItem from './TodoListItem.jsx';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const pendingTodos = todoList.filter((todo) => todo.isCompleted !== true);
  const completedTodos = todoList.filter((todo) => todo.isCompleted === true);

  const renderCheckedAndUncheckedTodos = (todosToRender) => {
    return todosToRender.map((todo) => {
      return (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      );
    });
  };

  if (todoList.length === 0) {
    return <p>Add todo above to get started</p>;
  }

  return (
    <>
      {isLoading && <p>Todo list is loading... </p>}
      {!isLoading && (
        <ul>
          {/* keeping this comment so I can see what it looked like before */}
          {/* {filteredTodoList.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            );
          })} */}
          {renderCheckedAndUncheckedTodos(pendingTodos)}
          {renderCheckedAndUncheckedTodos(completedTodos)}
        </ul>
      )}
    </>
  );
}

export default TodoList;
