import React, {useState} from 'react';
import {Router} from 'react-router-dom';
import {history} from './_helpers';

import './App.css';
import AppRouter from "./router/AppRouter";
import AlertPopUp from "./components/snackbars/AlertPopUp";


function App() {
    const [alertMessage, setAlertMessage] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState("info");

    return (
        <Router history={history}>
            <AlertPopUp alertOpen={alertOpen}
                        setAlertOpen={setAlertOpen}
                        alertMessage={alertMessage}
                        alertType={alertType}
            />
            <AppRouter setAlertMessage={setAlertMessage}
                       setAlertOpen={setAlertOpen}
                       setAlertType={setAlertType}
            />
        </Router>
    );
}

export default App;
