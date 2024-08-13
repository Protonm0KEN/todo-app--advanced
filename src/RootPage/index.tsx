import { Route, Routes } from "react-router-dom"
import "./styles/styles.scss"
import TodoApp from "../apps/todo-app"
const RootPage = () => {
  return (
    <>
      <Routes>
        <Route path="/todo-app/" element = {<TodoApp/>}/>
      </Routes>
    </>
  )
}
export default RootPage