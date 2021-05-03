import React from 'react';
import { Router } from 'react-router-dom';
import { history } from './_helpers';

import './App.css';
import AppRoutes from "./router/Router";


function App() {
		return (
			<Router history={history}>
					<AppRoutes/>
			</Router>
		);
}

export default App;
