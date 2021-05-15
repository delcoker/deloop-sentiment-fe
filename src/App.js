import React, {useState} from 'react';
import {Router} from 'react-router-dom';
import {history} from './_helpers';

import './App.css';
import AppRoutes from "./router/Router";
import AlertPopUp from "./components/snackbars/AlertPopUp";


function App() {
    const [alertMessage, setAlertMessage] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState("");

    return (
        <Router history={history}>
            <AlertPopUp alertOpen={alertOpen}
                        setAlertOpen={setAlertOpen}
                        alertMessage={alertMessage}
                        alertType={alertType}
            />
            <AppRoutes setAlertMessage={setAlertMessage}
                       setAlertOpen={setAlertOpen}
                       setAlertType={setAlertType}
                       alertMessage={alertMessage}
            />
        </Router>
    );
}

export default App;
