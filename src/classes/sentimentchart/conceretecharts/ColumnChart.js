import AbstractChart from "./AbstractChart";
import {ChartTypes} from "../enums/ChartTypes";

export default class ColumnChart extends AbstractChart {
    constructor(props) {
        super(props);

        this.state.chartOptions =
            {
                charts: [
                    {
                        id: "one",
                        chart: {
                            type: ChartTypes.COLUMN.string
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
                        id: "two",
                        chart: {
                            type: ChartTypes.COLUMN.string
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