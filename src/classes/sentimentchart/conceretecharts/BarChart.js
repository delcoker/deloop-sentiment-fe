import AbstractChart from "./AbstractChart";
import {ChartTypes} from "../enums/ChartTypes";

export default class BarChart extends AbstractChart {
    constructor(props) {
        super(props);
        this.state.chartOptions =
            {
                charts: [
                    {
                        id: "one",
                        chart: {
                            type: ChartTypes.BAR.string
                        },
                        title: {
                            text: 'Bar chart'
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
                            type: ChartTypes.BAR.string
                        },
                        title: {
                            text: 'bar chart'
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