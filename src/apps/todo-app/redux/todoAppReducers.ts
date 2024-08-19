import { combineReducers } from "redux";
import todoSlice from "./slices/todoSlice/todoSlice";
import todosSlice from "./slices/todosSlice/todosSlice";

export const todoAppReducers = combineReducers({
    todo: todoSlice,
    todos: todosSlice
})