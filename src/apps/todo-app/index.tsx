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
  const todoGroups = useSelector((state: RootState) => state.todoAppReducers.todoGroups)
  return (
    <>
      <div className="TodoApp">
        <TodoGroupsBar />
        <button onClick={() => setIsCreateTodoFormOpen(!isCreateTodoFormOpen)}>
          <Link to={isCreateTodoFormOpen ? "" : "create-todo-form"}>Открыть</Link>
        </button>
        <Routes>
          {todoGroups.map((todoGroup) => {
            if (todoGroup.todoGroupIsShown === true) {
              return <Route key={todoGroup.todoGroupId} path={todoGroup.todoGroupName} element={
                <>
                  {todoGroup.todoGroupTodos.map((todo) => {
                    return (<TodoCard key={todo.todoId} {...todo} />)
                  })}
                </>
              } />
            }
          })}
          <Route path={""} element=
            {
              <>
                {todos.map((todo) => {
                  return <TodoCard key={todo.todoId} {...todo} />
                })}
              </>

            } />
          <Route path="create-todo-form" element={<CreateTodoForm />} />
        </Routes>
      </div>
    </>
  )
}
export default TodoApp