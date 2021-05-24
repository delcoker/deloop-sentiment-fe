// https://googlechrome.github.io/samples/classes-es6/

'use strict';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Box, Button, Card, CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {ChartTypes} from "../enums/ChartTypes";

// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
class AbstractChart extends React.Component {
    MAX_CHART_TYPES = 4;
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
                <Button value={ option.string }
                        key={ option.string }
                        onClick={ (e) => {
                            return this.props.handleChartChange(e, chart_id)
                        } }>
                    { option.display.toUpperCase() }
                </Button>)
        }
    }

    displayCharts = () => {
        if (this.props.chartOptions && this.props.chartOptions.charts && this.props.chartOptions.charts.length > 0) {
            return this.props.chartOptions.charts.map((chart, i) => {
                return (
                    <Grid item lg={ 6 } md={ 8 } xs={ 12 } key={ "chart_" + chart.id }>
                        <Card>
                            <CardContent>
                                <HighchartsReact highcharts={ Highcharts }
                                                 options={ chart }
                                                 key={ chart.id }
                                />
                                { this.getChartSwitches(chart.id) }
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })
        }
    }

    render() {
        return (
            <>
                <Card>
                    <CardHeader
                        title="Dashboard"
                        titleTypographyProps={ {
                            component: Box,
                            marginBottom: "0!important",
                            variant: "h5",
                        } }
                    />
                </Card>
                <br/>
                <Grid container spacing={ 3 } justify="space-between">
                    { this.displayCharts() }
                </Grid>
            </>
        )
    }
}

export default AbstractChart;