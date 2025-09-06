import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import styled from 'styled-components';

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const todoTitleInput = useRef('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({ title: workingTodoTitle, isCompleted: false });
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        inputRef={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        labelText="Todo"
        placeholder="Add todo"
      />
      <StyledButton disabled={workingTodoTitle === ''}>
        {isSaving ? `Saving...` : `Add Todo`}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;

// ------------------------------STYLED COMPONENTS ------------------------------

const StyledForm = styled.form`
  padding: 1em;
  // border: 1px solid green;
`;

const StyledButton = styled.button`
  &:disabled {
    font-style: italic;
  }
`;
