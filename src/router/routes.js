import React from "react";
// import ReportPage from "./pages/ReportPage";
// import MissionControlPage from "./pages/MissionControlPage";
// import PeoplePage from "./pages/PeoplePage";
// import IssuesPage from "./pages/IssuesPage";
import TrackPage from "../pages/TrackPage";
import SettingsPage from "../pages/SettingsPage";
import HomePage from "../pages/HomePage";
import { blue } from "@material-ui/core/colors";
import {
		Dashboard as DashboardIcon,
		Lock as LockIcon,
		Settings as SettingsIcon,
		VerifiedUser as VerifiedUserIcon,
		Web as WebIcon
} from "@material-ui/icons";
import ProfilePage from "../pages/ProfilePage";
import Login from "../pages/Login";

const routes = [
		{
				path: "/home",
				// parentPage: ReportPage,
				page: HomePage,
				title: "Home",
				icon: <DashboardIcon/>,
		},
		{
				path: "/track",
				// parentPage: ReportPage,
				page: TrackPage,
				title: "Track",
				icon: <WebIcon/>,
				children: [
						// { path: "account", element: <IssuesPage /> },
						// { path: "settings", element: <IssuesPage /> },
						//   { path: 'dashboard', element: <DashboardView /> },
						//   { path: 'products', element: <ProductListView /> },
						//   { path: 'settings', element: <SettingsView /> },
						//   { path: '*', element: <Navigate to="/404" /> }
				],
		},
		{
				path: "/profile",
				// parentPage: ReportPage,
				page: ProfilePage,
				title: "Profile",
				icon: <VerifiedUserIcon/>,
		},
		{
				path: "/setting",
				// parentPage: ReportPage,
				page: SettingsPage,
				title: "Settings",
				icon: <SettingsIcon/>,
				color: blue
		},
		// {
		// 		path: "/login",
		// 		// parentPage: ReportPage,
		// 		page: Login,
		// 		title: "Login",
		// 		icon: <LockIcon/>,
		// },
		// {
		//     path: "/location",
		//     // parentPage: ReportPage,
		//     page: ProfilePage,
		//     title: "Location",
		//     icon: <LocationOnOutlinedIcon />,
		// },
];

export default routes;
