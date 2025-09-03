import styled from 'styled-components';

// Note: Using "Custom Ref Prop Pattern" instead of forwardRef for easier readability
function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  inputRef,
  value,
  hideLabel,
  placeholder,
}) {
  return (
    <StyledInputWrapper>
      <label htmlFor={elementId} className={hideLabel ? 'visually-hidden' : ''}>
        {labelText}
      </label>
      <StyledInput
        type="text"
        id={elementId}
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </StyledInputWrapper>
  );
}

export default TextInputWithLabel;

// ------------------------------STYLED COMPONENTS ------------------------------
const StyledInputWrapper = styled.div`
  display: inline;
  // border: 1px solid orange;
`;

const StyledInput = styled.input`
  font-family: inherit;
  margin: 0.5em;
  border: none;
  border-radius: 10px;
  padding: 0.5em;
`;
