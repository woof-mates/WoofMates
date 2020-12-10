import React from 'react'
import { HashRouter as Router, Link, Route} from 'react-router-dom'
import Registration from './registration/index'
import Login from './components/Login'
import Match from './components/match'
import Chatrooms from './components/Chatrooms'
import Profile from './components/Profile'
import Home from './components/Home'

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
                    </ul>
                    <Route path='/' exact component={Home}/>
                    <Route path='/signUp' exact component={Registration}/>
                    <Route path='/profile' exact component={Profile}/>
                    <Route path='/chat' exact component={Chatrooms}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/match' exact component={Match}/>
                </div>
            </Router>
        );
    };
};


export default App;
