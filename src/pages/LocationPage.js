import React from "react";
import SvgMap from "../components/SvgMapComponent";
import XMLParser from "react-xml-parser";
import SvgGhPath from "../assets/svgMapXML/XMLGhPath";

const LocationPage = (/**{withTime}**/) => {
    const map = {};
    const xml = new XMLParser().parseFromString(SvgGhPath); // Assume xmlText contains the example XML
    map.paths = xml.getElementsByTagName("path");
    map.circles = xml.getElementsByTagName("circle");

    return (
        // <Grid container spacing={3} justify="space-between">
        //     <Grid item xs={12}>
        <SvgMap
            style={{fontSize: "70vh"}}
            color={"yellow"}
            map={map}
            // withTime={withTime}
        />
        // {/* </Grid>

        // </Grid> */}
    );
};

export default LocationPage;
