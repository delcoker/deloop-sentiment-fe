import React, { Component } from 'react';
import LoginForm from "../components/LoginForm";

// import './Login.css'
// import LoginFooter from './login/LoginFooter'
// import Header from './Header'

class Login extends Component {

  render() {
    return (
      <div className="Login">
        {/*<Header />*/}
        <LoginForm />
        {/*<LoginFooter />*/}
        {/*<button onClick={() => this.props.onChangeTheme('default')}>default</button>*/}
        {/*<button onClick={() => this.props.onChangeTheme('kimochiTheme')}>kimochiTheme</button>*/}
        {/*<button onClick={() => this.props.onChangeTheme('darkBaseTheme')}>darkTheme</button>*/}
      </div>
    )
  }
}

export default Login
