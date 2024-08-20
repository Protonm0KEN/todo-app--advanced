import { useState } from "react"
import { useDispatch } from "react-redux"
import { setTodoData } from "../../redux/slices/todoSlice/todoSlice"
import "./styles/styles.scss"
import { addTodoToTodos } from "../../redux/slices/todosSlice/todosSlice"
import { todoStepI } from "../../types/todoStepTypes/todoStepStypes"
const CreateTodoForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState("")
    const [timeOfFinishing, setTimeOfFinishing] = useState("")
    const [steps, setSteps] = useState<todoStepI[]>([])
    const [stepName, setStepName] = useState("")
    //date
    const clearCreateTodoForm = () => {
        setTitle("")
        setContent("")
        setDate("")
        setTimeOfFinishing("")
        setSteps([])
        dispatch(setTodoData({
            todoTitle: "",
            todoContent: "",
            todoId: Math.random().toString(16).slice(2),
            todoDateOfCreation: "",
            todoDateOfFinishing: "",
            todoTimeOfCreation: "",
            todoTimeOfFinishing: "",
            todoState: "",
            todoSteps: []
        }))
    }
    const onClickCreateNewTodo = () => {
        const dateObj = new Date()
        const Day = dateObj.getDate()
        const Month = dateObj.getMonth() + 1
        const Year = dateObj.getFullYear()
        const formattedDate = `${Day}.${Month < 10 ? `0${Month}` : Month}.${Year}`
        const formattedTime = `${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes()}`
        const formattedFinishingDate = `${date.slice(8, 9)}.${date.slice(5, 7)}.${date.slice(0, 4)}`

        // Setting data of new todo
        const newTodo = {
            todoTitle: title,
            todoContent: content,
            todoId: Math.random().toString(16).slice(2),
            todoDateOfCreation: formattedDate,
            todoDateOfFinishing: formattedFinishingDate,
            todoTimeOfCreation: formattedTime,
            todoTimeOfFinishing: timeOfFinishing,
            todoState: "Active",
            todoSteps: steps
        }
        dispatch(setTodoData(newTodo))
        dispatch(addTodoToTodos(newTodo))
        clearCreateTodoForm()
    }
    const onClickAddNewStep = () => {
        setSteps([...steps, {
            todoStepName: stepName,
            todoStepId: Math.random().toString(16).slice(2),
            todoStepIsDone: false
        }])
        setStepName("")
    }
    return (
        <form onSubmit={(e) => e.preventDefault()} className="CreateTodoForm">
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
                <input onChange={(e) => setStepName(e.target.value)} value={stepName} type="text" placeholder="Step name..." />
                <button onClick={onClickAddNewStep} className="steps_button">Add Step</button>
                {steps.map((step) => {
                    return (
                        <p key={step.todoStepId}>{step.todoStepName}</p>
                    )
                })}
            </div>
            <button onClick={onClickCreateNewTodo}>Create Todo</button>
        </form>
    )
}
export default CreateTodoForm