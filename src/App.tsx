/* eslint-disable */
import * as React from 'react';
import { Login } from 'Pages/Login';
import { Main } from 'Pages/Main';
import { Classes } from 'Pages/Classes';
import { Objects } from 'Pages/Objects';
import { Obj } from 'Pages/Object';
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

                <Route path="/object/:classId/:objectId">
                    <Obj />
                </Route>
                <Route path="/object/:classId">
                    <Obj />
                </Route>

                <Route path="/objects/:classId">
                    <Objects />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export { Routes };

