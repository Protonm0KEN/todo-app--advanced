import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { Link } from "react-router-dom"
import { useState } from "react"
import { todoGroupI } from "../../types/todoGroupTypes/todoGroupTypes"
import { setTodoGroupData } from "../../redux/slices/todoGroupSlice/todoGroupSlice"
import { addTodoGroupToTodoGroups, showCertainTodoGroup } from "../../redux/slices/todoGroupsSlice/todoGroupsSlice"
import "./styles/styles.scss"
const TodoGroupsBar = () => {
    const dispatch = useDispatch()
    const todoGroups = useSelector((state: RootState) => state.todoAppReducers.todoGroups)
    const [newTodoGroupName, setNewTodoGroupName] = useState("")
    const onClickCreateNewTodoGroup = () => {
        if (newTodoGroupName.length > 0) {
            const matchedTodoGroup = todoGroups.find((todoGroup) => todoGroup.todoGroupName === newTodoGroupName)
            if (matchedTodoGroup) {
                alert('you already havesuch todo group')
                setNewTodoGroupName("")
            } else {
                const newTodoGroup: todoGroupI = {
                    todoGroupName: newTodoGroupName,
                    todoGroupId: Math.random().toString(16).slice(2),
                    todoGroupIsShown: false,
                    todoGroupTodos: []
                }
                dispatch(setTodoGroupData(newTodoGroup))
                dispatch(addTodoGroupToTodoGroups(newTodoGroup))
                setNewTodoGroupName("")
            }
        } else {
            alert("You haven't written any group name")
        }
    }
    const onClickShowTodoGroup = (todoGroup: todoGroupI) => {
        dispatch(showCertainTodoGroup(todoGroup))
    }
    return (
        <div className='TodoGroupsBar'>
            <nav className='TodoGroupsBar_nav'>
                <Link className="nav_link" to={""}>All Todos</Link>
                {todoGroups.map((todoGroup) => {
                    return (
                        <Link onClick={() => onClickShowTodoGroup(todoGroup)} className="nav_link" key={todoGroup.todoGroupId} to={todoGroup.todoGroupName}>{todoGroup.todoGroupName}</Link>
                    )
                })}
            </nav>
            <form onSubmit={(e) => e.preventDefault()} className="TodoGroupsBar_form">
                <input onChange={(e) => setNewTodoGroupName(e.target.value)} value={newTodoGroupName} type="text" placeholder="New todo group name..." />
                <button onClick={onClickCreateNewTodoGroup} className="TodoGroupsBar_createNewTodoGroupButton">Create new todo group +</button>
            </form>
        </div>
    )
}

export default TodoGroupsBar