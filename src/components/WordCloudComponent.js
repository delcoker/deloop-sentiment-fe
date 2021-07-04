import React, {useContext, useMemo} from "react";
import ReactWordcloud from "react-wordcloud";
// import * as d3 from 'd3';
// import {select} from 'd3-selection';
// import {transition} from 'd3-transition';
// import sw from "stopword";
import {Grid} from "@material-ui/core";
import {ChartsContext} from "../contexts/context.charts";
import {CSS_COLOR_NAMES} from "../classes/sentimentchart/enums/PropertyTypes";
import DashboardItem from "./DashboardItem";
// import memoize from "memoize-one";

// import stopwords from "../pages/stopwords.json";

// word cloud start //
const callbacks = {
    // getWordColor: (word) => word.value > 5000 ? "green" : "red",
    // onWordClick: console.log,
    // onWordMouseOver: console.log,
    getWordTooltip: (word) =>
        `${word.text} (${word.value}) [${word.value > 5000 ? "good" : "bad"}]`,
};
const options = {
    colors: CSS_COLOR_NAMES,
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [10, 100],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 3,
    rotations: 2,
    rotationAngles: [-25, 25],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 2000,
};

let words = [
    {
        text: "Nothing",
        value: 100,
    },
    {
        text: "here",
        value: 75,
    },
    {
        text: "yet",
        value: 50,
    },
    {
        text: "so",
        value: 100,
    },
    {
        text: "chill",
        value: 111,
    },
];

const WordCloudComponent = () => {

    const {wordClouds} = useContext(ChartsContext);
    // console.log('wordClouds.cloud');


    // wordcloud: ({ resultSet }) => {
    // console.log(Object.keys(resultSet.loadResponses[0].annotation.measures)[0] );
    // if (resultSet) {
    //     let max = 0; // most times a word is repeated
    //     const tags = new RegExp(
    //         "(?:https?)://[\nS]+|\bw{1,4}\b|rt|[0-9a-zA-z]*(@)[0-9a-zA-z]*|#[0-9a-zA-z]*|[^a-zA-z0-9]",
    //         "ig"
    //     );

    // console.log(resultSet.loadResponses[0].data);

    // parse text into word array
    // resultSet.loadResponses[0].data.forEach((sentence) => {
    //     const post_word = sw.removeStopwords(
    //         sw.removeStopwords(
    //             sentence["PostData.text"]
    //                 .replace(tags, " ")
    //                 .toLowerCase()
    //                 .split(" ")
    //         ),
    //         stopwords
    //     );
    //
    //     // not clean
    //     const count =
    //         sentence[
    //             Object.keys(resultSet.loadResponses[0].annotation.measures)[0]];
    //
    //     post_word.forEach((word) => {
    //         if (map.has(word)) {
    //             const repeated = map.get(word) + count;
    //             map.set(word, repeated);
    //             if (repeated > max) max = repeated;
    //         } else map.set(word, count);
    //     });
    // }
    // );

    // words = [...word_map.entries()]
    //     // .filter(([text, value]) => value > max / 20)
    //     .map(([text, value]) => {
    //         return {
    //             text,
    //             value,
    //         };
    //     });

    const cloud = <ReactWordcloud
        // callbacks={callbacks}
        size={[1400, 540]}
        options={options}
        words={wordClouds.cloud || words}
    />

    return <DashboardItem children={cloud} title={"Word Cloud"} />
};

// const WordCloudComponent = React.memo(WordCloudComponent);

export default WordCloudComponent;