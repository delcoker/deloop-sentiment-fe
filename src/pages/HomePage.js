import React, {Component} from 'react';
import ChartFactory from "../classes/sentimentchart/ChartFactory";
import {ChartTypes} from "../classes/sentimentchart/enums/ChartTypes";
import Button from "@material-ui/core/Button";

const MAX_CHART_TYPES = 4;

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.chart = new ChartFactory();
        this.state = {
            chartType: "line",
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
    }


    componentDidMount() {
        this.setState({
            chartOptions:
                {
                    charts: [
                        {
                            id: "one",
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: 'Homepage line---- chart'
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
                                text: 'Homepage line---- chart'
                            },
                            series: [
                                {
                                    data: [100, 200, 10, 40, 30, 600]
                                }
                            ]
                        }
                    ]
                }
        });
    }

    handleChartChange = (e) => {
        console.log(e.currentTarget)
        this.setState({
            chartType: e.currentTarget.value,
            // chartOp
        });
    }

    getChartSwitches = () => {
        const switch_options = Object.values(ChartTypes).filter(obj => obj.value <= MAX_CHART_TYPES);
        // console.log(switch_options, MAX_CHART_TYPES)
        if (switch_options.length > 0) {
            return switch_options.map((option, i) =>
                <Button value={option.string}
                        key={option.string}
                        onClick={this.handleChartChange}>
                    {option.display.toUpperCase()}
                </Button>)
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.chart.getChart(this.state.chartType, this.state.chartOptions)}
                {/*{this.getChartSwitches()}*/}
            </React.Fragment>
        );
    }
}

export default HomePage;
