import { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    <StyledForm onSubmit={preventRefresh}>
      <div>
        <label htmlFor="search">Search todos:</label>
        <StyledInput
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
          <StyledSelect
            name="sort"
            id=""
            value={sortField}
            onChange={(event) => setSortField(event.target.value)}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </StyledSelect>
        </label>
        <label>
          Direction:
          <StyledSelect
            name="direction"
            id=""
            value={sortDirection}
            onChange={(event) => setSortDirection(event.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </StyledSelect>
        </label>
      </div>
    </StyledForm>
  );
}

export default TodosViewForm;

// ------------------------------STYLED COMPONENTS ------------------------------

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  // border: 1px solid blue;
`;

const StyledInput = styled.input`
  margin: 0 0.5em;
  border: none;
  padding: 0.5em;
  border-radius: 10px;
`;

const StyledSelect = styled.select`
  font-family: inherit;
  padding: 0.5em;
  margin: 0.5em;
  border: none;
  border-radius: 10px;
`;
