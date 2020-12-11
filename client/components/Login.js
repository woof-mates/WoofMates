import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/user';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            password: '',
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
        await login(this.state)
        setMessage(`Welcome `)
    }
    render(){
        return (
            <>
                <form onSubmit={this.submit}>
                    <input onChange={this.setEmail} value={this.state.userEmail} placeholder="email" />
                    <input onChange={this.setPassword} value={this.state.password} placeholder="password" type="password" />
                    <button type="submit">Log In</button>

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
