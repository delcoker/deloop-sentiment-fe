import React, {useState} from 'react';
import {Router} from 'react-router-dom';
import {history} from './_helpers';

import './App.css';
import AppRouter from "./routers/AppRouter";
import {AlertContext} from "./contexts/context.alert";

function App() {
    return (
        <Router history={history}>
            <AlertContext>
                <AppRouter />
            </AlertContext>
        </Router>
    );
}

export default App;
