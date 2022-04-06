const initState = {
  todos: [],
  currentTodo: "",
};

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.isComplete);
    case "completed":
      return todos.filter((t) => t.isComplete);
    default:
      return todos;
  }
};

export const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case "TODO_ADD":
      return {
        ...state,
        currentTodo: "",
        todos: state.todos.concat(action.payload),
      };
    case "TODOS_LOAD":
      return { ...state, todos: action.payload };
    case "CURRENT_UPDATE":
      return { ...state, currentTodo: action.payload };
    case "TODO_REPLACE":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "TODO_REMOVE":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
};
