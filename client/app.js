import React from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import Registration from './registration/index'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Match from './components/Match'
import Chatrooms from './components/Chatrooms'
import Profile from './components/Profile'
<<<<<<< HEAD
import { connect } from 'react-redux'
import {getUser} from './store/user'
=======
import VideoChatContainer from './components/VideoChat/VideoChatContainer'
>>>>>>> 15e0a9551c8a3c343e680608b50d37ccb4a70d47

class App extends React.Component {
    async componentDidMount (){
        await this.props.getUser()
    }

    render() {
        return (
            <Router>
                <Navbar></Navbar>
                    <Switch>
                        <Route path='/' exact />
                        <Route path='/signUp' exact component={Registration}/>
                        <Route path='/profile' exact component={Profile}/>
                        <Route path='/chat' exact component={Chatrooms}/>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/match' exact component={Match}/>
                    </Switch>
            </Router>
        );
    }
}


export default connect(
    (state) => {
      return {
        user: state.user
      }
    },
    (dispatch) => {return {
      getUser: () => dispatch(getUser()),
    }}
    )(App)
