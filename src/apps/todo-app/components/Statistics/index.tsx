import TodoGroupsCharts from "./Charts/TodoGroupsCharts"
import TodosCharts from "./Charts/TodosCharts"
import TodosMonthlyLineGraph from "./Charts/TodosMonthlyLineGraph"
import "./styles/styles.scss"
const Statistics = () => {
    // const todoGroups = useSelector((state: RootState) => state.todoAppReducers.todoGroups)
    return (
        <div className="Statistics">
            <div className="Statistics_charts">
                <div className="charts_groupOfData">
                    <TodosCharts />
                    <TodoGroupsCharts />
                </div>
                <div className="charts_groupOfData">
                    <TodosMonthlyLineGraph />
                </div>
            </div>
        </div>
    )
}

export default Statistics