import React, {Component} from 'react';
import ChartFactory from "../classes/sentimentchart/ChartFactory";
import {ChartsContext} from "../contexts/context.charts";
import HighLightsComponent from "../components/HighLightsComponent";
import {Box, Card, CardHeader} from "@material-ui/core";

class DashboardPage extends Component {
    static contextType = ChartsContext;

    constructor(props) {
        super(props);
        this.state = {};
        this.chart = new ChartFactory(); // not really using handleChartChange yet here
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

    handleChartChangeRow2 = (e, id) => {
        const newChartType = e.currentTarget.value;
        const oldChartOptions = {...this.context.chartOptions2};
        const changedCharts = this.findChartAndChange(oldChartOptions.charts, id, newChartType);
        const newChartOptions = {charts: JSON.parse(JSON.stringify(changedCharts))};

        this.context.setChartOptions2(newChartOptions);
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader
                        title="Dashboard"
                        titleTypographyProps={{
                            component: Box,
                            marginBottom: "0!important",
                            variant: "h5",
                        }}
                    />
                </Card>
                <br />
                <HighLightsComponent />
                <br />
                {this.chart.getChartsRow1(this.context.chartOptions, this.handleChartChange)}
                <br />
                {this.chart.getChartsRow2(this.context.chartOptions2, this.handleChartChangeRow2)}
            </React.Fragment>
        );
    }
}

DashboardPage.contextType = ChartsContext;

export default DashboardPage;
