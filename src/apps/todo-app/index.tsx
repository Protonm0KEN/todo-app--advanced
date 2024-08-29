import { useState } from "react"
import "./styles/styles.scss"
import { Link, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import CreateTodoForm from "./components/CreateTodoForm"
import TodoGroupsBar from "./components/TodoGroupsBar"
import Todos from "./components/Todos"
import TodoLinksBar from "./components/TodoLinksBar"
import Calendar from "./components/Calendar"
import Statistics from "./components/Statistics"
const TodoApp = () => {
  const [isCreateTodoFormOpen, setIsCreateTodoFormOpen] = useState(false)
  const todos = useSelector((state: RootState) => state.todoAppReducers.todos)
  const todoGroups = useSelector((state: RootState) => state.todoAppReducers.todoGroups)
  return (
    <>
      <div className="TodoApp">
        <TodoLinksBar />
        <div className="TodoApp_body">
          <Routes>
            {todoGroups.map((todoGroup) => {
              if (todoGroup.todoGroupIsShown === true) {
                return <Route key={todoGroup.todoGroupId} path={todoGroup.todoGroupName} element={
                  <>
                    <TodoGroupsBar />
                    <button className="TodoApp_createTodoBtn" onClick={() => setIsCreateTodoFormOpen(!isCreateTodoFormOpen)}>
                      <Link to={isCreateTodoFormOpen ? "" : "create-todo-form"}>Создать новую задачу + </Link>
                    </button>
                    <div className="body_todos">
                      <Todos todos={todoGroup.todoGroupTodos} />
                    </div>
                  </>
                } />
              }
            })}
            <Route path={""} element=
              {
                <>
                  <TodoGroupsBar />
                  <button className="TodoApp_createTodoBtn" onClick={() => setIsCreateTodoFormOpen(!isCreateTodoFormOpen)}>
                    <Link to={isCreateTodoFormOpen ? "" : "/todo-app/create-todo-form"}>Создать новую задачу + </Link>
                  </button>
                  <div className="body_todos">
                    <Todos todos={todos} />
                  </div>
                </>

              } />
            <Route path={"calendar"} element={<Calendar />} />
            <Route path={"statistics"} element={<Statistics />} />
          </Routes>
        </div>
        <CreateTodoForm isCreateTodoFormOpen={isCreateTodoFormOpen} setIsCreateTodoFormOpen={setIsCreateTodoFormOpen} />
      </div>
    </>
  )
}
export default TodoApp