import React from 'react';
import {useContext} from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {FEED_ROUTE, SIGNIN_ROUTE} from "../utils/constants";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={SIGNIN_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;