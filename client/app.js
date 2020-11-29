import React from 'react'
import { HashRouter as Router, Link, Route} from 'react-router-dom'
import Registration from './registration/index'

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
                    </ul>
                    <Route path='/' exact />
                    <Route path='/signUp' component={Registration} exact />
                </div>
            </Router>
        );
    };
};


export default App;
