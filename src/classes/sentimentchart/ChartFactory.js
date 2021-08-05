import React from 'react';
import {ChartTypes} from "./enums/ChartTypes";
import BarChart from "./conceretecharts/BarChart";
import ColumnChart from "./conceretecharts/ColumnChart";
import LineChart from "./conceretecharts/LineChart";
import PieChart from "./conceretecharts/PieChart";
import BaseChart from "./conceretecharts/BaseChart";

export default class ChartFactory {

    chartMap = new Map();

    constructor() {

        this.chartMap.set(ChartTypes.BAR.string, <BarChart />);
        this.chartMap.set(ChartTypes.COLUMN.string, <ColumnChart />);
        this.chartMap.set("default", <BaseChart />);
        this.chartMap.set(ChartTypes.LINE.string, <LineChart />);
        this.chartMap.set(ChartTypes.PIE.string, <PieChart />);
        // this.chartMap.set(ChartTypes.Table, new Table());
    }

    getChartsRow1 = (chartOptions, handleChartChange, handlePropertyChange) => {
        // console.log('chartOptionssssssssssssssssssssss', chartOptions)
        // return <BaseChart chartOptions={chartOptions} handleChartChange={handleChartChange}
        //                   handlePropertyChange={handlePropertyChange} />

        return React.cloneElement(this.chartMap.get("default"), {
            chartOptions,
            handleChartChange,
            handlePropertyChange
        });
    }

    getChartsRow2 = (chartOptions, handleChartChange, handlePropertyChange) => {
        return React.cloneElement(this.chartMap.get("default"), {
            chartOptions,
            handleChartChange,
            handlePropertyChange
        });
    }
}