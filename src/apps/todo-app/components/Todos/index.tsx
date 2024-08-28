import { todoI } from "../../types/todoTypes/todoTypes"
import TodoCard from "../TodoCard"
import "./styles/styles.scss"
const Todos = ({ todos }: { todos: todoI[] }) => {
    return (
        <div className="Todos">
            {todos.map((todo) => {
                return (
                    <TodoCard key={todo.todoId} {...todo}/>
                )
            })}
        </div>
    )
}

export default Todos