import React, {memo} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import MiniDrawer from "../components/MiniDrawer";
import routes from "./routes";
import SignIn from "../pages/SignIn";
import PrivateRoute from "./PrivateRoute";
import StickyFooter from "../components/StickyFooter";

const AppLayout = ({children, showSubheader, pageTitle, child}) => <MiniDrawer showSubheader={showSubheader}
                                                                               children={children}
                                                                               pageTitle={pageTitle}
                                                                               child={child} />;

const AppRouter = memo(props => {
    return (
        <div /**className={'routers-container' + (user && ' bg-light')}**/>
            <Switch>
                {routes.map((route, i) => route.visible ?
                    <PrivateRoute
                        key={`private_route_${i}`}
                        path={route.path}
                        component={() =>
                            <AppLayout
                                showSubheader={route.subheader}
                                pageTitle={route.title}
                            >
                                {route.parentComponent ? (
                                        <route.parentComponent
                                            childComponent={<route.page pageTitle={route.title} {...props} />} />
                                    ) :
                                    (
                                        <route.page pageTitle={route.title} {...props} />
                                    )}
                                <StickyFooter />
                            </AppLayout>
                        }
                    />
                    : null
                )}

                {/*<PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />*/}
                <Route path="/login" component={() => <SignIn {...props} />} />
                {/*<Route path="/signup" component={SignUp}/>*/}
                <Redirect from="*" to="/home" />

            </Switch>
        </div>
    )
        ;
})

export default AppRouter;