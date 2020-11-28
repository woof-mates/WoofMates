import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            userEmail: '',
            password: ''
        }
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)
    }

    setEmail(ev){
        console.log(ev.target.value)
        this.setState( {userEmail: ev.target.value} )
    }

    setPassword(ev){
        console.log(ev.target.value)
        this.setState( {password: ev.target.value} )
    }
    render(){
        return(
            <>
                <form>
                    <input onChange={this.setEmail} placeholder='email'></input>
                    <input onChange={this.setPassword} placeholder='password'></input>
                </form>
            </>
        )
    }


}

export default Login
// export default connect(mapStateToProps, mapStateToDispatch)(Login)