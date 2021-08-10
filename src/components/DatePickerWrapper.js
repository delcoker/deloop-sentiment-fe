import React, {useState, useEffect, useContext} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import moment from "moment";

import DateRangePickerComponent from "./DateRangePickerComponent"
import SegmentsDialog from "../components/SegmentsDialog";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {ChartsContext} from "../contexts/context.charts";

// import {getUserPreference, setUserPreference} from "../utils.js";

const DEFAULT_BEGIN_DATE = moment().subtract(7, "days");
const DEFAULT_END_DATE = moment();

// TODO: that should be dynamic and loaded from Cube.js schema
const segments = [
    {title: "Day", key: "day"},
    {
        title: "Week",
        key: "week",
        description: "Good sentiment",
    },
    {title: "Month", key: "month", description: `Bad sentiment`},
    {title: "Year", key: "year", description: `Bad sentiment`},
];

const DatePickerWrapper = ({childComponent: Component}) => {
    const {granularity, setGranularity} = useContext(ChartsContext);
    // const [beginDate, setBeginDate] = useState('begin');
    // const [endDate, setEndDate] = useState('end');
    // const [segment, setSegment] = useState(
    //     /** getUserPreference("segment") ||**/ segments[0]
    // );
    // const [segmentsDialogOpen, setSegmentsDialogOpen] = useState(false);
    // const withTime = (vizState) => {
    //     // return withTimeFunc(vizState, beginDate, endDate, segment.key);
    // };

    // useEffect(() => {
    //     // setUserPreference("daterange", [beginDate, endDate]);
    //     // setUserPreference("segment", segment);
    // }, [beginDate, endDate, segment]);


    return (

        <Grid container spacing={3} justify="space-between">
            <Grid item xs={3}>
                <ButtonGroup size="small" color="primary" aria-label="outlined primary button group">
                    {[/**'hour',**/ 'day', 'week', 'month', 'year'].map(granOption => (
                        <Button
                            variant={granularity === granOption ? 'contained' : ''}
                            key={"granularity_" + granOption}
                            onClick={() => setGranularity(granOption)}
                        >
                            {granOption.toUpperCase()}
                        </Button>
                    ))}
                </ButtonGroup>
                {/*<Button*/}
                {/*    variant="outlined"*/}
                {/*    color="primary"*/}
                {/*    onClick={() => setSegmentsDialogOpen(true)}*/}
                {/*>*/}
                {/*    {segment.title}*/}
                {/*</Button>*/}
                {/*<SegmentsDialog*/}
                {/*    segments={segments}*/}
                {/*    selectedKey={segment.key}*/}
                {/*    open={segmentsDialogOpen}*/}
                {/*    onClose={() => setSegmentsDialogOpen(false)}*/}
                {/*    onSelect={(segment) => {*/}
                {/*        setSegment(segment);*/}
                {/*        setSegmentsDialogOpen(false);*/}
                {/*    }}*/}
                {/*/>*/}
            </Grid>

            <Grid item xs={3}>
                <DateRangePickerComponent
                    // value={[beginDate, endDate]}
                    // placeholder="Select a date range"
                    // onChange={(values) => {
                    //     setBeginDate(values.begin);
                    //     setEndDate(values.end);
                    // }}
                />
            </Grid>

            <Grid item xs={12}>
                {Component}
            </Grid>

        </Grid>
    );
};

export default DatePickerWrapper;
