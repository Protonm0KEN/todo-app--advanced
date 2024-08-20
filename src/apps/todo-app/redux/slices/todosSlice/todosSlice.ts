import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoI } from "../../../types/todoTypes/todoTypes";

const initialState: todoI[] = []

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodoToTodos: (state, action: PayloadAction<todoI>) => {
            state.push(action.payload)
        },
        updateTodoInTodos: (state, action: PayloadAction<todoI>) => {
            const todoToChange = state.find((todo) => todo.todoId === action.payload.todoId)
            if (todoToChange) {
                const indexOfTodoToChange = state.indexOf(todoToChange)
                state[indexOfTodoToChange] = action.payload
            }
        },
        deleteTodoFromTodos: (state, action: PayloadAction<string>) => {
            return state.filter((todo) => todo.todoId !== action.payload)
        }
    }

})
export const { addTodoToTodos, updateTodoInTodos, deleteTodoFromTodos } = todosSlice.actions
export default todosSlice.reducer