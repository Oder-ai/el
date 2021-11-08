import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {publicRoutes} from "../router/router";

const AppRouter = () => {
    return (
        <Switch key={'pages'}>
            {publicRoutes.map(route =>
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Redirect to="/realizations"/>
        </Switch>
    );
};

export default AppRouter;