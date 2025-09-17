import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import TodoListItem from './TodoListItem.jsx';
import TodoListStyles from './TodoList.module.css';
import { useSearchParams } from 'react-router';

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

  // If todos are still loading from airtable
  if (isLoading && queryString === '') {
    return <p>Todo list is loading... </p>;
  }

  // If there are no todos at all
  if (todoList.length === 0) {
    return <p>Add todo above to get started</p>;
  }

  // For pagination ===============
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(matchingTodos.length / itemsPerPage);

  function handlePreviousPage() {
    if (currentPage === 1) return;
    setSearchParams({ page: currentPage - 1 });
  }

  function handleNextPage() {
    if (currentPage === totalPages) return;
    setSearchParams({ page: currentPage + 1 });
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);
  // end of pagination code ===============

  return (
    <>
      {!isLoading && (
        <>
          <ul className={TodoListStyles.unordered}>
            {matchingTodos
              .slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage)
              .map((todo) => {
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
          <div className={TodoListStyles.paginationControls}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span className={TodoListStyles.spanOfPageCount}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default TodoList;
