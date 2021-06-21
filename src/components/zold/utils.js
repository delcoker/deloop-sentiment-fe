// import { useCubeQuery } from "@cubejs-client/react";

export const getUserPreference = (preference) =>
    JSON.parse(window.localStorage.getItem(preference));

export const setUserPreference = (key, preference) =>
    window.localStorage.setItem(key, JSON.stringify(preference));

export const SetPageDropDownList = (query, drop_down_queries) => {
    // const { resultSet, error, isLoading } = useCubeQuery(query);

    if (error) return;

    resultSet &&
        resultSet.loadResponses[0].data
            .sort((a, b) =>
                a["IssuesOfInterest.name"] > b["IssuesOfInterest.name"]
                    ? 1
                    : a["IssuesOfInterest.name"] < b["IssuesOfInterest.name"]
                    ? -1
                    : 0
            )
            .forEach((element) => {
                // console.log(element);
                const query_dimension = element[query.dimensions[1]];
                drop_down_queries[query_dimension] = {
                    dimensions: [
                        "PostData.sentimentScore",
                        query.dimensions[1],
                    ],
                    timeDimensions: [
                        {
                            dimension: "PostData.createdAt",
                            granularity: "day",
                        },
                    ],
                    measures: ["PostIsAboutUser.count"],
                    filters: [
                        {
                            member: query.dimensions[1],
                            operator: "equals",
                            values: [element[query.dimensions[1]]],
                        },
                        {
                            member: "PostData.sentimentScore",
                            operator: "equals",
                            values: ["negative", "positive"],
                        },
                    ],
                };
            });
    return drop_down_queries;
};

export const SetNumberCardList = (attr, number_queries, query_dimensions) => {
    if (attr === "All People" || attr === "All Issues") {
        number_queries["All People"] &&
            (number_queries["All People"].query.filters = []);
        number_queries["All Issues"] &&
            (number_queries["All Issues"].query.filters = []);
        number_queries.positiveCount.query.filters = [];
        number_queries.negativeCount.query.filters = [];
    } else {
        Object.values(number_queries).map((element) => {
            element.query.filters = []; // why does this need to be created first? OMG !!
            element.query.filters[0] = {
                member: query_dimensions.dimensions[1],
                operator: "equals",
                values: [attr],
            };
        });
    }
    return number_queries;
};

export const SetPieCloudDimensions = (attr, queries, query_dimensions) => {
    Object.keys(queries).forEach((element) => {
        if (element === "tweetPercentage")
            if (attr === "All People" || attr === "All Issues") {
                queries.tweetPercentage.query.dimensions = [
                    query_dimensions.dimensions[1],
                ];
                queries.tweetPercentage.query.filters = [];
            } else {
                queries.tweetPercentage.query.dimensions = [
                    query_dimensions.dimensions[1],
                    "PostData.sentimentScore",
                ];
                queries.tweetPercentage.query.filters = [
                    {
                        member: query_dimensions.dimensions[1],
                        operator: "equals",
                        values: [attr],
                    },
                    {
                        member: "PostData.sentimentScore",
                        operator: "equals",
                        values: ["negative", "positive"],
                    },
                ];
            }
        else if (element === "wordCloud") {
            // const filter = {
            //     dimension: "UsersOfInterest.name",
            //     operator: "equals",
            //     values: [attr],
            // };
            if (attr === "All People" || attr === "All Issues") {
                queries.wordCloud.query.filters = [
                    {
                        member: "PostData.count",
                        operator: "gt",
                        values: ["10"],
                    },
                ];
            } else {
                // queries.wordCloud.query.filters.push(filter); // doesn't work as well
                queries.wordCloud.query.filters = [
                    {
                        member: query_dimensions.dimensions[1],
                        operator: "equals",
                        values: [attr],
                    },
                    {
                        member: "PostData.count",
                        operator: "gt",
                        values: ["5"],
                    },
                ];

                // this is a hack
                if (
                    attr === "Ministry of Defence" ||
                    attr === "Ministry of Energy" ||
                    attr === "corruption" ||
                    attr === "election" ||
                    attr === "government performance"
                ) {
                    queries.wordCloud.query.filters = [
                        {
                            member: query_dimensions.dimensions[1],
                            operator: "equals",
                            values: [attr],
                        },
                    ];
                }
            }
        }
    });
};
