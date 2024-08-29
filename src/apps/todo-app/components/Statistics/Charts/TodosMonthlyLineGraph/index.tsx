import { Line } from "react-chartjs-2"
import "./styles/styles.scss"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../../redux/store"
const TodosMonthlyLineGraph = () => {
    const currentYear = new Date().getFullYear()
    const months = [
        {
            numberOfMonth: "01",
            month: "January"
        },
        {
            numberOfMonth: "02",
            month: "February"
        },
        {
            numberOfMonth: "03",
            month: "March"
        },
        {
            numberOfMonth: "04",
            month: "April"
        },
        {
            numberOfMonth: "05",
            month: "May"
        },
        {
            numberOfMonth: "06",
            month: "June"
        },
        {
            numberOfMonth: "07",
            month: "July"
        },
        {
            numberOfMonth: "08",
            month: "August"
        },
        {
            numberOfMonth: "09",
            month: "September"
        },
        {
            numberOfMonth: "10",
            month: "October"
        },
        {
            numberOfMonth: "11",
            month: "November"
        },
        {
            numberOfMonth: "12",
            month: "December"
        },
    ]
    const todos = useSelector((state: RootState) => state.todoAppReducers.todos)
    const TodosMonthlyLineGraphData = {
        labels: [...months.map((month) => month.month)],
        datasets: [
            {
                label: "All Todos",
                data: [
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "01").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "02").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "03").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "04").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "05").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "06").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "07").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "08").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "09").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "10").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "11").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "12").length,
                ]
            },
            {
                label: "Complete Todos",
                data: [
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "01" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "02" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "03" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "04" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "05" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "06" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "07" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "08" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "09" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "10" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "11" && todo.todoState === "Done").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "12" && todo.todoState === "Done").length,
                ]
            },
            {
                label: "Uncomplete Todos",
                data: [
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "01" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "02" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "03" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "04" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "05" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "06" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "07" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "08" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "09" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "10" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "11" && todo.todoState === "Active").length,
                    todos.filter((todo) => todo.todoDateOfCreation.slice(3, 5) === "12" && todo.todoState === "Active").length,
                ]
            },
        ],
        hoverBackgroundColor: "aqua"
    }
    return (
        <div className="TodosMonthlyLineGraph">
            <h1>Todos Monthly Graph. Year:  {currentYear}</h1>
            <Line options={{fill: true,}} data={TodosMonthlyLineGraphData} />
        </div>
    )
}

export default TodosMonthlyLineGraph