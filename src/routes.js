import React from "react";
import {
    Share as ShareIcon,
    Person as PersonIcon,
    Assignment as AssignmentIcon,
    Web as WebIcon,
    LocationOnOutlined as LocationOnOutlinedIcon,
} from "@material-ui/icons";
// import ReportPage from "./pages/ReportPage";
// import MissionControlPage from "./pages/MissionControlPage";
// import PeoplePage from "./pages/PeoplePage";
// import IssuesPage from "./pages/IssuesPage";
import AdminPage from "./pages/AdminPage";
import LocationPage from "./pages/LocationPage";

const routes = [
    // {
    //     path: "/",
    //     parentPage: ReportPage,
    //     page: MissionControlPage,
    //     title: "Mission Control",
    //     icon: <ShareIcon />,
    // },
    // {
    //     path: "/people",
    //     parentPage: ReportPage,
    //     page: PeoplePage,
    //     title: "People",
    //     icon: <PersonIcon />,
    // },
    // {
    //     path: "/issues",
    //     parentPage: ReportPage,
    //     page: IssuesPage,
    //     title: "Issues",
    //     icon: <AssignmentIcon />,
    // },
    {
        path: "/location",
        // parentPage: ReportPage,
        page: LocationPage,
        title: "Location",
        icon: <LocationOnOutlinedIcon />,
    },
    {
        path: "/admin",
        // parentPage: ReportPage,
        page: AdminPage,
        title: "Admin",
        icon: <WebIcon />,
        children: [
            // { path: "account", element: <IssuesPage /> },
            // { path: "settings", element: <IssuesPage /> },
            //   { path: 'dashboard', element: <DashboardView /> },
            //   { path: 'products', element: <ProductListView /> },
            //   { path: 'settings', element: <SettingsView /> },
            //   { path: '*', element: <Navigate to="/404" /> }
        ],
    },
];

export default routes;
