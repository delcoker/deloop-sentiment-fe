import React from "react";
// import ReportPage from "./pages/ReportPage";
// import MissionControlPage from "./pages/MissionControlPage";
// import PeoplePage from "./pages/PeoplePage";
// import IssuesPage from "./pages/IssuesPage";
import TopicsPage from "../pages/TopicsPage";
import SettingsPage from "../pages/SettingsPage";
import HomePage from "../pages/HomePage";
import { blue } from "@material-ui/core/colors";
import {
		AlternateEmail as AlternateEmailIcon,
		Dashboard as DashboardIcon,
		Settings as SettingsIcon,
		VerifiedUser as VerifiedUserIcon,
		Web as WebIcon
} from "@material-ui/icons";
import ProfilePage from "../pages/ProfilePage";
import ScopesPage from "../components/ScopesComponent";

const routes = [
		{
				path: "/home",
				// parentPage: ReportPage,
				page: HomePage,
				title: "Home",
				icon: <DashboardIcon/>,
				visible: true,
				subheader: false,
		},
		// {
		// 		path: "/scopes",
		// 		// parentPage: ReportPage,
		// 		page: ScopesPage,
		// 		title: "Scopes",
		// 		icon: <AlternateEmailIcon/>,
		// 		visible: true,
		// 		subheader: false,
		// },
		{
				path: "/topics",
				// parentPage: ReportPage,
				page: TopicsPage,
				title: "Topics",
				icon: <WebIcon/>,
				visible: true,
				subheader: true,
				children: [

						[{
								id: 1,
								kcg: {
										keywords: ["apple", "pine"]
								},
								category: "fruit",
								group_category: "food",
						}, {
								id: 2,
								kcg: {
										keywords: ["apple", "pine"]
								},
								category: "fruit",
								group_category: "food"
						}],
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
				visible: true,
				subheader: false,
		},
		{
				path: "/settings",
				// parentPage: ReportPage,
				page: SettingsPage,
				title: "Settings",
				icon: <SettingsIcon/>,
				visible: true,
				subheader: false,
				color: blue
		},
		// {
		// 		path: "/wow",
		// 		// parentPage: ReportPage,
		// 		page: Page404,
		// 		title: "Error Page",
		// 		icon: <SettingsIcon/>,
		// 		visible: false,
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
