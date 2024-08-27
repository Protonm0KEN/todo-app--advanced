import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoGroupI } from "../../../types/todoGroupTypes/todoGroupTypes";

const initialState: todoGroupI[] = [
    {
        todoGroupName: "Group 1",
        todoGroupId: Math.random().toString(16).slice(2),
        todoGroupIsShown: false,
        todoGroupTodos: []
    },
    {
        todoGroupName: "Group 2",
        todoGroupId: Math.random().toString(16).slice(2),
        todoGroupIsShown: false,
        todoGroupTodos: []
    },
    {
        todoGroupName: "Group 3",
        todoGroupId: Math.random().toString(16).slice(2),
        todoGroupIsShown: false,
        todoGroupTodos: []
    },
]



const todoGroupsSlice = createSlice({
    name: "todoGroups",
    initialState,
    reducers: {
        addTodoGroupToTodoGroups: (state, action: PayloadAction<todoGroupI>) => {
            state.push(action.payload)
        },
        deleteTodoGroupFromTodoGroups: (state, action: PayloadAction<{ todoGroupId: string }>) => {
            return state.filter((todoGroup) => todoGroup.todoGroupId !== action.payload.todoGroupId)
        },
        updateTodoGroupInTodoGroups: (state, action: PayloadAction<todoGroupI>) => {
            const todoGroupToChange = state.find((todoGroup) => todoGroup.todoGroupId === action.payload.todoGroupId)
            if (todoGroupToChange) {
                const indexOfTodoGroupToChange = state.indexOf(todoGroupToChange)
                state[indexOfTodoGroupToChange] = action.payload
            }
        },
        showCertainTodoGroup: (state, action: PayloadAction<todoGroupI>) => {
            state.forEach((todoGroup) => {
                if (todoGroup.todoGroupId === action.payload.todoGroupId) {
                    todoGroup.todoGroupIsShown = true
                } else {
                    todoGroup.todoGroupIsShown = false
                }
            })
        }
    }
})
export const {
    addTodoGroupToTodoGroups,
    deleteTodoGroupFromTodoGroups,
    updateTodoGroupInTodoGroups,
    showCertainTodoGroup
} = todoGroupsSlice.actions
export default todoGroupsSlice.reducer