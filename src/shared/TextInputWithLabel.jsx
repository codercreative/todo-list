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
    <>
      <label htmlFor={elementId} className={hideLabel ? 'visually-hidden' : ''}>
        {labelText}
      </label>
      <input
        type="text"
        id={elementId}
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}

export default TextInputWithLabel;
