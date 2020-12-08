import React, { Component } from 'react';
import { connect } from 'react-redux'
import Login from './Login'
import Logout from './Logout'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
        this.setMessage = this.setMessage.bind(this)
    }
    setMessage(message){
        if (message === 'Welcome ') message += `${this.props.user.firstName}!`
        console.log('message',message)
        this.setState({ message })
    }
    render() {
        return (
            <>
                {this.props.user.firstName ? <Logout setMessage={this.setMessage} /> : <Login setMessage={this.setMessage} />}
                <p>{this.state.message}</p>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Auth);