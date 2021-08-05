import AbstractChart from "./AbstractChart";
import {ChartTypes} from "../enums/ChartTypes";
import React from "react";
import {Box, Card, CardHeader} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
// import CardContent from "@material-ui/core/CardContent";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts";

export default class BarChart extends AbstractChart {
    constructor(props) {
        super(props);
        console.log('bar', props);
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


    // setChartOptions = (chartOptions) => {
    //
    // }


    // displayCharts = () => {
    //     if (this.props.chartOptions && this.props.chartOptions.charts && this.props.chartOptions.charts.length > 0) {
    //         return this.props.chartOptions.charts.map((chart, i) => {
    //             return (
    //                 <Grid item lg={6} md={8} xs={12} key={"chart_" + chart.id}>
    //                     <Card>
    //                         <CardContent>
    //                             <HighchartsReact
    //                                 highcharts={Highcharts}
    //                                 options={chart}
    //                                 key={chart.id}
    //                             />
    //                             {this.getChartSwitches(chart.id)}
    //                         </CardContent>
    //                     </Card>
    //                 </Grid>
    //             )
    //         })
    //     }
    // }

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
                <Grid container spacing={3} justify="space-between">
                    {this.displayCharts()}
                </Grid>
            </React.Fragment>
        )
    }
}