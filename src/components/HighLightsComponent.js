import React, {useContext} from "react";
import DashboardItem from "./DashboardItem";
import DashboardItemWrapper from "./DashboardItemWrapper";
import Grid from "@material-ui/core/Grid";
import {ChartsContext} from "../contexts/context.charts";

const HighLightsComponent = () => {
    const {highLights} = useContext(ChartsContext);

    const getHighLights = () => {
        const keys = Object.keys(highLights);
        let highLightList = [];
        let totalTweets = 0;

        keys.forEach((key, i) => {
            totalTweets += highLights[key];
            if (key !== "NEUTRAL") {
                highLightList.push(<Grid item xs={4} key={key + i}>
                    <DashboardItem children={highLights[key]} title={`${key} TWEETS`} key={key + i} />
                </Grid>)
            }
        });
        return [(<Grid item xs={4} key={'total' + 99}>
            <DashboardItem children={totalTweets} title={`TOTAL TWEETS`} />
        </Grid>), ...highLightList];
    }

    return (
        <DashboardItemWrapper children={getHighLights()} />
    );
};

export default HighLightsComponent;
