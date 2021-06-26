import React, {useContext, useEffect, useState} from "react";
import {chartService} from "../_services/chart.service";
import {UserContext} from "./context.user";

// https://stackoverflow.com/questions/61106127/react-context-api-create-context-from-axios-response
export const ChartsContext = React.createContext({});

export const ChartsContextWrapper = props => {
    const {user} = useContext(UserContext);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [granularity, setGranularity] = useState("day");
    const [chartOptions, setChartOptions] = useState({});
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (user !== undefined) {
            const params = {startDate: startDate, endDate: endDate, granularity: granularity};
            chartService.getAll(params)
                .then(response => {
                    // console.log(response);
                    setChartOptions(response);

                    setLoading(false);
                })
                .catch(error => {
                    console.log("error")
                    setLoading(false);
                });
        }
    }, [user]);

    return (
        <ChartsContext.Provider
            value={{
                startDate, setStartDate,
                endDate, setEndDate,
                granularity, setGranularity,
                chartOptions, setChartOptions,
                loading, setLoading
            }} // value of your context
        >
            {props.children}
        </ChartsContext.Provider>
    );
}