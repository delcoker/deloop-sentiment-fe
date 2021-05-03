import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { Role } from '@/_helpers';
// import { accountService } from '@/_services';
import MiniDrawer from "../components/MiniDrawer";
import routes from "./routes";
import Login from "../pages/Login";
import PrivateRoute from "../_components/PrivateRoute";
// import { Home } from '@/home';
// import { Profile } from '@/profile';
// import { Admin } from '@/admin';
// import { Account } from '@/account';

const AppLayout = ({children}) => <MiniDrawer children={children}/>;

function AppRoutes() {
		// const {pathname} = useLocation();
		// const [user, setUser] = useState({});

		// useEffect(() => {
		//     const subscription = accountService.user.subscribe(x => setUser(x));
		//     return subscription.unsubscribe;
		// }, []);

		return (
			<div /**className={'router-container' + (user && ' bg-light')}**/>
					{/*<Nav/>*/}
					{/*<Alert/>*/}
					<Switch>
							{routes.map((route, i) =>
								<PrivateRoute
									key={route.path}
									path={route.path}
									// render={
									// 		() => <AppLayout>
									// 				<route.page/>
									// 		</AppLayout>
									// }
									component={() => <AppLayout>
											<route.page/>
									</AppLayout>}
								/>
							)}

							{/*<Redirect from="/:url*(/+)" to={pathname.slice(0, -1)}/>*/}
							{/*<PrivateRoute path="/profile" component={Profile}/>*/}
							{/*<PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />*/}
							<Route path="/login" component={Login}/>
							<Redirect from="*" to="/home"/>
					</Switch>
			</div>
		);
}

export default AppRoutes;