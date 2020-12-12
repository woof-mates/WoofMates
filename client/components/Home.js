import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
      const {user} = this.props
    }

    render(){
      const {user} = this.props
        if (user.firstName) {
          return (
            <div id="homePageContainer">Welcome, {user.firstName}!</div>
          )
        }
        else {
          return (
            <div id="homePageContainer">Home page landing content goes here</div>
            )
          }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    //login: (loginInfo) => dispatch(login(loginInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
