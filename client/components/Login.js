import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/user';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            userEmail: '',
            password: ''
        }
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.submit = this.submit.bind(this)
    }

    setEmail(ev){
        console.log(ev.target.value)
        this.setState( {userEmail: ev.target.value} )
    }

    setPassword(ev){
        console.log(ev.target.value)
        this.setState( {password: ev.target.value} )
    }

    submit(ev){
        ev.preventDefault();
        const { login } = this.props
        login(this.state)
    }
    render(){
        const { user } = this.props
        return(
            <>
                <form onSubmit={this.submit}>
                    <input onChange={this.setEmail} placeholder='email'></input>
                    <input onChange={this.setPassword} placeholder='password'></input>
                    <button type='submit'>Log In</button>
                    { user.firstName ? <p>Welcome {user.firstName}!</p> : null }
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
    login: (loginInfo) => dispatch(login(loginInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);