import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeLandingPage from './HomeLandingPage';

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
            <div id="homePageContainer">
                <HomeLandingPage/>
            </div>
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
