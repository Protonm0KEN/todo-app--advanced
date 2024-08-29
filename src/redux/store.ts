import { configureStore } from '@reduxjs/toolkit'
import { todoAppReducers } from '../apps/todo-app/redux/todoAppReducers'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from "redux-persist"
import {combineReducers} from "@reduxjs/toolkit"
const persistConfig = {
    key: "root",
    version: 1,
    storage
}
const reducer = combineReducers({
    todoAppReducers
})
const persistedReucer = persistReducer(persistConfig, reducer)
export const store = configureStore({
    reducer: persistedReucer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch