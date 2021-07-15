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
    const [chartOne, setChartOne] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [issueImportance, setIssueImportance] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});
    const [highLights, setHighLights] = useState({});
    const [wordCloudTweets, setWordCloudTweets] = useState({cloud: []});
    const [wordCloudLocations, setWordCloudLocations] = useState({cloud: []});
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (user !== undefined) {
            const start_date = moment(startDate).format(dateFormat);
            const end_date = moment(endDate).format(dateFormat);

            const params = {start_date: start_date, end_date: end_date, granularity: granularity};
            // console.log(params);
            chartService.getCollectedConversations(params)
                .then(response => {
                    setChartOne(response);
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

    useEffect(() => {
        if (user !== undefined) {
            const start_date = moment(startDate).format(dateFormat);
            const end_date = moment(endDate).format(dateFormat);

            const params = {start_date: start_date, end_date: end_date, granularity: granularity};

            chartService.getCollectedSentimentTypes(params)
                .then(response => {
                    const charts = {charts: [...chartOne.charts, response.charts[0]]};
                    setChartOptions(charts);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error getting collected sentiments charts")
                    setLoading(false);
                });
        }
    }, [chartOne.charts]);

    useEffect(() => {
        if (user !== undefined) {
            const start_date = moment(startDate).format(dateFormat);
            const end_date = moment(endDate).format(dateFormat);

            const params = {start_date: start_date, end_date: end_date, granularity: granularity};

            chartService.getIssueImportance(params)
                .then(response => {
                    setIssueImportance(response);
                    setChartOptions2(response)
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error getting issue importance")
                    setLoading(false);
                });
        }
    }, [chartOne.charts]);

    useEffect(() => {
        if (user !== undefined) {
            const start_date = moment(startDate).format(dateFormat);
            const end_date = moment(endDate).format(dateFormat);

            const params = {start_date: start_date, end_date: end_date, granularity: granularity};

            chartService.getIssueSeverity(params)
                .then(response => {
                    // console.log(response)
                    const charts = {charts: [...issueImportance.charts, response.charts[0]]};
                    setChartOptions2(charts);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error getting Issue severity")
                    setLoading(false);
                });
        }
    }, [issueImportance.charts]);

    useEffect(() => {
        if (user !== undefined) {
            const start_date = moment(startDate).format(dateFormat);
            const end_date = moment(endDate).format(dateFormat);

            const params = {start_date: start_date, end_date: end_date};

            chartService.getWordCloudTweets(params)
                .then(response => {
                    const charts = {cloud: response};
                    setWordCloudTweets(charts);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error getting world cloud for tweets")
                    setLoading(false);
                });
        }
    }, [user, startDate, endDate]);

    useEffect(() => {
        if (user !== undefined) {
            const start_date = moment(startDate).format(dateFormat);
            const end_date = moment(endDate).format(dateFormat);

            const params = {start_date: start_date, end_date: end_date};

            chartService.getWordCloudLocations(params)
                .then(response => {
                    const charts = {cloud: response};
                    setWordCloudLocations(charts);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error getting world cloud for location")
                    setLoading(false);
                });
        }
    }, [user, startDate, endDate]);

    return (
        <ChartsContext.Provider
            value={{
                startDate, setStartDate,
                endDate, setEndDate,
                granularity, setGranularity,
                chartOptions, setChartOptions,
                loading, setLoading,
                highLights,
                chartOptions2, setChartOptions2,
                wordCloudTweets, setWordCloudTweets,
                wordCloudLocations, setWordCloudLocations,
            }} // value of your context
        >
            {props.children}
        </ChartsContext.Provider>
    );
}