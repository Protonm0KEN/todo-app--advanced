import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { todoI, todoStates } from "../../../types/todoTypes/todoTypes";

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

    todoGroupName: ""
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodoData: (state, action: PayloadAction<todoI>) => {
            state.todoTitle = action.payload.todoTitle
            state.todoContent = action.payload.todoContent
            state.todoId = action.payload.todoId
            state.todoDateOfCreation = action.payload.todoDateOfCreation
            state.todoDateOfFinishing = action.payload.todoDateOfFinishing
            state.todoState = action.payload.todoState
            state.todoSteps = action.payload.todoSteps
            state.todoTimeOfCreation = action.payload.todoTimeOfCreation
            state.todoTimeOfFinishing = action.payload.todoTimeOfFinishing
            state.todoGroupName = action.payload.todoGroupName
        }
    }
})

export const { 
    setTodoData
 } = todoSlice.actions
export default todoSlice.reducer