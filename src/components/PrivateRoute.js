import React from "react";
import { Redirect, Route } from "react-router-dom";
import Service from "../services/services";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={props =>
                Service.getCurrentUser() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )} />
    )
};