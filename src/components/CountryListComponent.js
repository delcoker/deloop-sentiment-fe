import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";

import Switch from "@material-ui/core/Switch";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CountryListComponent(props) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Grid container spacing={3} justify="space-around" className={classes.dashedBorder}>
            {// for(let i = 0;i < 2;i++)
                props.columns.map((listNumber, i) => {
                    return (
                        <Grid item xs={12} sm={6} key={i}>
                            <List component="nav"
                                aria-label="main mailbox folders"
                                key={i}>
                                {props.states &&
                                props.states.map(
                                    ({state, id, positive, negative}, i) => {
                                        if (
                                            i >= listNumber * props.rows &&
                                            i < (listNumber + 1) * props.rows
                                        ) {
                                            return (
                                                <ListItem
                                                    button
                                                    selected={
                                                        selectedIndex === i
                                                    }
                                                    onClick={(event) =>
                                                        handleListItemClick(
                                                            event,
                                                            i
                                                        )
                                                    }
                                                    onMouseOver={(e) => {
                                                        props.setHighlightedStateId(
                                                            id
                                                        );
                                                        props.setHighlightedStateName(
                                                            `${state} Region`
                                                        );
                                                        props.setHighlightedDetails(
                                                            <p>
                                                                Postitive:
                                                                {positive}
                                                                <br />
                                                                Negative:
                                                                {negative}
                                                            </p>
                                                        );
                                                    }}
                                                    onMouseOut={(e) => {
                                                        props.setHighlightedStateId(
                                                            -1
                                                        );
                                                        props.setHighlightedStateName(
                                                            props.defaultText
                                                        );
                                                        props.setHighlightedDetails();
                                                    }}
                                                    key={id}
                                                >
                                                    <ListItemIcon
                                                        key={i + "icon"}
                                                    >
                                                        <InboxIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={state}
                                                        secondary={`Postitive:${positive ||
                                                        0} Negative:${negative ||
                                                        0}`}
                                                        key={i + "text"}
                                                    />
                                                    <ListItemSecondaryAction
                                                        key={i + "action"}
                                                    >
                                                        <Switch
                                                            key={i + "switch"}
                                                            edge="end"
                                                            onChange={handleToggle(
                                                                state
                                                            )}
                                                            checked={
                                                                checked.indexOf(
                                                                    state
                                                                ) !== -1
                                                            }
                                                            inputProps={{
                                                                "aria-labelledby":
                                                                    "switch-list-label-state",
                                                            }}
                                                        />
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            );
                                        }
                                        return;
                                    }
                                )}
                            </List>
                        </Grid>
                    );
                })}
            {/* </FixedSizeList> */}
            <Divider />
            {/* </div> */}
        </Grid>
    );
}
