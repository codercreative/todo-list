function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  function preventRefresh(e) {
    e.preventDefault();
  }

  function clearSearchInputField() {
    return setQueryString('');
  }

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label htmlFor="search">Search todos:</label>
        <input
          id="search"
          type="text"
          value={queryString}
          onChange={(e) => {
            setQueryString(e.target.value);
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
