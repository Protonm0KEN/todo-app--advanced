import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { todoI, todoStates } from "../../../types/todoTypes/todoTypes";
import { todoStepI } from "../../../types/todoStepTypes/todoStepStypes";

const initialState: todoI = {
    todoTitle: "",
    todoContent: "",
    todoId: Math.random().toString(16).slice(2),
    todoState: todoStates.Active,
    todoSteps: [],

    todoDateOfCreation: "",
    todoDateOfFinishing: "",
    todoTimeOfCreation: "",
    todoTimeOfFinishing: "",
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodoTitle: (state, action: PayloadAction<string>) => {
            state.todoTitle = action.payload
        },
        setTodoContent: (state, action: PayloadAction<string>) => {
            state.todoContent = action.payload
        },
        setTodoId: (state, action: PayloadAction<string>) => {
            state.todoId = action.payload
        },
        setTodoState: (state, action: PayloadAction<string>) => {
            state.todoState = action.payload
        },
        setTodoSteps: (state, action: PayloadAction<todoStepI>) => {
            state.todoSteps.push(action.payload)
        },

        setTodoTimeOfCreation: (state, action: PayloadAction<string>) => {
            state.todoTimeOfCreation = action.payload
        },
        setTodoTimeOfFinishing: (state, action: PayloadAction<string>) => {
            state.todoTimeOfFinishing = action.payload
        },
        setTodoDateOfCreation: (state, action: PayloadAction<string>) => {
            state.todoDateOfCreation = action.payload
        },
        setTodoDateOfFinishing: (state, action: PayloadAction<string>) => {
            state.todoDateOfFinishing = action.payload
        }
    }
})

export const { 
    setTodoTitle,
    setTodoContent,
    setTodoId,
    setTodoState,
    setTodoSteps,
    setTodoTimeOfCreation,
    setTodoTimeOfFinishing,
    setTodoDateOfCreation,
    setTodoDateOfFinishing
 } = todoSlice.actions
export default todoSlice.reducer