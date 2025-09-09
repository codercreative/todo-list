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

function reducer(state = initialState, action) {
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
            isCompleted: record.fields.isCompleted ? true : false,
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
    case actions.updateTodo:
      return {
        ...state,
      };
    case actions.completeTodo:
      return {
        ...state,
      };
    case actions.revertTodo:
      return {
        ...state,
      };
    case actions.clearError:
      return {
        ...state,
      };
    default:
      return state;
  }
}
