'use strict';
import AbstractChart from "./AbstractChart";
import React from "react";
import {ChartTypes} from "../enums/ChartTypes";

export default class PieChart extends AbstractChart {
    constructor(props) {
        super(props);
        this.state.chartOptions =
            {
                charts: [
                    {
                        id:"one",
                        chart: {
                            type: ChartTypes.PIE.string
                        },
                        title: {
                            text: 'Pie chart'
                        },
                        series: [
                            {
                                data: [10, 2, 1, 4, 3, 6]
                            }
                        ]
                    },
                    {
                        id:"two",
                        chart: {
                            type: ChartTypes.PIE.string
                        },
                        title: {
                            text: 'Pie chart'
                        },
                        series: [
                            {
                                data: [10, 2, 1, 4, 3, 6]
                            }
                        ]
                    }
                ]
            };
    }
}