import React from 'react';
import Chat from './Chat';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getMatches } from '../store/matches';

class Chatrooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messaging: this.props.matchedId ? this.props.matchedId : 0
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

    toMessage(id, name) {
        this.setState({
            messaging: id,
            messagingToName: name
        });
    }

    render() {
        const { user } = this.props;
        const { matches } = this.props;
        const { messaging } = this.state;
        console.log(matches)
        if (!user.id) {
            return (
                <div>
                    <Link to='/login'>Please Log In To Review Your Messages</Link>
                </div>
            );
        } else if (messaging !== 0) {
            return (
                <div>
                    <Chat from={user.id} to={messaging} fromName={`${user.firstName} ${user.lastName}`} toName={this.state.messagingToName} closeChat={this.closeChat}/>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>Matches: </h4>
                    <ul>
                        {   
                            matches.length ? 
                                matches.map(match => {
                                    const fullName = match.firstName + ' ' + match.lastName
                                    return (
                                        <li key={match.id} onClick={() => this.toMessage(match.id, fullName)}>{fullName}</li>
                                    )
                                })
                            : 
                                <div>
                                    <p>No Matches</p>
                                    <Link to='/match'>Find Matches!</Link> 
                                </div>
                                
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