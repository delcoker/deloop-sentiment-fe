import React from 'react';
import {Router} from 'react-router-dom';
import {history} from './_helpers';

import './App.css';
import AppRouter from "./routers/AppRouter";
import {AlertContextWrapper} from "./contexts/context.alert";
import {TopicsContextWrapper} from "./contexts/context.group.category";
import {UserContextWrapper} from "./contexts/context.user";
import {ChartsContextWrapper} from "./contexts/context.charts";

function App() {
    return (
        <Router history={history}>
            <UserContextWrapper>
                <AlertContextWrapper>
                    <ChartsContextWrapper>
                        <TopicsContextWrapper>
                            <AppRouter />
                        </TopicsContextWrapper>
                    </ChartsContextWrapper>
                </AlertContextWrapper>
            </UserContextWrapper>
        </Router>
    );
}

export default App;
