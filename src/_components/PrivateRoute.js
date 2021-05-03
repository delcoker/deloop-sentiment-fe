import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { accountService } from '../_services';

function PrivateRoute({component: Component, /**roles,**/ ...rest}) {

		// const b = getUserSession;
		// console.log(b)
		return (
			<Route {...rest} render={props => {

					const user = accountService.getUserSession();
					console.log(user)
					if (!user) {
							// not logged in so redirect to login page with the return url
							return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
					}

					// check if route is restricted by role
					// if (roles && roles.indexOf(user.role) === -1) {
					//     // role not authorized so redirect to home page
					//     return <Redirect to={{ pathname: '/'}} />
					// }

					// authorized so return component
					return <Component {...props} />
			}}/>
		);
}

export default PrivateRoute;