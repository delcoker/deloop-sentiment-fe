import AbstractChart from "./AbstractChart";
import {ChartTypes} from "../enums/ChartTypes";

export default class BaseChart extends AbstractChart {
    constructor(props) {
        super(props);
        // console.log("====================",this.props)
        this.state.chartOptions =
            {
                charts: [
                    {
                        id: "one",
                        chart: {
                            type: ChartTypes.BAR.string
                        },
                        title: {
                            text: 'DUMMY chart'
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
                            text: 'TEST CHART'
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