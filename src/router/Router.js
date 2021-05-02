import React, { useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
// import { Role } from '@/_helpers';
// import { accountService } from '@/_services';
import Login from "../pages/Login";
import AdminPage from "../pages/AdminPage";
import { PrivateRoute } from "../_components/PrivateRoute";
// import { Home } from '@/home';
// import { Profile } from '@/profile';
// import { Admin } from '@/admin';
// import { Account } from '@/account';

function AppRoutes() {
		const {pathname} = useLocation();
		const [user, setUser] = useState({});

		// useEffect(() => {
		//     const subscription = accountService.user.subscribe(x => setUser(x));
		//     return subscription.unsubscribe;
		// }, []);

		return (
			<div /**className={'router-container' + (user && ' bg-light')}**/>
					{/*<Nav/>*/}
					{/*<Alert/>*/}
					<Switch>
							{/*<Redirect from="/:url*(/+)" to={pathname.slice(0, -1)}/>*/}
							<PrivateRoute exact path="/" component={AdminPage}/>
							{/*<PrivateRoute path="/profile" component={Profile}/>*/}
							{/*<PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />*/}
							<Route path="/login" component={Login}/>
							<Redirect from="*" to="/"/>
					</Switch>
			</div>
		);
}

export default AppRoutes;