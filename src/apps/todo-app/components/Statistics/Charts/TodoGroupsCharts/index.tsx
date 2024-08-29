import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js/auto"
import { Bar, Doughnut } from "react-chartjs-2"
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
const TodoGroupsCharts = () => {
  const todoGroups = useSelector((state: RootState) => state.todoAppReducers.todoGroups)
  const [showBar, setShowBar] = useState(true)
  const [showPie, setShowPie] = useState(false)
  const BarData = {
    labels: [...todoGroups.map((todoGroup) => todoGroup.todoGroupName)],
    datasets: [
      {
        label: "Todos",
        data: [...todoGroups.map((todoGroup) => todoGroup.todoGroupTodos.length)]
      },
      {
        label: "Completed Todos",
        data: [...todoGroups.map((todoGroup) => {
          let countOfCompletedTodos = 0
          todoGroup.todoGroupTodos.map((todo) => {
            if (todo.todoState === "Done") {
              countOfCompletedTodos += 1
            }
          })
          return countOfCompletedTodos
        })]
      },
      {
        label: "Uncompleted Todos",
        data: [...todoGroups.map((todoGroup) => {
          let countOfUncompletedTodos = 0
          todoGroup.todoGroupTodos.map((todo) => {
            if (todo.todoState === "Active") {
              countOfUncompletedTodos += 1
            }
          })
          return countOfUncompletedTodos
        })]
      }
    ]
  }
  const DougnutData_Todos = {
    labels: [...todoGroups.map((todoGroup) => todoGroup.todoGroupName)],
    datasets: [
      {
        label: "Todos",
        data: [...todoGroups.map((todoGroup) => todoGroup.todoGroupTodos.length)]
      }
    ]
  }
  const DougnutData_CompleteTodos = {
    labels: [...todoGroups.map((todoGroup) => todoGroup.todoGroupName)],
    datasets: [
      {
        label: "Complete",
        data: [...todoGroups.map((todoGroup) => {
          let countOfCompletedTodos = 0
          todoGroup.todoGroupTodos.map((todo) => {
            if (todo.todoState === "Done") {
              countOfCompletedTodos += 1
            }
          })
          return countOfCompletedTodos
        })]
      }
    ]
  }
  const DougnutData_UncompleteTodos = {
    labels: [...todoGroups.map((todoGroup) => todoGroup.todoGroupName)],
    datasets: [
      {
        label: "Unomplete",
        data: [...todoGroups.map((todoGroup) => {
          let countOfUncompletedTodos = 0
          todoGroup.todoGroupTodos.map((todo) => {
            if (todo.todoState === "Active") {
              countOfUncompletedTodos += 1
            }
          })
          return countOfUncompletedTodos
        })]
      }
    ]
  }
  const onClickShowBar = () => {
    setShowBar(true)
    setShowPie(false)
  }
  const onClickShowPie = () => {
    setShowPie(true)
    setShowBar(false)
  }
  return (
    <div className="TodoGroupsChart">
      <h1>Todo Groups Data</h1>
      <div className="TodoGroupsChart_selectType">
        <button onClick={onClickShowBar} className="selectType_bar">Bar Chart</button>
        <button onClick={onClickShowPie} className="selectType_pie">Pie Chart</button>
      </div>
      <div className={`TodoGroupsChart_barChart ${showBar ? "active" : ""}`}>
        <Bar options={{
          responsive: true
        }} data={BarData} />
      </div>
      <div className={`TodoGroupsChart_doughnutChart ${showPie ? "active" : ""}`}>
        <div className="TodoGroupsChart_pieChart">
          <p className="chart_title">All todos</p>
          <Doughnut data={DougnutData_Todos} />
        </div>
        <div className="TodoGroupsChart_pieChart">
          <p className="chart_title">Complete todos</p>
          <Doughnut data={DougnutData_CompleteTodos} />
        </div>
        <div className="TodoGroupsChart_pieChart">
          <p className="chart_title">Uncomplete todos</p>
          <Doughnut data={DougnutData_UncompleteTodos} />
        </div>
      </div>
    </div>
  )
}

export default TodoGroupsCharts