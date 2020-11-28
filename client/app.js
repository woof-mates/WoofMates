import React from 'react'
import { HashRouter as Router, Link, Route} from 'react-router-dom'
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
                        <li><Link to='/login'>Log In</Link></li>
                    </ul>
                    <Route path='/' exact />
                    <Route path='/login' exact component={Login}/>
                </div>
            </Router>
        );
    };
};


export default App;