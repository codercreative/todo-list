import { useState, useEffect } from 'react';

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    console.log('localQueryString: ', localQueryString);
    const debounce = setTimeout(() => {
      console.log('updating queryString');
      setQueryString(localQueryString);
    }, 500);

    return () => {
      console.log('cleaning up');
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  function preventRefresh(e) {
    e.preventDefault();
  }

  function clearSearchInputField() {
    return setLocalQueryString('');
  }

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label htmlFor="search">Search todos:</label>
        <input
          id="search"
          type="text"
          value={localQueryString}
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
        />
        <button type="button" onClick={clearSearchInputField}>
          Clear
        </button>
      </div>
      <div>
        <label>
          Sort by:
          <select
            name="sort"
            id=""
            value={sortField}
            onChange={(event) => setSortField(event.target.value)}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </select>
        </label>
        <label>
          Direction:
          <select
            name="direction"
            id=""
            value={sortDirection}
            onChange={(event) => setSortDirection(event.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </form>
  );
}

export default TodosViewForm;
