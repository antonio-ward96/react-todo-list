import { createContext, useContext, useReducer } from "react";
import ToDoReducer from "../reducer/ToDoReducer";

export const ToDosContext= createContext([]);
export const DispatchContext = createContext(() => {});

export const ToDosProvider = ({ children }) => {
  const [toDos, dispatch] = useReducer(ToDoReducer, []);

  return (
    <ToDosContext.Provider value={toDos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </ToDosContext.Provider>
  );
}
export const useToDos = () => {
    return useContext(ToDosContext);
}
export const useDispatch = () => {
    return useContext(DispatchContext);
}
export default ToDosProvider;