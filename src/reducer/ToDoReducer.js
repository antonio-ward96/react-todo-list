export default function ToDoReducer(currentTodos, action) {
    switch (action.type) {
      case 'ADD_TODO': {
        const newTask = {
          id: Date.now(),
          title: action.payload.title,
          details: action.payload.details,
          isCompleted: false,
        };
        const updatedTodos = [...currentTodos, newTask];
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      }
  
      case 'UPDATE_TODO': {
        const updatedTodos = currentTodos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title, details: action.payload.details }
            : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      }
  
      case 'DELETE_TODO': {
        const updatedTodos = currentTodos.filter(todo => todo.id !== action.payload.id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      }
  
      case 'GET_TODOS': {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        return storageTodos;
      }
  
      case 'TOGGLE_TODO': {
        const updatedTodos = currentTodos.map((t) => {
          if (t.id === action.payload.id) {
            return { ...t, isCompleted: !t.isCompleted };
          }
          return t;
        });
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      }
  
      default: {
        throw new Error("Unknown Action " + action.type);
      }
    }
  }
  