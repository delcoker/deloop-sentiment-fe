'use strict';
import AbstractChart from "./AbstractChart";
import React from "react";
import {ChartTypes} from "../enums/ChartTypes";
import Button from "@material-ui/core/Button";

export default class LineChart extends AbstractChart {
    constructor(props) {
        super(props);
        console.log(props)
        this.state.chartOptions =
            {
                charts: [
                    {
                        id: "one",
                        chart: {
                            type: ChartTypes.LINE.string
                        },
                        title: {
                            text: 'Constructor Line chart'
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
                            type: ChartTypes.LINE.string
                        },
                        title: {
                            text: 'Constructor Line chart'
                        },
                        series: [
                            {
                                data: [10, 2, 1, 4, 3, 6]
                            }
                        ]
                    },
                ]
            };
    }

    handleChartChange = (e) => {
        console.log(e.currentTarget)
        this.setState({
            chartType: e.currentTarget.value,
            // chartOp
        });
    }

    getChartSwitches = () => {
        const switch_options = Object.values(ChartTypes).filter(obj => obj.value <= this.MAX_CHART_TYPES);
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
}