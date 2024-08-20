import { useDispatch } from "react-redux"
import { deleteTodoFromTodos, updateTodoInTodos } from "../../redux/slices/todosSlice/todosSlice"
import { todoI } from "../../types/todoTypes/todoTypes"
import "./styles/styles.scss"
import { FC, useState } from "react"
const TodoCard: FC<todoI> = (todo) => {
    const [newTitle, setNewTitle] = useState(todo.todoTitle)
    const [newContent, setNewContent] = useState(todo.todoContent)
    const dispatch = useDispatch()
    const [isEditting, setIsEdditing] = useState(false)
    const deleteStep = (stepId: string) => {
        dispatch(updateTodoInTodos({
            ...todo,
            todoSteps: todo.todoSteps.filter((todoStep) => todoStep.todoStepId !== stepId)
        }))
    }
    const completeStep = (stepId: string) => {
        let clonedStepsArray = structuredClone(todo.todoSteps)
        clonedStepsArray.forEach((todoStep) => {
            if (todoStep.todoStepId === stepId) {
                todoStep.todoStepIsDone = true
            }
        })
        dispatch(updateTodoInTodos({
            ...todo,
            todoSteps: clonedStepsArray
        }))
    }
    const completeTodo = () => {
        dispatch(updateTodoInTodos({
            ...todo,
            todoState: "Done"
        }))
    }
    const defferTodo = () => {
        dispatch(updateTodoInTodos({
            ...todo,
            todoState: "Deffered"
        }))
    }
    const deleteTodo = () => {
        dispatch(deleteTodoFromTodos(todo.todoId))
    }
    const onClickSetIsEdditing = () => {
        setIsEdditing(!isEditting)
    }
    const onClickSaveChangesInTodo = () => {
        dispatch(updateTodoInTodos({
            ...todo,
            todoTitle: newTitle,
            todoContent: newContent
        }))
        setIsEdditing(!isEditting)
    }
    const onClickCancelToChangeTodo = () => {
        setNewContent(todo.todoContent)
        setNewTitle(todo.todoTitle)
        setIsEdditing(!isEditting)
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
                    <input onChange={(e) => setNewTitle(e.target.value)} value={newTitle} type="text" />
                    :
                    <p className="TodoCard_title">{todo.todoTitle}</p>
                }
            </div>
            <div className="TodoCard_body">
                {isEditting
                    ?
                    <input onChange={(e) => setNewContent(e.target.value)} value={newContent} type="text" />
                    :
                    <p className="TodoCard_content">
                        {todo.todoContent}
                    </p>
                }
                {todo.todoSteps
                    ?

                    <ul className="TodoCard_steps">
                        Шаги:
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
                        <div className="">
                            <button onClick={onClickSaveChangesInTodo}>Сохранить изменения</button>
                            <button onClick={onClickCancelToChangeTodo}>Отменить изменения</button>
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