import React, {Component} from 'react';
import LoginForm from "../components/SignInForm";
import Header from "../components/Header";

class SignIn extends Component {
    render() {
        return (
            <>
                <Header/>
                <br/>
                <br/>
                <br/>
                <LoginForm {...this.props}/>
            </>
        )
    }
}

export default SignIn
