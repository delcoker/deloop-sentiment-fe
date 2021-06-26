import React, {Component} from 'react';
import ChartFactory from "../classes/sentimentchart/ChartFactory";
import {ChartsContext} from "../contexts/context.charts";

class DashboardPage extends Component {
    static contextType = ChartsContext;

    constructor(props) {
        super(props);
        this.state = {};
        this.chart = new ChartFactory(this.handleChartChange); // not really using handleChartChange yet here
    }

    findChartAndChange = (oldChartList, id, chartType) => {
        return oldChartList.map(chartOption => {
            if (chartOption.id === id) {
                chartOption.chart.type = chartType;
                return chartOption;
            }
            return chartOption;
        });
    }

    handleChartChange = (e, id) => {
        const newChartType = e.currentTarget.value;
        const oldChartOptions = {...this.context.chartOptions};
        const changedCharts = this.findChartAndChange(oldChartOptions.charts, id, newChartType);
        const newChartOptions = {charts: JSON.parse(JSON.stringify(changedCharts))};

        this.context.setChartOptions(newChartOptions);
    }

    render() {
        return (
            <React.Fragment>
                {this.chart.getChart(this.context.chartOptions, this.handleChartChange)}
            </React.Fragment>
        );
    }
}

DashboardPage.contextType = ChartsContext;

export default DashboardPage;
