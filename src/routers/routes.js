import React from "react";
import TopicsPage from "../pages/TopicsPage";
import SettingsPage from "../pages/SettingsPage";
import DashboardPage from "../pages/DashboardPage";
import {blue} from "@material-ui/core/colors";
import {
    Cloud,
    // AlternateEmail as AlternateEmailIcon,
    Dashboard as DashboardIcon, LocationOn,
    Settings as SettingsIcon,
    VerifiedUser as VerifiedUserIcon,
    Web as WebIcon
} from "@material-ui/icons";
import ProfilePage from "../pages/ProfilePage";
import DatePickerWrapper from "../components/DatePickerWrapper";
import LocationPage from "../pages/LocationPage";
import WordCloudPage from "../pages/WordCloudPage";

const routes = [
    {
        path: "/home",
        parentComponent: DatePickerWrapper,
        page: DashboardPage,
        title: "Dashboard",
        icon: <DashboardIcon />,
        visible: true,
        subheader: false,
        children: [
            {
                id: 1,
                title: "Word Clould",
                icon: <DashboardIcon />,
                kcg: {path: "word", element: <WordCloudPage />},
            }, {
                id: 2,
                kcg: {
                    keywords: ["apple", "pine"]
                },
                category: "fruit",
                group_category: "food"
            }
        ]
    },
    {
        path: "/wordclouds",
        parentComponent: DatePickerWrapper,
        page: WordCloudPage,
        title: "Word Cloud",
        icon: <Cloud />,
        visible: true,
        subheader: false
    },
    {
        path: "/topics",
        // parentComponent: DatePickerWrapper,
        page: TopicsPage,
        title: "Topics",
        icon: <WebIcon />,
        visible: true,
        subheader: true,
        children: [
            {
                id: 1,
                kcg: {path: "word", element: <WordCloudPage />},
            }, {
                id: 2,
                kcg: {
                    keywords: ["apple", "pine"]
                },
                category: "fruit",
                group_category: "food"
            }
            // { path: "account", element: <IssuesPage /> },
            // { path: "settings", element: <IssuesPage /> },
            //   { path: 'dashboard', element: <DashboardView /> },
            //   { path: 'products', element: <ProductListView /> },
            //   { path: 'settings', element: <SettingsView /> },
            //   { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    {
        path: "/locations",
        // parentComponent: DatePickerWrapper,
        page: LocationPage,
        title: "Locations",
        icon: <LocationOn />,
        visible: false,
        subheader: false,
    },
    {
        path: "/profile",
        // parentComponent: DatePickerWrapper,
        page: ProfilePage,
        title: "Profile",
        icon: <VerifiedUserIcon />,
        visible: true,
        subheader: false,
    },
    {
        path: "/settings",
        // parentComponent: DatePickerWrapper,
        page: SettingsPage,
        title: "Settings",
        icon: <SettingsIcon />,
        visible: true,
        subheader: false,
        color: blue
    },
    // {
    // 		path: "/wow",
    // 		// parentComponent: DatePickerWrapper,
    // 		page: Page404,
    // 		title: "Error Page",
    // 		icon: <SettingsIcon/>,
    // 		visible: false,
    // },
    // {
    //     path: "/location",
    //     // parentComponent: DatePickerWrapper,
    //     page: ProfilePage,
    //     title: "Location",
    //     icon: <LocationOnOutlinedIcon />,
    // },
];

export default routes;
