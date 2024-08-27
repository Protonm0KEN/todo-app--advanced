import { combineReducers } from "redux";
import todoSlice from "./slices/todoSlice/todoSlice";
import todosSlice from "./slices/todosSlice/todosSlice";
import todoGroupSlice from "./slices/todoGroupSlice/todoGroupSlice";
import todoGroupsSlice from "./slices/todoGroupsSlice/todoGroupsSlice";

export const todoAppReducers = combineReducers({
    todo: todoSlice,
    todos: todosSlice,

    todoGroup: todoGroupSlice,
    todoGroups: todoGroupsSlice
})