// https://googlechrome.github.io/samples/classes-es6/

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Button, Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {ChartTypes} from "../enums/ChartTypes";
import {PropertyTypes} from "../enums/PropertyTypes";

require('highcharts/modules/exporting')(Highcharts);

// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
class AbstractChart extends React.Component {
    MAX_CHART_TYPES = 5;
    // ..and an (optional) custom class constructor. If one is
    // not supplied, a default constructor is used instead:
    constructor(props) {
        super(props);

        if (new.target === AbstractChart) {
            throw new TypeError("Cannot construct abstract instances directly");
        }

        this.state = {
            chartOptions: {
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
                                data: [10, 2, 1, 4, 3, 6]
                            }
                        ]
                    },
                    {
                        id: "two",
                        chart: {
                            type: 'spline'
                        },
                        title: {
                            text: 'Abstract chart'
                        },
                        series: [
                            {
                                data: [10, 2, 1, 4, 3, 6]
                            }
                        ]
                    }
                ]
            }
        }
    }

    getChartSwitches = (chart_id) => {
        const switch_options = Object.values(ChartTypes).filter(obj => obj.value <= this.MAX_CHART_TYPES);
        if (switch_options.length > 0) {
            return switch_options.map((option, i) =>
                <>
                    <Button value={option.string}
                            key={option.string}
                            size="small"
                            onClick={(e) => {
                                return this.props.handleChartChange(e, chart_id)
                            }}
                            // variant="outlined"
                            color="primary"
                    >
                        {option.display.toUpperCase()}
                    </Button>&nbsp;</>)
        }
    }

    getPropertyToggles = (chart_id) => {
        const switch_options = Object.values(PropertyTypes);//.filter(obj => obj.value <= this.MAX_CHART_TYPES);
        if (switch_options.length > 0) {
            return switch_options.map((option, i) =>
                <>
                    <Button value={option.value}
                            key={option.value}
                            size="small"
                            onClick={(e) => {
                                return this.props.handlePropertyChange(e, chart_id)
                            }}
                            // variant="contained"
                            color="primary"
                    >
                        {option.display.toUpperCase()}
                    </Button>&nbsp;</>)
        }
    }

    displayCharts = () => {
        if (this.props.chartOptions && this.props.chartOptions.charts && this.props.chartOptions.charts.length > 0) {
            return this.props.chartOptions.charts.map((chart, i) => {
                return (
                    <Grid item lg={6} md={8} xs={12} key={"chart_" + chart.id}>
                        <Card>
                            <CardContent>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chart}
                                    key={chart.id}
                                />
                                {this.getChartSwitches(chart.id)}
                                {/*<br />*/}
                                {/*{this.getChartSwitches(chart.id)} add stacked switches here*/}
                                <br />
                                {this.getPropertyToggles(chart.id)}
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid container spacing={3} justify="space-between">
                    {this.displayCharts()}
                </Grid>
            </React.Fragment>
        )
    }
}

export default AbstractChart;