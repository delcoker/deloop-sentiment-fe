import React, {useContext} from "react";
import WordCloudComponent from "../components/WordCloudComponent";
import {ChartsContext} from "../contexts/context.charts";

const WordCloudPage = (/**{withTime}**/) => {

    const {wordCloudTweets, wordCloudLocations} = useContext(ChartsContext);

    const getWordClouds = () =>
        [wordCloudTweets, wordCloudLocations].map((wordCloud, i) =>
            <WordCloudComponent wordCloud={wordCloud} key={i} />
        )

    return <React.Fragment>
        {(getWordClouds())}
    </React.Fragment>
};

export default WordCloudPage;
