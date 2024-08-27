import { todoI } from "../todoTypes/todoTypes"

export interface todoGroupI {
    todoGroupName: string
    todoGroupId: string
    todoGroupIsShown: boolean
    todoGroupTodos: todoI[]
}