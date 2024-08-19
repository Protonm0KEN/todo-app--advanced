import { useState } from "react"
import "./styles/styles.scss"
import { Link, Route, Routes } from "react-router-dom"
import CreateTodoForm from "./components/CreateTodoForm"
const TodoApp = () => {
  const [isCreateTodoFormOpen, setIsCreateTodoFormOpen] = useState(false)
  return (
    <>
      <div className="TodoApp">
        <button onClick={() => setIsCreateTodoFormOpen(!isCreateTodoFormOpen)}>
          <Link to={isCreateTodoFormOpen ? "" : "create-todo-form"}>Открыть</Link>
        </button>
        <Routes>
          <Route path="create-todo-form" element={<CreateTodoForm/>} />
        </Routes>
      </div>
    </>
  )
}
export default TodoApp