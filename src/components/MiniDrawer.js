import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {matchPath} from "react-router";
import {
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Description as DescriptionIcon, GitHub as GitHubIcon, TimeToLeave,
} from '@material-ui/icons';
import {Link, useLocation} from "react-router-dom";

import routes from "../routers/routes";
import Header from "./headers/Header";
// import useStyles from "../_helpers/use_styles/styles";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {accountService} from "../_services";
import SubHeaderComponent from "./headers/SubHeaderComponent";


const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer({children, pageTitle, showSubheader}) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const MenuItem = ({to, title, icon, selectedPaths}) => {
        const {pathname} = useLocation();
        const selected = (selectedPaths || [to]).some((path) =>
            matchPath(pathname, {path: path, exact: true})
        );
        return (
            <ListItem button to={to} component={Link} selected={selected}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>
        );
    };

    return (
        <div className={classes.root}>
            <CssBaseline />

            <Header open={open} handleDrawerOpen={handleDrawerOpen}
                    pageTitle={pageTitle}
                    showSubheader={showSubheader}
                    classes={classes} />

            {/*<AppBar*/}
            {/*    position="fixed"*/}
            {/*    className={clsx(classes.appBar, {*/}
            {/*        [classes.appBarShift]: open,*/}
            {/*    })}*/}
            {/*>*/}
            {/*    <Toolbar>*/}
            {/*        <IconButton*/}
            {/*            color="inherit"*/}
            {/*            aria-label="open drawer"*/}
            {/*            onClick={handleDrawerOpen}*/}
            {/*            edge="start"*/}
            {/*            className={clsx(classes.menuButton, {*/}
            {/*                [classes.hide]: open,*/}
            {/*            })}*/}
            {/*        >*/}
            {/*            /!*{accountService.getUserSession()*!/*/}
            {/*            /!*&& *!/*/}
            {/*            <MenuIcon />*/}
            {/*            */}
            {/*        </IconButton>*/}
            {/*        <Typography variant="h6" color="inherit" noWrap className={classes.title}>*/}
            {/*            DWM Sentimento {pageTitle}*/}
            {/*        </Typography>*/}
            {/*        <div className={classes.spaceOut} />*/}
            {/*        {accountService.getUserSession() && <Button*/}
            {/*            component="a"*/}
            {/*            href="https://github.com/dwm-codebase"*/}
            {/*            target="_blank"*/}
            {/*            endIcon={<DescriptionIcon />}*/}
            {/*            color="inherit"*/}
            {/*        >*/}
            {/*            Source Code : FE*/}
            {/*        </Button>}*/}
            {/*        <Button*/}
            {/*            component="a"*/}
            {/*            href="https://github.com/dwm-codebase/fe_final"*/}
            {/*            endIcon={<GitHubIcon />}*/}
            {/*            color="inherit"*/}
            {/*            target="_blank"*/}
            {/*        >*/}
            {/*            Project*/}
            {/*        </Button>*/}
            {/*        {accountService.getUserSession() && <Button*/}
            {/*            endIcon={<TimeToLeave />}*/}
            {/*            color="inherit"*/}
            {/*            onClick={accountService.logout}*/}
            {/*        >*/}
            {/*            Logout*/}
            {/*        </Button>}*/}
            {/*    </Toolbar>*/}

            {/*    {showSubheader && <SubHeaderComponent />}*/}

            {/*</AppBar>*/}

            <Drawer variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {routes.map((route, i) =>
                        route.visible ?
                            <MenuItem
                                to={route.path}
                                icon={route.icon}
                                title={route.title}
                                key={route.title}
                            />
                            : null
                    )}
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}
