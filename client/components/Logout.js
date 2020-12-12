import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/user';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
    }
    async submit(ev){
        ev.preventDefault();
        const { user, setMessage, logout } = this.props
        await logout(user.id)
        setMessage('You have been successfully logged out.')
    }
    render() {
        return (
            <>
                {/* <form onSubmit={this.submit}>
                    <button type="submit">Log out</button>
                </form> */}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    logout: (userId) => dispatch(logout(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

