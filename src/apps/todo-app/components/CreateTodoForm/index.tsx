import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTodoData } from "../../redux/slices/todoSlice/todoSlice"
import "./styles/styles.scss"
import { addTodoToTodos } from "../../redux/slices/todosSlice/todosSlice"
import { todoStepI } from "../../types/todoStepTypes/todoStepStypes"
import { RootState } from "../../../../redux/store"
import { updateTodoGroupInTodoGroups } from "../../redux/slices/todoGroupsSlice/todoGroupsSlice"
import { Link } from "react-router-dom"
const CreateTodoForm = ({ isCreateTodoFormOpen, setIsCreateTodoFormOpen }) => {
    const dispatch = useDispatch()
    const todoGroups = useSelector((state: RootState) => state.todoAppReducers.todoGroups)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState("")
    const [timeOfFinishing, setTimeOfFinishing] = useState("")
    const [steps, setSteps] = useState<todoStepI[]>([])
    const [stepName, setStepName] = useState("")
    const [todoGroupName, setTodoGroupName] = useState(todoGroups[0].todoGroupName)
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
            todoSteps: [],
            todoGroupName: ""
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
        if (title.length === 0) {
            alert("You haven't written the title of the todo")
        }
        else if (content.length === 0) {
            alert("You haven't written the content of the todo")
        }
        else {
            const newTodo = {
                todoTitle: title,
                todoContent: content,
                todoId: Math.random().toString(16).slice(2),
                todoDateOfCreation: formattedDate,
                todoDateOfFinishing: formattedFinishingDate,
                todoTimeOfCreation: formattedTime,
                todoTimeOfFinishing: timeOfFinishing,
                todoState: "Active",
                todoSteps: steps,
                todoGroupName
            }
            const todoGroup = todoGroups.find((todoGroup) => todoGroup.todoGroupName === newTodo.todoGroupName)
            dispatch(setTodoData(newTodo))
            dispatch(addTodoToTodos(newTodo))
            if (todoGroup) {
                dispatch(updateTodoGroupInTodoGroups({
                    todoGroupName,
                    todoGroupId: todoGroup?.todoGroupId,
                    todoGroupIsShown: false,
                    todoGroupTodos: [...todoGroup.todoGroupTodos, newTodo]
                }))
            }
            clearCreateTodoForm()
            setIsCreateTodoFormOpen(!isCreateTodoFormOpen)
        }
    }
    const onClickAddNewStep = () => {
        if (stepName.length === 0) {
            alert("You haven't written any thing for this step")
        } else {
            setSteps([...steps, {
                todoStepName: stepName,
                todoStepId: Math.random().toString(16).slice(2),
                todoStepIsDone: false
            }])
            setStepName("")
        }
    }
    return (
        <form onSubmit={(e) => e.preventDefault()} className={`${isCreateTodoFormOpen ? `CreateTodoForm_layout active` : `CreateTodoForm_layout`}`}>
            <div className="CreateTodoForm">
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
                {
                    todoGroups.length > 0
                        ? <div className="CreateTodoForm_todoGroup">
                            <h1>Select todo group</h1>
                            <select onChange={(e) => setTodoGroupName(e.target.value)} name="selectTodoGroup" id="selectTodoGroup">
                                {todoGroups.map((todoGroup) => {
                                    return (
                                        <option key={todoGroup.todoGroupId} value={todoGroup.todoGroupName}>{todoGroup.todoGroupName}</option>
                                    )
                                })}
                            </select>
                            <button onClick={() => setTodoGroupName("")} className="noGroupSelectButton">Select no group and add todo to common list of all todos</button>
                        </div> : null
                }
                <Link className="CreateTodoForm_createTodoButton" to="/todo-app/" onClick={onClickCreateNewTodo}>Create Todo</Link>
            </div>
        </form>
    )
}
export default CreateTodoForm