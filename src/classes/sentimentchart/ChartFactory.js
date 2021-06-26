import React from 'react';
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

        this.chartMap.set(ChartTypes.BAR.string, <BarChart handleChartChange={handleChartChange} />);
        this.chartMap.set(ChartTypes.COLUMN.string, <ColumnChart handleChartChange={handleChartChange} />);
        this.chartMap.set("default", <BaseChart handleChartChange={handleChartChange} />);
        this.chartMap.set(ChartTypes.LINE.string, <LineChart handleChartChange={handleChartChange} />);
        this.chartMap.set(ChartTypes.PIE.string, <PieChart handleChartChange={handleChartChange} />);
        // this.chartMap.set(ChartTypes.Table, new Table());
    }

    getChart = (chartOptions, handleChartChange) => {

        return React.cloneElement(this.chartMap.get("default"), chartOptions = {chartOptions});
    }
}