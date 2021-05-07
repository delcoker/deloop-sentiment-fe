import React, { Component } from 'react';
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

// import './Login.css'
// import LoginFooter from './login/LoginFooter'
// import Header from './Header'

class Login extends Component {
		render() {
				return (
					<>
							<Header/>
							<br/>
							<br/>
							<br/>
							<LoginForm/>
					</>
				)
		}
}

export default Login
