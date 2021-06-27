import React, {useContext, useEffect, useState} from "react";
import {chartService} from "../_services/chart.service";
import {UserContext} from "./context.user";
import moment from "moment";

// https://stackoverflow.com/questions/61106127/react-context-api-create-context-from-axios-response
export const ChartsContext = React.createContext({});

const dateFormat = "YYYY-MM-DD HH:mm"

export const ChartsContextWrapper = props => {
    const {user} = useContext(UserContext);

    const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    const [endDate, setEndDate] = useState(new Date(Date.now()));
    const [granularity, setGranularity] = useState("day");
    const [chartOptions, setChartOptions] = useState({});
    const [highLights, setHighLights] = useState({});
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (user !== undefined) {
            const start_date = moment(startDate).format(dateFormat);
            const end_date = moment(endDate).format(dateFormat);

            const params = {start_date: start_date, end_date: end_date, granularity: granularity};
            // console.log(params);
            chartService.getAll(params)
                .then(response => {
                    setChartOptions(response);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error getting all charts")
                    setLoading(false);
                });

            chartService.getHighLights(params)
                .then(response => {
                    setHighLights(response);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error getting highlights")
                    setLoading(false);
                });
        }
    }, [user, startDate, endDate, granularity]);

    return (
        <ChartsContext.Provider
            value={{
                startDate, setStartDate,
                endDate, setEndDate,
                granularity, setGranularity,
                chartOptions, setChartOptions,
                loading, setLoading,
                highLights
            }} // value of your context
        >
            {props.children}
        </ChartsContext.Provider>
    );
}