import React from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import Registration from './registration/index'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Match from './components/Match'
import Home from './components/Home'
import Chatrooms from './components/Chatrooms'
import Profile from './components/Profile'
import { connect } from 'react-redux'
import {getUser} from './store/user'
import VideoChatContainer from './components/VideoChat/VideoChatContainer'

class App extends React.Component {
    async componentDidMount (){
        await this.props.getUser()
    }

    render() {
        return (
            <Router>
                <Navbar></Navbar>
                    <Switch>
                        <Route path='/' exact component = {Home}/>
                        <Route path='/signUp' exact component={Registration}/>
                        <Route path='/profile' exact component={Profile}/>
                        <Route path='/chat' exact component={Chatrooms}/>
                        <Route path='/login' exact component={Auth}/>
                        <Route path='/match' exact component={Match}/>
                    </Switch>
                    <Footer />
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
