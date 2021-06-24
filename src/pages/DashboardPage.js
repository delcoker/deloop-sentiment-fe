import React, {Component} from 'react';
import ChartFactory from "../classes/sentimentchart/ChartFactory";
import {chartService} from "../_services/chart.service";

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // chartType: "default",
            chartOptions:
                {
                    charts: [
                        {
                            id: "one",
                            chart: {
                                type: 'spline'
                            },
                            title: {
                                text: 'Abstract chart'
                            },
                            series: [
                                {
                                    data: [100, 2, 1, 4, 3, 6]
                                }
                            ]
                        }
                    ]
                }

        }
        this.chart = new ChartFactory(this.handleChartChange); // not really using handleChartChange yet here
    }

    fetchData() {
        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);
        console.log(startDate.toDateString());

        const params = {
            start_date: startDate,
            end_date: new Date(),
        }

        chartService.getAll(params).then(response => {
            console.log(response)
            const charts = response.data;

            this.setState({charts});
        }).catch(error => {
            this.setState({
                chartOptions: {
                    charts:
                        [
                            {
                                id: "one",
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Homepage chart A'
                                },
                                series: [
                                    {
                                        data: [100, 20, 10, 40, 30, 60]
                                    }
                                ]
                            },
                            {
                                id: "two",
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Homepage chart'
                                },
                                series: [
                                    {
                                        data: [100, 200, 10, 400, 30, 600]
                                    }
                                ]
                            }
                        ]
                }
            });
        });
    }

    componentDidMount() {
        // get data from be/middle layer
        this.fetchData();
    }

    findChartAndChange = (oldChartList, id, chartType) => {
        // console.log(chartType)
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
        const oldChartOptions = {...this.state.chartOptions};
        const changedCharts = this.findChartAndChange(oldChartOptions.charts, id, newChartType);

        this.setState({chartOptions: {charts: JSON.parse(JSON.stringify(changedCharts))}});
    }

    render() {
        return (
            <React.Fragment>
                {this.chart.getChart(this.state.chartOptions, this.handleChartChange)}
            </React.Fragment>
        );
    }
}

export default DashboardPage;
