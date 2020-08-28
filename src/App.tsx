import * as React from 'react';
import { Login } from 'Pages/Login';
import { Main } from 'Pages/Main';
import { Classes } from 'Pages/Classes';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/main">
                    <Main />
                </Route>
                <Route path="/classes/:classId">
                    <Classes />
                </Route>
                <Route path="/classes">
                    <Classes />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export { Routes };

