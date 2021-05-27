import React, {Component} from 'react';
import SignInForm from "../components/SignInForm";
import Header from "../components/headers/Header";
import {Backdrop} from "@material-ui/core";

class SignIn extends Component {
    render() {
        return (
            <>
                <Header />

                <br /><br />
                <br /><br />
                <br /><br />

                <SignInForm {...this.props} />
                {/*<Backdrop open={false}*/}
            </>
        )
    }
}

export default SignIn
