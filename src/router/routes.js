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
import FollowingPage from "../pages/FollowingPage";

const routes = [
		{
				path: "/home",
				// parentPage: ReportPage,
				page: HomePage,
				title: "Home",
				icon: <DashboardIcon/>,
		},
		{
				path: "/following",
				// parentPage: ReportPage,
				page: FollowingPage,
				title: "Following",
				icon: <AlternateEmailIcon/>,
		},
		{
				path: "/topics",
				// parentPage: ReportPage,
				page: TopicsPage,
				title: "Topics",
				icon: <WebIcon/>,
				children: [

						[{
								id: 1,
								kcg:
									{
											keywords: ["apple", "pine"]
									},
								category: "fruit",
								group_category: "food",


						}, {
								id: 2,
								kcg:
									{
											keywords: ["apple", "pine"]
									},
								category: "fruit",
								group_category: "food"
						}]
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
				path: "/settings",
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
