import React from 'react';
import Chat from './chat';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getMatches } from '../store/matches';

class Chatrooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messaging: 0
        };
        this.toMessage = this.toMessage.bind(this);
        this.closeChat = this.closeChat.bind(this);
    }

    componentDidMount() {
        if (this.props.user.id) {
            this.props.getMatches(this.props.user.id);
        } 
    }

    closeChat() {
        this.setState({
            messaging: 0
        });
    }

    toMessage(id) {
        this.setState({
            messaging: id
        });
    }

    render() {
        const { user } = this.props;
        const { matches } = this.props;
        const { messaging } = this.state;

        if (!user.id) {
            return (
                <div>
                    <Link to='/login'>Please Log In To Review Your Messages</Link>
                </div>
            );
        } else if (messaging !== 0) {
            return (
                <div>
                    <div onClick={this.closeChat}>Close Chat</div>
                    <Chat from={user.id} to={messaging}/>
                </div>
            );
        } else {
            return (
                <div>Matches: <br></br>
                    <ul>
                        {
                            matches.map(match => {
                                return (
                                    <li key={match.id} onClick={() => this.toMessage(match.id)}>{match.firstName} {match.lastName}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            );
        };
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        matches: state.matches
    };
};

const mapDispatchToProps = (dispatch) => ({
    getMatches: (userId) => dispatch(getMatches(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatrooms);