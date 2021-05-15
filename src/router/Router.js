import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import MiniDrawer from "../components/MiniDrawer";
import routes from "./routes";
import SignIn from "../pages/SignIn";
import PrivateRoute from "../_components/PrivateRoute";

const AppLayout = ({children, showSubheader, pageTitle}) => <MiniDrawer showSubheader={showSubheader}
                                                                        children={children} pageTitle={pageTitle}/>;

function AppRoutes(props) {
    return (
        <div /**className={'router-container' + (user && ' bg-light')}**/>

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
                            <AppLayout showSubheader={route.subheader}
                                       pageTitle={route.title}>
                                <route.page
                                    {...props}
                                />
                            </AppLayout>
                            // : null
                        }
                    />
                    : null
                )}

                {/*<Redirect from="/:url*(/+)" to={pathname.slice(0, -1)}/>*/}

                {/*<PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />*/}

                <Route path="/login" component={() => <SignIn {...props}/>}/>
                {/*<Route path="/signup" component={SignUp}/>*/}
                <Redirect from="*" to="/home"/>
            </Switch>
        </div>
    );
}

export default AppRoutes;