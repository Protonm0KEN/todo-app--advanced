import { useState } from "react"
import "./styles/styles.scss"
import { Link, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import TodoCard from "./components/TodoCard"
import CreateTodoForm from "./components/CreateTodoForm"
import TodoGroupsBar from "./components/TodoGroupsBar"
const TodoApp = () => {
  const [isCreateTodoFormOpen, setIsCreateTodoFormOpen] = useState(false)
  const todos = useSelector((state: RootState) => state.todoAppReducers.todos)
  return (
    <>
      <div className="TodoApp">
        <TodoGroupsBar />
        <button onClick={() => setIsCreateTodoFormOpen(!isCreateTodoFormOpen)}>
          <Link to={isCreateTodoFormOpen ? "" : "create-todo-form"}>Открыть</Link>
        </button>
        Задачи:
        {todos.map((todo) => {
          return (
            <TodoCard key={todo.todoId} {...todo} />
          )
        })}
        <Routes>
          <Route path="create-todo-form" element={<CreateTodoForm />} />
        </Routes>
      </div>
    </>
  )
}
export default TodoApp