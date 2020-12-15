import React from 'react';
import Chat from './Chat';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getMatches } from '../store/matches';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';

class Chatrooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messaging: this.props.matchedId ? this.props.matchedId : 0,
            messagingToName: ''
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
        const { user, matches } = this.props;
        const { messaging } = this.state;
        console.log(matches)
        if (!user.id) {
            return (
                <div id="chatContainer">
                    <div id="chatBody">
                    <Link to='/login'>Please Log In To Review Your Messages</Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="chatContainer">
                    <div id="chatBody">
                        <h3>Chat</h3>
                        <div id='chatRooms'>
                            <div id='chatList'>
                                <h4>Woof-Mates:</h4>
                                <ul>
                                    {
                                        matches.length ?
                                            matches.map(match => {
                                                const fullName = match.firstName + ' ' + match.lastName
                                                return (
                                                    <li key={match.id}>
                                                        <img width={20} height={20} src='/images/dogIcon.png'></img> {fullName}
                                                        <IconButton onClick={() => this.toMessage(match.id, fullName)} >
                                                            <ChatIcon title="Chat with your match"/>
                                                        </IconButton>
                                                        <IconButton>
                                                            <PersonIcon title="View their profile"/>
                                                        </IconButton>
                                                    </li>
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
                            { messaging!== 0 ?
                                <div id='chatMessages'>
                                    <div>
                                        <Chat from={user.id} to={messaging} fromName={`${user.firstName} ${user.lastName}`} toName={this.state.messagingToName} closeChat={this.closeChat}/>
                                    </div>
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                    </div>
                </div>
            );
        }
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
