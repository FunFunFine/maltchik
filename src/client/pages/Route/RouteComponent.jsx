import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {RedirectComponent} from "./RedirectComponent";
import {Home} from '../Home/Home'
import {Presentation} from "../Presentaton/Presentation";
import {Answers} from "../Answers/Answers";

export function RouteComponent() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={RedirectComponent}/>
                <Route path="/home" exact={true} component={Home}/>
                <Route path="/answers" exact={true} component={Answers}/>
                <Route path="/presentation" exact={true} component={Presentation}/>
            </Switch>
        </BrowserRouter>
    );
}
