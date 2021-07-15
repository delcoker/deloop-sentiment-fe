import {axiosWrapper} from '../_helpers';

export const chartService = {
    getCollectedConversations,
    getCollectedSentimentTypes,
    getIssueImportance,
    getIssueSeverity,
    getHighLights,
    getWordCloudTweets,
    getWordCloudLocations,
    // getChartById,
    // create,
    // update,
    // delete: _delete,
};

// total daily collected conversations,
// total daily sentiment by positive or negative count
// total daily sentiment by positive or negative percentage

const apiRoute = `/graphs`;

function getCollectedConversations(params) {
    let requestData = defaultRequestDataParams(params);
    if (!requestData) return;
    requestData.append("granularity", params.granularity);

    return axiosWrapper.post(`${apiRoute}/collected_conversations`, requestData);
}

function getIssueSeverity(params) {
    let requestData = defaultRequestDataParams(params);
    if (!requestData) return;
    requestData.append("granularity", params.granularity);

    return axiosWrapper.post(`${apiRoute}/issue_severity`, requestData);
}

function getIssueImportance(params) {
    let requestData = defaultRequestDataParams(params);
    if (!requestData) return;

    return axiosWrapper.post(`${apiRoute}/issue_importance`, requestData);
}

function getCollectedSentimentTypes(params) {
    let requestData = defaultRequestDataParams(params);
    if (!requestData) return;
    requestData.append("granularity", params.granularity);

    return axiosWrapper.post(`${apiRoute}/collected_sentiment_types`, requestData);
}

function getHighLights(params) {
    let requestData = defaultRequestDataParams(params);
    if (!requestData) return;

    return axiosWrapper.post(`${apiRoute}/highlights`, requestData);
}

function getWordCloudTweets(params) {
    let requestData = defaultRequestDataParams(params);
    if (!requestData) return;

    return axiosWrapper.post(`${apiRoute}/word_cloud/tweets`, requestData);
}

function getWordCloudLocations(params) {
    let requestData = defaultRequestDataParams(params);
    if (!requestData) return;

    return axiosWrapper.post(`${apiRoute}/word_cloud/locations`, requestData);
}

function defaultRequestDataParams(params) {
    // console.log(params)
    // if (params.start_date !== "Invalid date" || params.end_date !== "Invalid date") return null;
    let requestData = new FormData();
    requestData.append("start_date", params.start_date);
    requestData.append("end_date", params.end_date);
    return requestData;
}