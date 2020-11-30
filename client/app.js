import React from 'react';
import { HashRouter as Router, Link, Route} from 'react-router-dom';
import Chat from './components/chat';
import Login from './components/Login'

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
                        <li><Link to='/chat'>Chat</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
                    <Route path='/' exact />
                    <Route path='/chat' exact component={Chat}/>
                    <Route path='/login' exact component={Login}/>
                </div>
            </Router>
        );
    };
};


export default App;