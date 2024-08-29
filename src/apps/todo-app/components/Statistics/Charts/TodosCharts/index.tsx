import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js/auto"
import { Bar, Pie } from "react-chartjs-2"
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import "./styles/styles.scss"
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import { useState } from "react";
const TodosCharts = () => {
    const todos = useSelector((state: RootState) => state.todoAppReducers.todos)

    const [showBar, setShowBar] = useState(true)
    const [showPie, setShowPie] = useState(false)

    const onClickShowBar = () => {
        setShowBar(true)
        setShowPie(false)
    }
    const onClickShowPie = () => {
        setShowPie(true)
        setShowBar(false)
    }
    const todoPieChartData = {
        datasets: [{
            data: [todos.length, todos.filter((todo) => todo.todoState === "Done").length, todos.filter((todo) => todo.todoState === "Active").length],
        }],
        labels: [
            'Total todos',
            'Complete todos',
            'Uncomplete todos'
        ],

    }
    const todoBarChartData = {
        labels: ["Todos data"],
        datasets: [
            {
                label: "Total todos",
                data: [todos.length, todos.filter((todo) => todo.todoState === "Done").length, todos.filter((todo) => todo.todoState === "Active").length]
            },
            {
                label: "Complete todos",
                data: [todos.filter((todo) => todo.todoState === "Done").length]
            },
            {
                label: "Uncomplete todos",
                data: [todos.filter((todo) => todo.todoState === "Active").length]
            },
        ]
    }
    return (
        <div className="TodosCharts">
            <h1>Todos Data</h1>
            <div className="TodosCharts_selectType">
                <button onClick={onClickShowBar} className="selectType_bar">Bar Chart</button>
                <button onClick={onClickShowPie} className="selectType_pie">Pie Chart</button>
            </div>
            <div className={`TodosCharts_barChart ${showBar ? "active" : ""}`}>
                <Bar data={todoBarChartData} />
            </div>
            <div className={`TodosCharts_pieChart ${showPie ? "active" : ""}`}>
                <Pie data={todoPieChartData} />
            </div>
        </div>
    )
}

export default TodosCharts