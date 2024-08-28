import { useDispatch, useSelector } from "react-redux"
import { deleteTodoFromTodos, updateTodoInTodos } from "../../redux/slices/todosSlice/todosSlice"
import { todoI } from "../../types/todoTypes/todoTypes"
import "./styles/styles.scss"
import { FC, useState } from "react"
import { RootState } from "../../../../redux/store"
import { updateTodoGroupInTodoGroups } from "../../redux/slices/todoGroupsSlice/todoGroupsSlice"
const TodoCard: FC<todoI> = (todo) => {
    const [newTitle, setNewTitle] = useState(todo.todoTitle)
    const [newContent, setNewContent] = useState(todo.todoContent)
    const [newStepName, setNewStepName] = useState("")
    const dispatch = useDispatch()
    const [isEditting, setIsEdditing] = useState(false)

    const todoGroups = useSelector((state: RootState) => state.todoAppReducers.todoGroups)
    const thisTodoGroup = todoGroups.find((todoGroup) => todoGroup.todoGroupName === todo.todoGroupName)

    const deleteStep = (stepId: string) => {
        dispatch(updateTodoInTodos({
            ...todo,
            todoSteps: todo.todoSteps.filter((todoStep) => todoStep.todoStepId !== stepId)
        }))
        if (todo.todoGroupName && thisTodoGroup) {
            const thisTodoGroupTodos = structuredClone(thisTodoGroup.todoGroupTodos)
            thisTodoGroupTodos.forEach((thisTodo) => {
                if (thisTodo.todoId === todo.todoId) {
                    thisTodo.todoSteps = todo.todoSteps.filter((todoStep) => todoStep.todoStepId !== stepId)
                }
            })
            dispatch(updateTodoGroupInTodoGroups({
                ...thisTodoGroup,
                todoGroupTodos: thisTodoGroupTodos
            }))
        }
    }
    const completeStep = (stepId: string) => {
        const clonedStepsArray = structuredClone(todo.todoSteps)
        clonedStepsArray.forEach((todoStep) => {
            if (todoStep.todoStepId === stepId) {
                todoStep.todoStepIsDone = true
            }
        })
        dispatch(updateTodoInTodos({
            ...todo,
            todoSteps: clonedStepsArray
        }))
        if (todo.todoGroupName && thisTodoGroup) {
            const thisTodoGroupTodos = structuredClone(thisTodoGroup.todoGroupTodos)
            thisTodoGroupTodos.forEach((thisTodo) => {
                if (thisTodo.todoId === todo.todoId) {
                    thisTodo.todoSteps = clonedStepsArray
                }
            })
            dispatch(updateTodoGroupInTodoGroups({
                ...thisTodoGroup,
                todoGroupTodos: thisTodoGroupTodos
            }))
        }
    }
    const completeTodo = () => {
        dispatch(updateTodoInTodos({
            ...todo,
            todoState: "Done"
        }))
        if (todo.todoGroupName && thisTodoGroup) {
            const thisTodoGroupTodos = structuredClone(thisTodoGroup.todoGroupTodos)
            thisTodoGroupTodos.forEach((thisTodo) => {
                if (thisTodo.todoId === todo.todoId) {
                    thisTodo.todoState = "Done"
                }
            })
            dispatch(updateTodoGroupInTodoGroups({
                ...thisTodoGroup,
                todoGroupTodos: thisTodoGroupTodos
            }))
        }
    }
    const deleteTodo = () => {
        dispatch(deleteTodoFromTodos(todo.todoId))
        if (todo.todoGroupName && thisTodoGroup) {
            const thisTodoGroupTodos = structuredClone(thisTodoGroup.todoGroupTodos)
            dispatch(updateTodoGroupInTodoGroups({
                ...thisTodoGroup,
                todoGroupTodos: thisTodoGroupTodos.filter((thisTodo) => thisTodo.todoId !== todo.todoId)
            }))
        }
    }
    const onClickSetIsEdditing = () => {
        setIsEdditing(!isEditting)
    }
    const onClickSaveChangesInTodo = () => {
        if (newTitle.length !== 0 && newContent.length !== 0) {
            dispatch(updateTodoInTodos({
                ...todo,
                todoTitle: newTitle,
                todoContent: newContent
            }))
            if (todo.todoGroupName && thisTodoGroup) {
                const thisTodoGroupTodos = structuredClone(thisTodoGroup.todoGroupTodos)
                thisTodoGroupTodos.forEach((thisTodo) => {
                    if (thisTodo.todoId === todo.todoId) {
                        thisTodo.todoTitle = newTitle
                        thisTodo.todoContent = newContent
                    }
                })
                dispatch(updateTodoGroupInTodoGroups({
                    ...thisTodoGroup,
                    todoGroupTodos: thisTodoGroupTodos
                }))
            }
            setIsEdditing(!isEditting)
        } else {
            setIsEdditing(!isEditting)
        }

    }
    const onClickCancelToChangeTodo = () => {
        setNewContent(todo.todoContent)
        setNewTitle(todo.todoTitle)
        setIsEdditing(!isEditting)
    }
    const onClickAddNewStep = () => {
        dispatch(updateTodoInTodos({
            ...todo,
            todoSteps: [...todo.todoSteps, {
                todoStepName: newStepName,
                todoStepId: Math.random().toString(16).slice(2),
                todoStepIsDone: false
            }]
        }))
        if (todo.todoGroupName && thisTodoGroup) {
            const thisTodoGroupTodos = structuredClone(thisTodoGroup.todoGroupTodos)
            thisTodoGroupTodos.forEach((thisTodo) => {
                if (thisTodo.todoId === todo.todoId) {
                    thisTodo.todoSteps = [...todo.todoSteps, {
                        todoStepName: newStepName,
                        todoStepId: Math.random().toString(16).slice(2),
                        todoStepIsDone: false
                    }]
                }
            })
            dispatch(updateTodoGroupInTodoGroups({
                ...thisTodoGroup,
                todoGroupTodos: thisTodoGroupTodos
            }))
        }

        setNewStepName("")
    }
    return (
        <div className="TodoCard">
            <div className="TodoCard_top">
                <div className="TodoCard_state">
                    <div className={`state_bar ${todo.todoState === "Active" ? "active" : todo.todoState === "Deffered" ? "deffered" : "done"}`}></div>
                    <div className="state_text">{todo.todoState === "Active" ? "Active" : todo.todoState === "Deffered" ? "Deffered" : "Done"}</div>
                </div>
                {isEditting
                    ?
                    <input className="TodoCard_editTitleInput" onChange={(e) => setNewTitle(e.target.value)} value={newTitle} type="text" />
                    :
                    <p className="TodoCard_title">{todo.todoTitle}</p>
                }
            </div>
            <div className="TodoCard_body">
                {isEditting
                    ?
                    <input className="TodoCard_editContentInput" onChange={(e) => setNewContent(e.target.value)} value={newContent} type="text" />
                    :
                    <p className="TodoCard_content">
                        {todo.todoContent}
                    </p>
                }
                {todo.todoSteps.length > 0
                    ?

                    <ul className="TodoCard_steps">
                        Шаги:
                        {
                            isEditting
                                ?
                                <div className="TodoCard_addNewSteps">
                                    <input className="addNewSteps_input" value={newStepName} onChange={(e) => setNewStepName(e.target.value)} placeholder="New Step Name" type="text" />
                                    <button className="addNewSteps_button" onClick={onClickAddNewStep}>Add New Step</button>
                                </div>
                                : null
                        }
                        {todo.todoSteps.map((todoStep) => {
                            return (
                                <li key={todoStep.todoStepId} className="step">
                                    <p className="step_title">{todoStep.todoStepName}</p>
                                    <div className="step_buttons">
                                        {todoStep.todoStepIsDone
                                            ? <p className="step_doneText">Выполнено</p>
                                            : <button onClick={() => completeStep(todoStep.todoStepId)} className="step_complete-btn">Выполнить</button>
                                        }
                                        <button onClick={() => deleteStep(todoStep.todoStepId)} className="step_delete-btn">Удалить</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    : null
                }
            </div>
            <p>Группа: {todo.todoGroupName}</p>
            <div className="TodoCard_bottom">
                <div className="TodoCard_time">
                    <div className="TodoCard_dates">
                        <p className="TodoCard_dateOfCreation">Дата Создания: {todo.todoDateOfCreation}</p>
                        <p className="TodoCard_dateOfFinishing">Дата Завершения: {todo.todoDateOfFinishing}</p>
                    </div>
                    <div className="TodoCard_times">
                        <p className="TodoCard_timeOfCreation">Время Создания: {todo.todoTimeOfCreation}</p>
                        <p className="TodoCard_timeOfFinishing">Время Завершения: {todo.todoTimeOfFinishing}</p>
                    </div>
                </div>
                <div className="TodoCard_buttons">
                    {isEditting
                        ?
                        <div className="changesButtons">
                            <button className="TodoCard_saveChangesButton" onClick={onClickSaveChangesInTodo}>Сохранить изменения</button>
                            <button className="TodoCard_cancelChangesButton" onClick={onClickCancelToChangeTodo}>Отменить изменения</button>
                        </div>
                        :
                        <>
                            {
                                todo.todoState === "Active"
                                    ? <button onClick={completeTodo} className="TodoCard_completeTodo-btn">Завершить Задачу</button>
                                    : null
                            }
                            < button onClick={onClickSetIsEdditing} className="TodoCard_editTodo-btn">Редактировать Задачу</button>
                            <button onClick={deleteTodo} className="TodoCard_deleteTodo-btn">Удалить Задачу</button>
                        </>
                    }
                </div>
            </div>
        </div >
    )
}

export default TodoCard