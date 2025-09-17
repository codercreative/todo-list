import TodoForm from './features/TodoForm.jsx';
import TodosViewForm from './features/TodosViewForm.jsx';
import TodoList from './features/TodoList/TodoList.jsx';
import AppStyles from './App.module.css';
import { actions as todoActions } from './reducers/todos.reducer.js';

function TodosPage({
  todoState,
  addTodo,
  completeTodo,
  updateTodo,
  queryString,
  setQueryString,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  dispatch,
}) {
  return (
    <>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />
      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        //using reducer state for loading instead of local useState
        isLoading={todoState.isLoading}
        queryString={queryString}
      />
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      {todoState.errorMessage && (
        <div className={AppStyles.errorMessage}>
          <hr />
          <p>{todoState.errorMessage}</p>
          {/* <button onClick={() => setErrorMessage('')}>Dismiss</button> */}
          <button onClick={() => dispatch({ type: todoActions.clearError })}>
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}

export default TodosPage;
