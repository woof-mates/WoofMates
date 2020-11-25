import React from 'react'
import { HashRouter as Router, Link, Route} from 'react-router-dom'

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
                    </ul>
                    <Route path='/' exact />
                </div>
            </Router>
        );
    };
};


export default App;