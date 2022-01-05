// import * as React from 'react';
import {Fragment, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Collapse} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {ListItemButton} from "@mui/material";

function openPage(pageUrl) {
    // your axios call here
    localStorage.setItem("pageData", "Data Retrieved from axios request")
    // route to new page by changing window.location
    window.open(pageUrl, "_blank") //to open new page
}

function isPositive(sentiment) {
    if (sentiment === "POSITIVE") {
        return {backgroundColor: "green"};
    }
    if (sentiment === "NEGATIVE") {
        return {backgroundColor: "red"};
    }
    return {backgroundColor: "gray"};
}

export default function TopicListItems(props) {
    const categoryPosts = props.posts;
    const expandIconColour = "black";
    const [dense, setDense] = useState(true);
    const [open, setOpen] = useState(false);


    const handleClick = (e, item_id) => {
        // console.log(e.currentTarget)
        setOpen(!open);
    };

    const getItems = (items) => {
        if (items && items.length > 0) {
            return items.map((item, i) =>
                <Fragment key={i}>
                    <ListItem alignItems="flex-start">
                        <ListItemButton onClick={(e) => handleClick(e, i)}>
                            <ListItemAvatar>
                                <Avatar alt={item.data_user_name}
                                        src="/static/images/avatar/1.jpg"
                                        style={isPositive(item.sentiment)}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{width: '80%'}}
                                primary={`${item.data_user_name}`}
                                secondary={
                                    <Fragment>
                                        <Typography
                                            sx={{display: 'inline'}}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {item.text}
                                        </Typography>
                                        <br />
                                        <a href={item.link} target="_blank">{item.link}</a>
                                        <br />
                                        {item.created_at}
                                    </Fragment>
                                }
                                style={{color: "black"}} />
                            {open ?
                                <ExpandLess style={{color: expandIconColour}} />
                                : <ExpandMore style={{color: expandIconColour}} />}
                        </ListItemButton>
                        <br />
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{pl: 15}}>
                                    {/*<ListItemIcon>*/}
                                    {/*    <StarBorder />*/}
                                    {/*</ListItemIcon>*/}
                                    <ListItemText
                                        primary={`${item.data_user_location}`}
                                        style={{color: "blue"}}
                                        secondary={
                                            <Fragment>
                                                <Typography
                                                    sx={{display: 'inline'}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {item.data_user_location}
                                                </Typography>
                                                <br />
                                                {item.state_name}
                                            </Fragment>
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Fragment>);
        } else {
            return (<Fragment key={0}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="DEL OOP" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <Fragment>
                                <Typography
                                    sx={{display: 'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Nothing Here Just Yet
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </Fragment>);
        }
    };


    return (
        <List sx={{width: '100%', bgcolor: 'background.paper'}} dense={dense}>
            {getItems(categoryPosts)}
        </List>
    );
}
