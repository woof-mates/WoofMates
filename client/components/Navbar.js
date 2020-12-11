import React from "react";
import { connect } from 'react-redux'
import { HashRouter as Router, Link, Switch, Route }
from 'react-router-dom';
import {logout} from '../store/user'


class Navbar extends React.Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    e.preventDefault();
    this.props.logout(this.props.user.id)
    window.location.hash='/login'
  }

  render() {
    const {user} = this.props
    if (user.firstName) {
      return (
        <div id="NavbarContainer">
          <div id="LinkContainer">
              <Link to="/">Home</Link>
          </div>
          <div id="LinkContainer">
              <Link to="/profile">My Profile</Link>
          </div>
          <div id="LinkContainer">
              <Link to="/chat">Chat</Link>
          </div>
          <div id="LinkContainer">
              <Link to="/match">Find Your Match</Link>
          </div>
          <button class = "logOutButton" onClick={this.onClick}>Log Out</button>
        </div>
      );
    }

    else {
      return (
        <div id="NavbarContainer">
          <div id="LinkContainer">
              <Link to="/">Home</Link>
          </div>
          <div id="LinkContainer">
              <Link to="/profile">My Profile</Link>
          </div>
          <div id="LinkContainer">
              <Link to="/chat">Chat</Link>
          </div>
          <div id="LinkContainer">
              <Link to="/match">Find Your Match</Link>
          </div>
          <div id="LinkContainer">
              <button class="signInNavButton"><Link id="logOutButton" to="/login">Sign In</Link></button>
          </div>
          <div id="LinkContainer">
              <button class="signUpNavButton"><Link to="/signUp">Sign Up</Link></button>
          </div>
        </div>
      )
    }
  }
};

const mapState = state => (
  {
    user: state.user
  }
)

const mapDispatchToProps = (dispatch) => ({
      logout: (userId) => dispatch(logout(userId))
})

export default connect(mapState, mapDispatchToProps)(Navbar);
