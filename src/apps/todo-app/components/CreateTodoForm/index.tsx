import { useState } from "react"
import { useDispatch } from "react-redux"
import { setTodoContent, setTodoDateOfCreation, setTodoDateOfFinishing, setTodoId, setTodoTimeOfCreation, setTodoTimeOfFinishing, setTodoTitle } from "../../redux/slices/todoSlice/todoSlice"
import "./styles/styles.scss"
const CreateTodoForm = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState("")
    const [timeOfFinishing, setTimeOfFinishing] = useState("")
    const dispatch = useDispatch()


    const dateObj = new Date()
    const Day = dateObj.getDate()
    const Month = dateObj.getMonth() + 1
    const Year = dateObj.getFullYear()
    const formattedDate = `${Day}.${Month < 10 ? `0${Month}` : Month}.${Year}`

    const onClickCreateNewTodo = () => {
        const formattedTime = `${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes()}`
        const formattedFinishingDate = `${date.slice(8, 9)}.${date.slice(5, 7)}.${date.slice(0, 4)}`
        dispatch(setTodoTitle(title))
        dispatch(setTodoContent(content))
        dispatch(setTodoId(Math.random().toString(16).slice(2)))

        dispatch(setTodoDateOfCreation(formattedDate))
        dispatch(setTodoTimeOfCreation(formattedTime))
        dispatch(setTodoDateOfFinishing(formattedFinishingDate))
        dispatch(setTodoTimeOfFinishing(timeOfFinishing))
    }
    return (
        <form className="CreateTodoForm">
            <div className="CreateTodoForm_fields">
                <label htmlFor="todoTitle">Todo Title</label>
                <input id="todoTitle" onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Title..." />
                <label htmlFor="todoContent">Todo Content</label>
                <input id="todoContent" onChange={(e) => setContent(e.target.value)} value={content} type="text" placeholder="Content..." />
                <label htmlFor="dateOfFinishing">Date Of Finishing</label>
                <input id="dateOfFinishing" onChange={(e) => setDate(e.target.value)} type="date" />
                <label htmlFor="timeOfFinishing">Time Of Finishing</label>
                <input id="timeOfFinishing" onChange={(e) => setTimeOfFinishing(e.target.value)} value={timeOfFinishing} type="time" />
            </div>
            <div className="CreateTodoForm_steps">
                <h1>Add New Steps</h1>
                <input type="text"  placeholder="Step name..." />
                <button className="steps_button">Add Step</button>
            </div>
            <button onClick={onClickCreateNewTodo}>Set Todo</button>
        </form>
    )
}
export default CreateTodoForm