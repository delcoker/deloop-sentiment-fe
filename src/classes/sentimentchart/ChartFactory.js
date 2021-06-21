import {ChartTypes} from "./enums/ChartTypes";
import BarChart from "./conceretecharts/BarChart";
import ColumnChart from "./conceretecharts/ColumnChart";
import LineChart from "./conceretecharts/LineChart";
import PieChart from "./conceretecharts/PieChart";
import BaseChart from "./conceretecharts/BaseChart";

export default class ChartFactory {

    chartOption = null;
    handleChartChange = null;
    chartMap = new Map();

    constructor(handleChartChange) {
        // console.log(handleChartChange);
        // this.chartMap.set(ChartTypes.BAR.string, <BarChart handleChartChange={handleChartChange}/>);
        // this.chartMap.set(ChartTypes.COLUMN.string, <ColumnChart />);
        // this.chartMap.set("default", <ColumnChart />);
        // this.chartMap.set(ChartTypes.LINE.string, <LineChart />);
        // this.chartMap.set(ChartTypes.PIE.string, <PieChart />);
        // this.chartMap.set(ChartTypes.Table, new Table());
    }

    getChart = (chartOptions, handleChartChange) => {
        // return <BaseChart chartOptions={chartOptions} handleChartChange={handleChartChange} />
        // console.log(chartType, '----', this.chartMap.has(chartType));
        // this.chartOption = chartOptions;

        // if (!this.chartMap.has(chartType)) {
        //     console.log("༼ つ ◕_◕ ༽つ");
        //     return <BarChart chartOptions={chartOptions} handleChartChange={handleChartChange} />
        // }
        // if (chartType === ChartTypes.LINE.string) {
        //     return <LineChart chartOptions={chartOptions} handleChartChange={handleChartChange} />
        // }
        // if (chartType === "default") {
        return <BaseChart chartOptions={chartOptions} handleChartChange={handleChartChange} />
        // }
        // if (chartType === ChartTypes.COLUMN.string) {
        //     return <ColumnChart chartOptions={chartOptions} handleChartChange={handleChartChange} />
        // }
        // if (chartType === ChartTypes.PIE.string) {
        //     return <PieChart chartOptions={chartOptions} handleChartChange={handleChartChange} />
        // }


        // const a = this.chartMap.get(chartType);
        // console.log("chart is: " , a)
        // // const b = <BarChart chartOptions={chartOptions} />
        // // console.log(a);
        // // console.log(b);
        // return a;
    }
}