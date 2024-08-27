import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoGroupI } from "../../../types/todoGroupTypes/todoGroupTypes";

const initialState: todoGroupI = {
    todoGroupName: "",
    todoGroupId: "",
    todoGroupIsShown: false,
    todoGroupTodos: []
}

const todoGroupSlice = createSlice({
    name: "todoGroup",
    initialState,
    reducers: {
        setTodoGroupData: (state, action: PayloadAction<todoGroupI>) => {
            state.todoGroupName = action.payload.todoGroupName
            state.todoGroupId = action.payload.todoGroupId
            state.todoGroupIsShown = action.payload.todoGroupIsShown
            state.todoGroupTodos = action.payload.todoGroupTodos
        }
    }
})
export const { setTodoGroupData } = todoGroupSlice.actions
export default todoGroupSlice.reducer