import { combineReducers } from "redux";
import todoSlice from "./slices/todoSlice/todoSlice";

export const todoAppReducers = combineReducers({
    todo: todoSlice
})