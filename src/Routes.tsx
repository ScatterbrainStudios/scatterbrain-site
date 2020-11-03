import React from "react";
import { Redirect, Route, Router, Switch } from 'react-router';
import { Home } from "./Components/Home/Home";
import {createBrowserHistory} from "history";
import { Channel } from "./Components/Video/Channel";

export class Routes extends React.PureComponent{
    render(){
        return(
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/video"} component={Channel}/>
                    <Redirect to={"/home"} />
                </Switch>
            </Router>
        );
    }

}