import React from 'react'
import { HashRouter as Router, Link, Route} from 'react-router-dom'
import Login from './components/Login'
import Match from './components/match'

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
                        <li><Link to='/login'>Log In</Link></li>
                        <li><Link to='/match'>Find Your Match</Link></li>
                    </ul>
                    <Route path='/' exact />
                    <Route path='/login' exact component={Login}/>
                    <Route path='/match' exact component={Match}/>
                </div>
            </Router>
        );
    };
};


export default App;