import React from "react";
import WordCloudComponent from "../components/WordCloudComponent";
import Grid from "@material-ui/core/Grid";

const WordCloudPage = (/**{withTime}**/) => {

    return (
        <Grid container spacing={3} justify="space-between">
            <Grid item xs={12}>
                <WordCloudComponent />
            </Grid>
        </Grid>
    );
};

export default WordCloudPage;
