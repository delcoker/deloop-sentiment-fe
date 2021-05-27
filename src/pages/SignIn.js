import React, {Component} from 'react';
import SignInForm from "../components/SignInForm";
import Header from "../components/headers/Header";

class SignIn extends Component {
    render() {
        return (
            <>
                <Header />

                <br /><br />
                <br /><br />
                <br /><br />

                <SignInForm {...this.props} />
            </>
        )
    }
}

export default SignIn
