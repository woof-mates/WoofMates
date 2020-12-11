import React from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import Registration from './registration/index'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Match from './components/Match'
import Chatrooms from './components/Chatrooms'
import Profile from './components/Profile'
import VideoChatContainer from './components/VideoChat/VideoChatContainer'

class App extends React.Component {
    componentDidMount(){
        console.log('hello world');
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
    };
};


export default App;
