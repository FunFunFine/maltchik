import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {RedirectComponent} from "./RedirectComponent";
import {Home} from '../Home/Home'

export function RouteComponent() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={RedirectComponent}/>
                <Route path="/home" exact={true} component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}
