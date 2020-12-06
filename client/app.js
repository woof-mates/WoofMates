import React from 'react'
import { HashRouter as Router, Link, Route} from 'react-router-dom'
import Registration from './registration/index'
import Login from './components/Login'
import Match from './components/match'
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
                <div>
                    <ul id='nav'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/signUp'>Sign Up</Link></li>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/chat'>Chat</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/match'>Find Your Match</Link></li>
                        <li><Link to='/video'>Video Test</Link></li>
                    </ul>
                    <Route path='/' exact />
                    <Route path='/signUp' exact component={Registration}/>
                    <Route path='/profile' exact component={Profile}/>
                    <Route path='/chat' exact component={Chatrooms}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/match' exact component={Match}/>
                    <Route path='/video' exact component={VideoChatContainer}/>
                </div>
            </Router>
        );
    };
};


export default App;
