import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/user';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

// redicrect not working. page is ugly
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            password: '',
            loggedIn: false,
        }
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.submit = this.submit.bind(this)
    }

    setEmail(ev){
        this.setState( {userEmail: ev.target.value} )
    }

    setPassword(ev){
        this.setState( {password: ev.target.value} )
    }

    async submit(ev){
        ev.preventDefault();
        const { login, setMessage } = this.props
        const user = await login(this.state)
        setMessage('Login attempted')
    }
    render(){
        return (
            <>
                <div id="signInContainer">
                    <div id="signInForm">
                        <h3>Welcome!</h3>
                        <form id="signInForm" onSubmit={this.submit}>
                            <TextField 
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="login-email"
                                label="Your Email"
                                name="email"
                                autoComplete="email"
                                className="loginEmail" onChange={this.setEmail} value={this.state.userEmail}
                                />
                            <p />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="login-password"
                                autoComplete="current-password"
                                className="loginPassword" onChange={this.setPassword} value={this.state.password}
                            />
                            <p />
                            <Button 
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className="signInAuthButton">Log In
                            </Button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    login: (loginInfo) => dispatch(login(loginInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
