import React from 'react';
import { HashRouter as Router, Link, Route} from 'react-router-dom';
import Chat from './components/chat';

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
                    </ul>
                    <Route path='/' exact />
                    <Route path='/chat' exact component={Chat}/>
                </div>
            </Router>
        );
    };
};


export default App;