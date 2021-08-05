import React, {useState, useEffect, createRef} from "react";
import {SvgIcon} from "@material-ui/core";
import {Card, CardContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CountryListComponent from "./CountryListComponent";
import Typography from "@material-ui/core/Typography";
// import { CubeContext } from "@cubejs-client/react";
// import { ResponsiveContainer } from "recharts";

// this component accepts SVG ma`ps as XML string props and extracts the
// id & names into a list
const numColumns = 2;
const numRows = 5;
const defaultText = "Ghana";

const numberQueries = {
    All: {
        chartType: "number",
        query: {
            measures: ["PostDataView.positiveAndNegativeCount"],
            timeDimensions: [
                {
                    dimension: "PostDataView.createdAt",
                },
            ],
            dimensions: [
                "PostDataView.locationRegion",
                "PostDataView.sentimentScore",
            ],
            filters: [
                {
                    member: "PostDataView.sentimentScore",
                    operator: "equals",
                    values: ["positive", "negative"],
                },
                {
                    member: "PostDataView.locationRegion",
                    operator: "notEquals",
                    values: [null],
                },
            ],
            order: {
                "PostDataView.positiveAndNegativeCount": "desc",
            },
        },
    },
};

function SvgMap(props) {
    const { /**withTime**/} = props;
    const states = [];
    const [highlightedStateId, setHighlightedStateId] = useState();
    const [highlightedStateName, setHighlightedStateName] = useState(
        defaultText
    );
    const [highlightedDetails, setHighlightedDetails] = useState();
    // const { cubejsApi } = React.useContext(CubeContext);
    const [regionSentimentScore, setRegionSentimentScore] = useState(new Map());
    const elRefs = React.useRef([]);

    // https://stackoverflow.com/questions/10992691/how-to-place-text-in-the-center-of-an-svg-path/11013021#11013021
    function addText(p) {
        var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var b = p && p.getBBox();
        t.setAttribute(
            "transform",
            "translate(" +
            (b.x + b.width / 2.2) +
            " " +
            (b.y + b.height / 2.05) +
            ")"
        );
        t.textContent =
            p.attributes.name.value.match(/\b([A-Z])/g).join("") + "";
        t.setAttribute("fill", "white");
        t.setAttribute("font-size", "40");
        t.setAttribute("stroke-width", "0");
        p.parentNode.insertBefore(t, p.nextSibling);
    }

    /**
     useEffect(() => {
        cubejsApi.load(withTime(numberQueries.All).query).then((resultSet) => {
            const regionSentiments = resultSet.loadResponses[0].data;
            let regionSentimentSum = new Map();

            regionSentiments.forEach((regionSentitment) => {
                if (
                    regionSentimentSum.has(
                        regionSentitment["PostDataView.locationRegion"]
                    )
                ) {
                    let val =
                        regionSentitment["PostDataView.sentimentScore"] ===
                        "POSITIVE"
                            ? regionSentitment[
                                  "PostDataView.positiveAndNegativeCount"
                              ]
                            : -regionSentitment[
                                  "PostDataView.positiveAndNegativeCount"
                              ];

                    let oldVal = regionSentimentSum.get(
                        regionSentitment["PostDataView.locationRegion"]
                    ).val;
                    let pos = oldVal > 0 ? oldVal : 0;
                    let neg = oldVal < 0 ? oldVal : 0;
                    if (val > 0) pos = val;
                    else neg = val;
                    regionSentimentSum.set(
                        regionSentitment["PostDataView.locationRegion"],
                        { val: val + oldVal, positive: pos, negative: -neg }
                    );
                } else {
                    let val =
                        regionSentitment["PostDataView.sentimentScore"] ===
                        "POSITIVE"
                            ? regionSentitment[
                                  "PostDataView.positiveAndNegativeCount"
                              ]
                            : -regionSentitment[
                                  "PostDataView.positiveAndNegativeCount"
                              ];
                    let pos = 0;
                    let neg = 0;
                    if (val > 0) pos = val;
                    else neg = val;

                    regionSentimentSum.set(
                        regionSentitment["PostDataView.locationRegion"],
                        { val: val, positive: pos, negative: -neg }
                    );
                }
            });
            setRegionSentimentScore(regionSentimentSum);

            elRefs.current.forEach(({ current }) => addText(current));
        });
    }, [withTime, cubejsApi]);
     **/

    const getOpacity = (id) => (highlightedStateId === id ? 0.6 : 0.8);
    const getColor = (name) => {
        const region = regionSentimentScore.get(name);

        if (region && region.val < 0) return "red";
        if (region && region.val > 0) return "green";
        // return "yellow";
    };

    return (

        <Grid item xs={12}>
            <CardContent>
                <Card>
                    <Grid container spacing={3} justify="space-between">
                        <Grid item xs={7}>
                            <Grid
                                container
                                spacing={3}
                                justify="space-around"
                            >
                                <Grid item xs={3}>
                                    <Typography
                                        variant="h6"
                                        // component="h2"
                                        gutterBottom
                                    >
                                        {highlightedStateName}
                                    </Typography>
                                    {highlightedDetails && "Sentiments:"}
                                    <br />
                                    {highlightedDetails}
                                </Grid>
                                <Grid item xs={9}>
                                    {/* <ResponsiveContainer width="100%"> */}
                                    <SvgIcon
                                        // <svg
                                        // fontSize='large'
                                        // fill="#fff"
                                        // height="1458"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={5}
                                        // preserveAspectRatio="xMidYMin"
                                        // preserveAspectRatio="xMinYMin meet"
                                        // width="1000"
                                        viewBox="0 0 1000 1458"
                                        style={props.style}
                                    >
                                        <g color={props.color} transform="translate(-150 0) scale(1.00)">
                                            <title>Ghana</title>
                                            {props.map &&
                                            props.map.paths.map(
                                                (path, i) => {
                                                    states.push({
                                                        id:
                                                        path
                                                            .attributes
                                                            .id,
                                                        key:
                                                        path
                                                            .attributes
                                                            .id,
                                                        state:
                                                        path
                                                            .attributes
                                                            .name,
                                                        positive:
                                                            regionSentimentScore.get(
                                                                path
                                                                    .attributes
                                                                    .name
                                                            ) &&
                                                            regionSentimentScore.get(
                                                                path
                                                                    .attributes
                                                                    .name
                                                            ).positive,
                                                        negative:
                                                            regionSentimentScore.get(
                                                                path
                                                                    .attributes
                                                                    .name
                                                            ) &&
                                                            regionSentimentScore.get(
                                                                path
                                                                    .attributes
                                                                    .name
                                                            ).negative,
                                                    });

                                                    if (
                                                        elRefs.current
                                                            .length !==
                                                        props.map.paths
                                                            .length
                                                    ) {
                                                        // add or remove refs
                                                        elRefs.current = Array(
                                                            props.map
                                                                .paths
                                                                .length
                                                        )
                                                            .fill()
                                                            .map(
                                                                (_) =>
                                                                    elRefs
                                                                        .current[
                                                                        i
                                                                        ] ||
                                                                    createRef()
                                                            );
                                                    }
                                                    return (
                                                        <>
                                                            <path
                                                                ref={
                                                                    elRefs
                                                                        .current[
                                                                        i
                                                                        ]
                                                                }
                                                                d={
                                                                    path
                                                                        .attributes
                                                                        .d
                                                                }
                                                                id={
                                                                    path
                                                                        .attributes
                                                                        .id
                                                                }
                                                                name={
                                                                    path
                                                                        .attributes
                                                                        .name
                                                                }
                                                                key={
                                                                    path
                                                                        .attributes
                                                                        .id
                                                                }
                                                                color={getColor(
                                                                    path
                                                                        .attributes
                                                                        .name
                                                                )}
                                                                // ref={b}
                                                                // onLoad={} // doesn't work
                                                                opacity={getOpacity(
                                                                    path
                                                                        .attributes
                                                                        .id
                                                                )}
                                                                onMouseOver={(
                                                                    e
                                                                ) => {
                                                                    e.target.setAttribute(
                                                                        "opacity",
                                                                        1
                                                                    );
                                                                    setHighlightedStateName(
                                                                        `${e.target.getAttribute(
                                                                            "name"
                                                                        )}  Region`
                                                                    );
                                                                    setHighlightedDetails(
                                                                        regionSentimentScore.get(
                                                                            path
                                                                                .attributes
                                                                                .name
                                                                        ) && (
                                                                            <p>
                                                                                Positive:
                                                                                {
                                                                                    regionSentimentScore.get(
                                                                                        path
                                                                                            .attributes
                                                                                            .name
                                                                                    )
                                                                                        .positive
                                                                                }
                                                                                <br />
                                                                                Negative:
                                                                                {
                                                                                    regionSentimentScore.get(
                                                                                        path
                                                                                            .attributes
                                                                                            .name
                                                                                    )
                                                                                        .negative
                                                                                }
                                                                            </p>
                                                                        )
                                                                    );
                                                                }}
                                                                onMouseOut={(
                                                                    e
                                                                ) => {
                                                                    e.target.setAttribute(
                                                                        "opacity",
                                                                        0.8
                                                                    );
                                                                    setHighlightedStateName(
                                                                        defaultText
                                                                    );
                                                                    setHighlightedDetails();
                                                                }}
                                                            />
                                                        </>
                                                    );
                                                }
                                            )}
                                            {props.map &&
                                            props.map.circles.map(
                                                (circle) => (
                                                    <circle
                                                        d={
                                                            circle
                                                                .attributes
                                                                .cx
                                                        }
                                                        id={
                                                            circle
                                                                .attributes
                                                                .cy
                                                        }
                                                        name={
                                                            circle
                                                                .attributes
                                                                .id
                                                        }
                                                        key={
                                                            circle
                                                                .attributes
                                                                .id
                                                        }
                                                    ></circle>
                                                )
                                            )}
                                            <circle
                                                r="25"
                                                cx="500"
                                                cy="500"
                                                stroke="white"
                                                fill="black"
                                                strokeWidth="5"
                                            />
                                            {/*
                                                <rect
                                                    id="rect1"
                                                    x="25"
                                                    y="25"
                                                    width="225"
                                                    height="175"
                                                    fill="white"
                                                    stroke="black"
                                                />
                                                <rect
                                                    id="rect2"
                                                    x="200"
                                                    y="125"
                                                    width="225"
                                                    height="150"
                                                    fill="white"
                                                    stroke="black"
                                                    style={{
                                                        shapeMargin: "25px",
                                                    }}
                                                />

                                                <text
                                                    style={{
                                                        shapeInside: `url(#rect1)`,
                                                        shapeSubtract:
                                                            "url(#rect2)",
                                                        shapePadding: "25px",
                                                        fontFamily:
                                                            "DejaVu Sans",
                                                        fontSize: "120px",
                                                        textAlign: "justified",
                                                        lineHeight: "110%",
                                                    }}
                                                >
                                                    pppppppppppppppppppppppppppppppppp
                                                </text> */}
                                        </g>
                                    </SvgIcon>
                                    {/* </ResponsiveContainer> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <CountryListComponent
                                states={states}
                                columns={[...Array(numColumns).keys()]}
                                rows={numRows}
                                setHighlightedStateId={
                                    setHighlightedStateId
                                }
                                setHighlightedStateName={
                                    setHighlightedStateName
                                }
                                setHighlightedDetails={
                                    setHighlightedDetails
                                }
                                defaultText={defaultText}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </CardContent>
        </Grid>
    );
}

export default SvgMap;
