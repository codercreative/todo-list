export const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button
  clearError: 'clearError',
};

//   States from App.jsx:
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

export const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos:
      return {
        ...state,
        todoList: action.records.map((record) => ({
          id: record.id,
          ...record.fields,
          isCompleted: record.fields.isCompleted
            ? record.fields.isCompleted
            : false,
        })),
        isLoading: false,
      };
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    //Had to have help with this one:
    // Update todoList when a new todo is added
    // 1. Keep all existing todos by spreading state.todoList. This is important for immutability: we create a new array instead of modifying the existing one.
    //    React relies on creating new objects/arrays to detect state changes and update the UI correctly.
    // 2. Add the new todos from action.records. Each record is converted into a todo object with:
    //    - id from record.id
    //    - other fields from record.fields
    //    - isCompleted, which is false if missing
    // 3. Both spreads go inside one array because todoList can only be a single property.

    case actions.addTodo:
      return {
        ...state,
        todoList: [
          // Note: state.todoList is dynamic representing the current, up-to-date state
          ...state.todoList,
          ...action.records.map((record) => ({
            id: record.id,
            ...record.fields,
            isCompleted: record.fields.isCompleted
              ? record.fields.isCompleted
              : false,
          })),
        ],
        isSaving: false,
      };

    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    //Had to have help with this one:
    case actions.updateTodo: {
      const updatedState = {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.editedTodo.id ? action.editedTodo : todo
        ),
      };

      if (action.error) {
        updatedState.errorMessage = action.error.message;
      }
      return updatedState;
    }
    case actions.completeTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, ...action.toggledTodo } : todo
        ),
      };
    case actions.revertTodo: {
      const updatedState = {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.revertedTodo.id ? action.revertedTodo : todo
        ),
      };

      if (action.error) {
        updatedState.errorMessage = action.error.message;
      }
      return updatedState;
    }
    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return state;
  }
}
