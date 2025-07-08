function TodoForm() {
  return (
    <form>
      <label htmlFor="todoTitle" aria-label="enter todo">
        Todo
      </label>
      <input id="todoTitle" type="text" />
      <button>Add Todo</button>
    </form>
  );
}

export default TodoForm;
