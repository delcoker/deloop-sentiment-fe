import React, {Component} from 'react';
import ChartFactory from "../classes/sentimentchart/ChartFactory";
import {ChartsContext} from "../contexts/context.charts";
import HighLightsComponent from "../components/HighLightsComponent";
import {Box, Card, CardHeader} from "@material-ui/core";
import {CSS_COLOR_NAMES, PropertyTypes} from "../classes/sentimentchart/enums/PropertyTypes";
import WordCloudComponent from "../components/WordCloudComponent";


class DashboardPage extends Component {
    static contextType = ChartsContext;

    constructor(props) {
        super(props);
        this.state = {};
        this.chart = new ChartFactory(); // not really using handleChartChange yet here
    }

    findChartAndChangeType = (oldChartList, id, chartType) => {
        return oldChartList.map(chartOption => {
            if (chartOption.id === id) {
                chartOption.chart.type = chartType;
                return chartOption;
            }
            return chartOption;
        });
    }

    findChartAndChangeProperty = (oldChartList, id, chartProperty) => {
        return oldChartList.map(chartOption => {
            if (chartOption.id === id) {
                chartOption.series.map(eachSeries => {
                    if (chartProperty === PropertyTypes.COLOUR.value) {
                        return eachSeries[chartProperty] = CSS_COLOR_NAMES[Math.floor(Math.random() * CSS_COLOR_NAMES.length)];
                    } else {

                        // console.log(chartOption.plotOptions)

                        // if (chartOption.plotOptions && chartOption.plotOptions.bar && chartOption.plotOptions.bar.stacking === 'percent') {
                        //     let a = {
                        //         formatter: function () {
                        //             return Math.round(100 * this.y / this.total) + '%';
                        //         },
                        //         enabled: eachSeries[chartProperty] ? !eachSeries[chartProperty].enabled : true
                        //     }
                        //     console.log('chartProperty', a)
                        //     eachSeries[chartProperty] = a
                        // } else
                        return eachSeries[chartProperty] = {enabled: eachSeries[chartProperty] ? !eachSeries[chartProperty].enabled : true};
                    }
                });
                // console.log(chartOption)
                return chartOption;
            }
            return chartOption;
        });
    }

    handlePropertyChange = (e, id) => { // code duplication - fix this del - probably strategy pattern
        const newChartProperty = e.currentTarget.value;
        // console.log(newChartProperty);
        const oldChartOptions = {...this.context.chartOptions};
        const oldChartOptions2 = {...this.context.chartOptions2};
        const changedCharts = this.findChartAndChangeProperty(oldChartOptions.charts, id, newChartProperty);
        const changedCharts2 = this.findChartAndChangeProperty(oldChartOptions2.charts, id, newChartProperty);
        const newChartOptions = {charts: JSON.parse(JSON.stringify(changedCharts))};
        const newChartOptions2 = {charts: JSON.parse(JSON.stringify(changedCharts2))};

        this.context.setChartOptions(newChartOptions);
        this.context.setChartOptions2(newChartOptions2);
    }

    handleChartChange = (e, id) => {
        const newChartType = e.currentTarget.value;
        const oldChartOptions = {...this.context.chartOptions};
        const changedCharts = this.findChartAndChangeType(oldChartOptions.charts, id, newChartType);
        const newChartOptions = {charts: JSON.parse(JSON.stringify(changedCharts))};

        const oldChartOptions2 = {...this.context.chartOptions2};
        const changedCharts2 = this.findChartAndChangeType(oldChartOptions2.charts, id, newChartType);
        const newChartOptions2 = {charts: JSON.parse(JSON.stringify(changedCharts2))};

        this.context.setChartOptions(newChartOptions);
        this.context.setChartOptions2(newChartOptions2);
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
                {this.chart.getChartsRow1(this.context.chartOptions, this.handleChartChange, this.handlePropertyChange)}
                <br />
                {this.chart.getChartsRow2(this.context.chartOptions2, this.handleChartChange, this.handlePropertyChange)}
                <br />
                {/*{<WordCloudComponent />}*/}
                {console.log("jjhk")}
            </React.Fragment>
        );
    }
}

DashboardPage.contextType = ChartsContext;

export default DashboardPage;
