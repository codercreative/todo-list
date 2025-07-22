function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  hideLabel,
}) {
  return (
    <>
      <label
        htmlFor={elementId}
        className={hideLabel ? 'visually-hidden' : undefined}
      >
        {labelText}
      </label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
