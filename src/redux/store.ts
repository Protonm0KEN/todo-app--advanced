import { configureStore } from '@reduxjs/toolkit'
import { todoAppReducers } from '../apps/todo-app/redux/todoAppReducers'

export const store = configureStore({
    reducer: {
        todoAppReducers
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch