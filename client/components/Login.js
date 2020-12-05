import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../store/user';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            password: '',
            message: ''
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
        const { login, logout, user } = this.props
        if (!user.firstName) {
            await login(this.state)
            // need to reference props directly for this to work
            if (this.props.user.firstName) {
                this.setState({ userEmail: '', password: '', message: `Welcome ${this.props.user.firstName}!` })
            }
        }
        else {
            await logout(user.id)
            this.setState( {message: 'You have been successfully logged out.'} )
        }
    }
    render(){
        const { user } = this.props
        return (
            <>
                <form onSubmit={this.submit}>
                    <input onChange={this.setEmail} value={this.state.userEmail} placeholder="email" />
                    <input onChange={this.setPassword} value={this.state.password} placeholder="password" type="password" />
                    <button type="submit">{!user.firstName ? 'Log In' : 'Log Out'}</button>
                    <p>{this.state.message}</p>
                </form>
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
    logout: (userId) => dispatch(logout(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);