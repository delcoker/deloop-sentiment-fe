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
        <>
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
                        {accountService.getUserSession()
                        && <MenuIcon/>}
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                        DWM Sentimento {pageTitle}
                    </Typography>
                    <div className={classes.grow}/>
                    {accountService.getUserSession() && <Button
                        component="a"
                        href="https://github.com/dwm-codebase"
                        target="_blank"
                        endIcon={<DescriptionIcon/>}
                        color="inherit"
                    >
                        Source Code : FE
                    </Button>}
                    <Button
                        component="a"
                        href="https://github.com/dwm-codebase/fe_final"
                        endIcon={<GitHubIcon/>}
                        color="inherit"
                        target="_blank"
                    >
                        Project
                    </Button>
                    {accountService.getUserSession() && <Button
                        endIcon={<TimeToLeave/>}
                        color="inherit"
                        onClick={accountService.logout}
                    >
                        Logout
                    </Button>}
                </Toolbar>

                {showSubheader && <SubHeaderComponent/>}

            </AppBar>
        </>
    )
};

export default withRouter(Header);
