import React, { Component } from 'react';
import LoginForm from "../components/SignInForm";
import Header from "../components/Header";

// import './SignIn.css'
// import LoginFooter from './login/LoginFooter'
// import Header from './Header'

class SignIn extends Component {
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

export default SignIn
