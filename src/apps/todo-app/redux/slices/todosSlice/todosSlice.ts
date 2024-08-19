import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoI } from "../../../types/todoTypes/todoTypes";

const initialState: todoI[] = []

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers:{
        addTodoToTodos: (state, action: PayloadAction<todoI>) => {
            state.push(action.payload)
        }
    }

})
export const {addTodoToTodos} = todosSlice.actions
export default todosSlice.reducer