import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import {accountService} from '../_services';

function PrivateRoute({component: Component, /**roles,**/ ...rest}) {
    const user = accountService.getUserSession();
    if (!user) {
        // not logged in so redirect to login page with the return url
        return <Route render={(props) => <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />;
    }

    return  <Route pageTitle{...rest} component={Component} />;
}

export default PrivateRoute;