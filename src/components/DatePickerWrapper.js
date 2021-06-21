import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import moment from "moment";

import DateRangePickerComponent from "./DateRangePickerComponent"
import SegmentsDialog from "../components/SegmentsDialog";
import DashboardPage from "../pages/DashboardPage";

// import {getUserPreference, setUserPreference} from "../utils.js";

const DEFAULT_BEGIN_DATE = moment().subtract(7, "days");
const DEFAULT_END_DATE = moment();

// TODO: that should be dynamic and loaded from Cube.js schema
const segments = [
    {title: "All Tweets", key: "all"},
    {
        title: "Positive Tweets",
        key: "positive",
        description: "Good sentiment",
    },
    {title: "Negative Tweets", key: "negative", description: `Bad sentiment`},
];

const getDateRange = () => {
    // const savedDateRange = undefined; 'getUserPreference';

    // if (savedDateRange) {
    // return savedDateRange.map((date) => moment(date));
    // } else {
    return [DEFAULT_BEGIN_DATE, DEFAULT_END_DATE];
    // }
};

// error with time getting segments from joined cubes
// custom withTime query for segmenting
const withTimeFunc = ({query, ...vizState}, begin, end, segment) => {
    // console.log('vizState', query);
    const timeDimensionObj = (query.timeDimensions || [])[0] || {};
    const cube =
        (query.measures && query.measures[0].split(".")[0]) || "PostData";
    const timeDimension = timeDimensionObj.dimension || `${cube}.createdAt`;
    const granularity = timeDimensionObj.granularity || null;
    const segmentCube = (query) => {
        const measureCube = query.measures[0].split(".")[0];

        if (
            ["PostIsAboutIssue", "PostIsAboutUser"].indexOf(measureCube) !== -1
        ) {
            return "PostData";
        }

        return measureCube;
    };
    let segments =
        segment === "all" ? [] : [`${segmentCube(query)}.${segment}`];

    // del
    if (query.segments) {
        segments = query.segments;
    }
    // del;

    return {
        ...vizState,
        query: {
            ...query,
            segments,
            timeDimensions: [
                {
                    dimension: timeDimension,
                    dateRange: [
                        begin.format(moment.HTML5_FMT.DATE),
                        end.format(moment.HTML5_FMT.DATE),
                    ],
                    granularity: granularity,
                },
            ],
        },
    };
};

const DatePickerWrapper = ({childComponent: Component}) => {
    const [begin, end] = getDateRange();
    const [beginDate, setBeginDate] = useState(begin);
    const [endDate, setEndDate] = useState(end);
    const [segment, setSegment] = useState(
        // getUserPreference("segment") || segments[0]
    );
    const [segmentsDialogOpen, setSegmentsDialogOpen] = useState(false);
    const withTime = (vizState) => {
        // return withTimeFunc(vizState, beginDate, endDate, segment.key);
    };

    useEffect(() => {
        // setUserPreference("daterange", [beginDate, endDate]);
        // setUserPreference("segment", segment);
    }, [beginDate, endDate, segment]);

    return (

        <Grid container spacing={3} justify="space-between">
            <Grid item xs={3}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setSegmentsDialogOpen(true)}
                >
                    {'segment.title'}
                </Button>
                <SegmentsDialog
                    segments={segments}
                    // selectedKey={segment.key}
                    open={segmentsDialogOpen}
                    onClose={() => setSegmentsDialogOpen(false)}
                    onSelect={(segment) => {
                        // setSegment(segment);
                        setSegmentsDialogOpen(false);
                    }}
                />
            </Grid>

            <Grid item xs={3}>
                <DateRangePickerComponent
                    value={[beginDate, endDate]}
                    placeholder="Select a date range"
                    onChange={(values) => {
                        setBeginDate(values.begin);
                        setEndDate(values.end);
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                {Component}
            </Grid>


        </Grid>
    );
};

export default DatePickerWrapper;
