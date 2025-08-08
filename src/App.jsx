import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './features/TodoForm.jsx';
import TodosViewForm from './features/TodosViewForm.jsx';
import TodoList from './features/TodoList/TodoList.jsx';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

const encodeUrl = ({ sortField, sortDirection, queryString }) => {
  // Airtable's query parameter re sort: sort[0][field]=title&sort[0][direction]=desc
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  let searchQuery = '';
  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }
  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');

  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };
      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );
        console.log(resp);
        if (!resp.ok) {
          // const errorData = await resp.json();
          // console.log(errorData);
          throw new Error(`Error: ${resp.status} | Failed to load todos`);
        }
        const response = await resp.json();

        const fetchedRecords = response.records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });

        setTodoList(fetchedRecords);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      console.log(resp);
      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} | Failed posting todos`);
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList((prevTodos) => [...prevTodos, savedTodo]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const completeTodo = async (todoId) => {
    const previousTodoList = [...todoList];
    const originalTodo = todoList.find((todo) => todo.id === todoId);

    const checkedTodo = {
      ...originalTodo,
      isCompleted: originalTodo.isCompleted === false,
    };
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === checkedTodo.id) {
          return checkedTodo;
        } else {
          return todo;
        }
      })
    );
    const payload = {
      records: [
        {
          id: checkedTodo.id,
          fields: {
            title: checkedTodo.title,
            isCompleted: checkedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} | Failed completing todos`);
      }
      const { records } = await resp.json();
      const completeTodo = {
        id: records[0].id,
        ...records[0].fields,
        isCompleted: records[0].fields.isCompleted === true,
      };

      if (records[0].fields.isCompleted) {
        completeTodo.isCompleted = true;
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      // const revertedTodos = todoList.map((todo) => {
      //   if (todo.id === originalTodo.id) {
      //     return previousTodos;
      //   } else {
      //     return todo;
      //   }
      // });
      //Created a const for previousTodos at the very beginning of the completeTodo helper function and falling back to the previousTodos here in case there is an error. This is a nice refactor too.
      setTodoList(previousTodoList);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    const previousTodoList = [...todoList];
    // const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} | Failed editing todos`);
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === editedTodo.id) {
            return editedTodo;
          } else {
            return todo;
          }
        })
      );
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      // const revertedTodos = todoList.map((todo) => {
      //   if (todo.id === originalTodo.id) {
      //     return originalTodo;
      //   } else {
      //     return todo;
      //   }
      // });
      // setTodoList([...revertedTodos]);
      setTodoList(previousTodoList);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
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
      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
