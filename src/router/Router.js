import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { Role } from '@/_helpers';
// import { accountService } from '@/_services';
import MiniDrawer from "../components/MiniDrawer";
import routes from "./routes";
import SignIn from "../pages/SignIn";
import PrivateRoute from "../_components/PrivateRoute";
// import { Home } from '@/home';
// import { Profile } from '@/profile';
// import { Admin } from '@/admin';
// import { Account } from '@/account';

const AppLayout = ({children, showSubheader, pageTitle}) => <MiniDrawer showSubheader={showSubheader} children={children} pageTitle={pageTitle}/>;

function AppRoutes() {

		return (
			<div /**className={'router-container' + (user && ' bg-light')}**/>
					{/*<Nav/>*/}
					{/*<Alert/>*/}
					<Switch>
							{routes.map((route, i) => route.visible ?
								<PrivateRoute
									key={i}
									path={route.path}
									// render={
									// 		() => <AppLayout>
									// 				<route.page/>
									// 		</AppLayout>
									// }
									component={() =>
										<AppLayout showSubheader={route.subheader} pageTitle={route.title}>
												<route.page/>
										</AppLayout>
											// : null
									}
								/>
								: null
							)}

							{/*<Redirect from="/:url*(/+)" to={pathname.slice(0, -1)}/>*/}

							{/*<PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />*/}

							<Route path="/login" component={SignIn}/>
							{/*<Route path="/signup" component={SignUp}/>*/}
							<Redirect from="*" to="/home"/>
					</Switch>
			</div>
		);
}

export default AppRoutes;