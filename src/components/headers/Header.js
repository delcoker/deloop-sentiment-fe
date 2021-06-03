import React from "react";
import {withRouter} from "react-router";
import AppBar from "@material-ui/core/AppBar";
import {Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {GitHub as GitHubIcon, Description as DescriptionIcon, Menu as MenuIcon, TimeToLeave} from '@material-ui/icons';
import clsx from "clsx";
import {accountService} from "../../_services";
import useStyles from "../../_helpers/use_styles/styles";
import SubHeaderComponent from "./SubHeaderComponent";

const Header = ({open, handleDrawerOpen, showSubheader, pageTitle}) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
};

export default withRouter(Header);
